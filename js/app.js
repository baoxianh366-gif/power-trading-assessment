// ==================== 电力交易潜质人才筛选测评系统 ====================

// 全局状态
let currentState = {
    candidate: null,
    currentModule: 1,
    currentQuestionIndex: 0,
    answers: {},
    questionBank: {},
    timer: null,
    timeRemaining: 0,
    isPaused: false
};

// 确保DOM加载完成后再初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// 管理员账号（默认）
const DEFAULT_ADMIN = {
    username: 'admin',
    password: 'admin123'
};

// 评分阈值
let scoreThresholds = {
    high: 40,
    medium: 35
};

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    // 检查本地存储的管理员设置
    const savedThresholds = localStorage.getItem('scoreThresholds');
    if (savedThresholds) {
        scoreThresholds = JSON.parse(savedThresholds);
    }
    
    // 绑定标签页切换
    bindTabSwitching();
    
    // 绑定管理员导航
    bindAdminNavigation();
    
    // 绑定文件上传
    const restoreFile = document.getElementById('restore-file');
    if (restoreFile) {
        restoreFile.addEventListener('change', handleRestoreData);
    }
}

// ==================== 登录功能 ====================
function bindTabSwitching() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // 切换标签按钮状态
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 切换表单显示
            document.querySelectorAll('.login-form').forEach(form => {
                form.classList.remove('active');
            });
            document.getElementById(`${targetTab}-login`).classList.add('active');
        });
    });
}

// 测试人员开始测试
function startTest() {
    console.log('startTest被调用');
    
    const nameInput = document.getElementById('candidate-name');
    const phoneInput = document.getElementById('candidate-phone');
    const schoolInput = document.getElementById('candidate-school');
    const majorInput = document.getElementById('candidate-major');
    
    if (!nameInput || !phoneInput || !schoolInput || !majorInput) {
        console.error('找不到输入框元素');
        alert('页面加载错误，请刷新重试');
        return;
    }
    
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const school = schoolInput.value.trim();
    const major = majorInput.value.trim();
    
    console.log('输入值:', { name, phone, school, major });
    
    if (!name || !phone || !school || !major) {
        alert('请填写完整信息');
        return;
    }
    
    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
        alert('请输入正确的手机号');
        return;
    }
    
    // 检查是否已有未完成的测试
    const existingTests = getTestsByPhone(phone);
    const unfinishedTest = existingTests.find(t => !t.completed);
    
    if (unfinishedTest) {
        if (confirm('您有未完成的测试，是否继续？')) {
            resumeUnfinishedTest(unfinishedTest);
            return;
        }
    }
    
    // 创建新的测试记录
    currentState.candidate = {
        id: generateId(),
        name,
        phone,
        school,
        major,
        startTime: new Date().toISOString(),
        completed: false
    };
    
    // 初始化答案
    currentState.answers = {
        module1: {},
        module2: {},
        module3: {},
        module4: {}
    };
    
    // 加载题库
    loadQuestionBank(1);
    
    // 切换到测试页面
    switchPage('test-page');
    
    // 开始第一个模块
    startModule(1);
}

// 管理员登录
function adminLogin() {
    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value.trim();
    
    // 验证管理员账号
    const savedAdmin = localStorage.getItem('adminAccount');
    const admin = savedAdmin ? JSON.parse(savedAdmin) : DEFAULT_ADMIN;
    
    if (username === admin.username && password === admin.password) {
        // 保存登录状态
        sessionStorage.setItem('adminLoggedIn', 'true');
        
        // 切换到管理后台
        switchPage('admin-page');
        
        // 加载仪表板数据
        loadDashboard();
    } else {
        alert('用户名或密码错误');
    }
}

// 管理员退出
function adminLogout() {
    sessionStorage.removeItem('adminLoggedIn');
    switchPage('login-page');
    
    // 清空表单
    document.getElementById('admin-username').value = '';
    document.getElementById('admin-password').value = '';
}

// ==================== 测试流程 ====================
function startModule(moduleNum) {
    currentState.currentModule = moduleNum;
    currentState.currentQuestionIndex = 0;
    currentState.isPaused = false;
    
    // 更新模块指示器
    updateModuleIndicator();
    
    // 更新模块名称
    document.getElementById('current-module-name').textContent = moduleNames[moduleNum];
    
    // 设置计时器
    const timeLimit = moduleTimeLimits[moduleNum];
    currentState.timeRemaining = timeLimit * 60;
    startTimer();
    
    // 加载题目
    renderQuestion();
}

function loadQuestionBank(moduleNum) {
    currentState.questionBank[moduleNum] = getRandomQuestionBank(moduleNum);
}

function updateModuleIndicator() {
    const dots = document.querySelectorAll('.module-dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active', 'completed');
        if (index + 1 < currentState.currentModule) {
            dot.classList.add('completed');
        } else if (index + 1 === currentState.currentModule) {
            dot.classList.add('active');
        }
    });
}

function startTimer() {
    clearInterval(currentState.timer);
    updateTimerDisplay();
    
    currentState.timer = setInterval(() => {
        if (!currentState.isPaused) {
            currentState.timeRemaining--;
            updateTimerDisplay();
            
            if (currentState.timeRemaining <= 0) {
                clearInterval(currentState.timer);
                handleTimeUp();
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerEl = document.getElementById('timer');
    const minutes = Math.floor(currentState.timeRemaining / 60);
    const seconds = currentState.timeRemaining % 60;
    timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // 时间少于5分钟时变红
    if (currentState.timeRemaining < 300) {
        timerEl.classList.add('warning');
    } else {
        timerEl.classList.remove('warning');
    }
}

function handleTimeUp() {
    alert('时间到！');
    submitCurrentModule();
}

function pauseTest() {
    currentState.isPaused = true;
    document.getElementById('pause-modal').classList.add('active');
}

function resumeTest() {
    currentState.isPaused = false;
    document.getElementById('pause-modal').classList.remove('active');
}

function renderQuestion() {
    const moduleNum = currentState.currentModule;
    const questions = currentState.questionBank[moduleNum];
    const questionIndex = currentState.currentQuestionIndex;
    const question = questions[questionIndex];
    
    // 更新进度条
    const progress = ((questionIndex + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    
    // 更新题号
    document.getElementById('question-counter').textContent = 
        `${questionIndex + 1} / ${questions.length}`;
    
    // 渲染题目内容
    const container = document.getElementById('question-container');
    container.innerHTML = generateQuestionHTML(question, moduleNum);
    
    // 恢复已保存的答案
    restoreAnswer(question.id, moduleNum);
    
    // 更新导航按钮
    updateNavigationButtons();
}

function generateQuestionHTML(question, moduleNum) {
    const questionTypes = {
        1: '数理逻辑',
        2: '风险决策',
        3: '模式识别',
        4: '日常偏好'
    };
    
    let html = `
        <div class="question-header">
            <span class="question-type">${questionTypes[moduleNum]}</span>
            <div class="question-number">第 ${currentState.currentQuestionIndex + 1} 题</div>
            <div class="question-text">${question.question}</div>
        </div>
    `;
    
    if (moduleNum === 4) {
        // Likert量表
        html += `
            <div class="likert-scale">
                ${[1, 2, 3, 4, 5].map(val => `
                    <div class="likert-item" data-value="${val}" onclick="selectLikert(${val})">
                        <div class="likert-value">${val}</div>
                        <div class="likert-label">${val === 1 ? '非常不符' : val === 5 ? '非常符合' : ''}</div>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (question.type === 'single') {
        // 单选题
        html += `<div class="options-list">`;
        question.options.forEach(option => {
            html += `
                <div class="option-item" data-value="${option.label}" onclick="selectOption('${option.label}')">
                    <span class="option-label">${option.label}</span>
                    <span class="option-text">${option.text}</span>
                </div>
            `;
        });
        html += `</div>`;
        
        // 如果需要理由
        if (question.requiresReason) {
            const savedAnswer = currentState.answers[`module${moduleNum}`][question.id];
            const reasonValue = savedAnswer ? savedAnswer.reason || '' : '';
            html += `
                <div class="text-answer" style="margin-top: 20px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--gray-600);">请简述理由：</label>
                    <textarea id="reason-text" placeholder="请输入您的理由..." onblur="saveReason()">${reasonValue}</textarea>
                </div>
            `;
        }
    } else if (question.type === 'fill') {
        // 填空题
        html += `<div class="fill-blank">`;
        question.blanks.forEach((blank, index) => {
            const savedAnswer = currentState.answers[`module${moduleNum}`][question.id];
            const fillValue = savedAnswer && savedAnswer.fills ? savedAnswer.fills[index] || '' : '';
            html += `
                <div style="margin-bottom: 12px;">
                    <label style="display: inline-block; width: 60px; color: var(--gray-600);">${blank}:</label>
                    <input type="text" class="fill-input" data-index="${index}" 
                           value="${fillValue}" placeholder="涨/跌" 
                           onchange="saveFillAnswer()">
                </div>
            `;
        });
        html += `</div>`;
    }
    
    return html;
}

function selectOption(value) {
    const moduleNum = currentState.currentModule;
    const question = currentState.questionBank[moduleNum][currentState.currentQuestionIndex];
    
    // 更新UI
    document.querySelectorAll('.option-item').forEach(item => {
        item.classList.remove('selected');
        if (item.dataset.value === value) {
            item.classList.add('selected');
        }
    });
    
    // 保存答案
    const existingAnswer = currentState.answers[`module${moduleNum}`][question.id] || {};
    currentState.answers[`module${moduleNum}`][question.id] = {
        ...existingAnswer,
        answer: value
    };
}

function selectLikert(value) {
    const moduleNum = currentState.currentModule;
    const question = currentState.questionBank[moduleNum][currentState.currentQuestionIndex];
    
    // 更新UI
    document.querySelectorAll('.likert-item').forEach(item => {
        item.classList.remove('selected');
        if (parseInt(item.dataset.value) === value) {
            item.classList.add('selected');
        }
    });
    
    // 保存答案
    currentState.answers[`module${moduleNum}`][question.id] = {
        answer: value
    };
}

function saveReason() {
    const moduleNum = currentState.currentModule;
    const question = currentState.questionBank[moduleNum][currentState.currentQuestionIndex];
    const reasonText = document.getElementById('reason-text').value;
    
    const existingAnswer = currentState.answers[`module${moduleNum}`][question.id] || {};
    currentState.answers[`module${moduleNum}`][question.id] = {
        ...existingAnswer,
        reason: reasonText
    };
}

function saveFillAnswer() {
    const moduleNum = currentState.currentModule;
    const question = currentState.questionBank[moduleNum][currentState.currentQuestionIndex];
    const inputs = document.querySelectorAll('.fill-input');
    
    const fills = [];
    inputs.forEach(input => {
        fills[parseInt(input.dataset.index)] = input.value.trim();
    });
    
    currentState.answers[`module${moduleNum}`][question.id] = {
        fills: fills
    };
}

function restoreAnswer(questionId, moduleNum) {
    const savedAnswer = currentState.answers[`module${moduleNum}`][questionId];
    if (!savedAnswer) return;
    
    if (moduleNum === 4) {
        // Likert量表
        if (savedAnswer.answer) {
            selectLikert(savedAnswer.answer);
        }
    } else if (savedAnswer.answer) {
        // 单选题
        selectOption(savedAnswer.answer);
    }
}

function updateNavigationButtons() {
    const moduleNum = currentState.currentModule;
    const questions = currentState.questionBank[moduleNum];
    
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = currentState.currentQuestionIndex === 0;
    
    if (currentState.currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = moduleNum === 4 ? '提交测试' : '下一模块';
    } else {
        nextBtn.textContent = '下一题';
    }
}

function prevQuestion() {
    if (currentState.currentQuestionIndex > 0) {
        currentState.currentQuestionIndex--;
        renderQuestion();
    }
}

function nextQuestion() {
    const moduleNum = currentState.currentModule;
    const questions = currentState.questionBank[moduleNum];
    
    if (currentState.currentQuestionIndex < questions.length - 1) {
        currentState.currentQuestionIndex++;
        renderQuestion();
    } else {
        // 最后一题，提交模块
        submitCurrentModule();
    }
}

function submitCurrentModule() {
    clearInterval(currentState.timer);
    
    if (currentState.currentModule < 4) {
        // 进入下一模块
        if (confirm(`模块${currentState.currentModule}已完成，是否进入模块${currentState.currentModule + 1}？`)) {
            loadQuestionBank(currentState.currentModule + 1);
            startModule(currentState.currentModule + 1);
        }
    } else {
        // 测试完成
        completeTest();
    }
}

function completeTest() {
    // 计算分数
    const scores = calculateScores();
    
    // 保存测试结果
    const testResult = {
        ...currentState.candidate,
        endTime: new Date().toISOString(),
        completed: true,
        answers: currentState.answers,
        scores: scores,
        totalScore: scores.module1 + scores.module2 + scores.module3,
        module4Score: scores.module4
    };
    
    saveTestResult(testResult);
    
    // 显示结果
    displayResult(testResult);
    
    // 切换到完成页面
    switchPage('complete-page');
}

function calculateScores() {
    const scores = {
        module1: 0,
        module2: 0,
        module3: 0,
        module4: 0
    };
    
    // 计算模块1得分
    const module1Questions = currentState.questionBank[1];
    const module1Answers = currentState.answers.module1;
    module1Questions.forEach(q => {
        const answer = module1Answers[q.id];
        if (answer && answer.answer === q.correct) {
            scores.module1 += q.score;
        }
    });
    
    // 计算模块2得分（简答题由管理员评分，这里记录回答）
    const module2Questions = currentState.questionBank[2];
    const module2Answers = currentState.answers.module2;
    module2Questions.forEach(q => {
        const answer = module2Answers[q.id];
        // 模块2的选择题部分自动给分，简答题部分固定给2分（由管理员后续审核）
        if (answer && answer.answer) {
            scores.module2 += 3; // 选择题3分
            if (answer.reason && answer.reason.trim()) {
                scores.module2 += 2; // 简答题2分
            }
        }
    });
    
    // 计算模块3得分
    const module3Questions = currentState.questionBank[3];
    const module3Answers = currentState.answers.module3;
    module3Questions.forEach(q => {
        const answer = module3Answers[q.id];
        if (q.type === 'single') {
            if (answer && answer.answer === q.correct) {
                scores.module3 += q.score;
            }
        } else if (q.type === 'fill') {
            // 填空题
            if (answer && answer.fills) {
                let correctCount = 0;
                answer.fills.forEach((fill, idx) => {
                    if (fill === q.correct[idx]) {
                        correctCount++;
                    }
                });
                scores.module3 += (correctCount / q.correct.length) * q.score;
            }
        }
    });
    
    // 模块4不计分，但计算维度得分
    const module4Questions = questionBanks.module4;
    const module4Answers = currentState.answers.module4;
    let module4Total = 0;
    module4Questions.forEach(q => {
        const answer = module4Answers[q.id];
        if (answer && answer.answer) {
            let score = answer.answer;
            if (q.reverse) {
                score = 6 - score; // 反向计分
            }
            module4Total += score;
        }
    });
    scores.module4 = module4Total;
    
    return scores;
}

function displayResult(testResult) {
    const totalScore = testResult.totalScore;
    document.getElementById('total-score').textContent = totalScore;
    
    let message = '';
    if (totalScore >= scoreThresholds.high) {
        message = '恭喜！您的表现优异，被评为高潜质人才。我们会尽快与您联系。';
    } else if (totalScore >= scoreThresholds.medium) {
        message = '您的表现良好，具有培养价值。我们会综合考虑后与您联系。';
    } else {
        message = '测试已完成，感谢您的参与。我们会根据综合情况评估后与您联系。';
    }
    document.getElementById('result-message').textContent = message;
}

function backToLogin() {
    // 重置状态
    currentState = {
        candidate: null,
        currentModule: 1,
        currentQuestionIndex: 0,
        answers: {},
        questionBank: {},
        timer: null,
        timeRemaining: 0,
        isPaused: false
    };
    
    // 清空表单
    document.getElementById('candidate-name').value = '';
    document.getElementById('candidate-phone').value = '';
    document.getElementById('candidate-school').value = '';
    document.getElementById('candidate-major').value = '';
    
    switchPage('login-page');
}

// ==================== 数据管理 ====================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function saveTestResult(result) {
    const tests = getAllTests();
    const existingIndex = tests.findIndex(t => t.id === result.id);
    
    if (existingIndex >= 0) {
        tests[existingIndex] = result;
    } else {
        tests.push(result);
    }
    
    localStorage.setItem('testResults', JSON.stringify(tests));
}

function getAllTests() {
    const tests = localStorage.getItem('testResults');
    return tests ? JSON.parse(tests) : [];
}

function getTestsByPhone(phone) {
    const tests = getAllTests();
    return tests.filter(t => t.phone === phone);
}

function resumeUnfinishedTest(test) {
    currentState.candidate = {
        id: test.id,
        name: test.name,
        phone: test.phone,
        school: test.school,
        major: test.major,
        startTime: test.startTime,
        completed: false
    };
    
    currentState.answers = test.answers || {
        module1: {},
        module2: {},
        module3: {},
        module4: {}
    };
    
    // 确定从哪个模块继续
    let resumeModule = 1;
    if (Object.keys(currentState.answers.module1).length >= 5) resumeModule = 2;
    if (Object.keys(currentState.answers.module2).length >= 4) resumeModule = 3;
    if (Object.keys(currentState.answers.module3).length >= 3) resumeModule = 4;
    
    loadQuestionBank(resumeModule);
    switchPage('test-page');
    startModule(resumeModule);
}

// ==================== 管理后台 ====================
function bindAdminNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            
            // 更新导航状态
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // 切换内容区域
            document.querySelectorAll('.admin-section').forEach(sec => {
                sec.classList.remove('active');
            });
            document.getElementById(`${section}-section`).classList.add('active');
            
            // 加载对应数据
            if (section === 'dashboard') loadDashboard();
            if (section === 'candidates') loadCandidates();
            if (section === 'analysis') loadAnalysis();
        });
    });
}

function loadDashboard() {
    const tests = getAllTests().filter(t => t.completed);
    
    // 统计数据
    document.getElementById('total-candidates').textContent = tests.length;
    document.getElementById('high-potential').textContent = 
        tests.filter(t => t.totalScore >= scoreThresholds.high).length;
    
    const avgScore = tests.length > 0 
        ? (tests.reduce((sum, t) => sum + t.totalScore, 0) / tests.length).toFixed(1)
        : 0;
    document.getElementById('avg-score').textContent = avgScore;
    document.getElementById('completion-rate').textContent = '100%';
    
    // 分数分布图
    renderScoreDistribution(tests);
    
    // 最近测试
    renderRecentTests(tests.slice(-5).reverse());
}

function renderScoreDistribution(tests) {
    const distribution = {
        '0-20': 0, '21-30': 0, '31-35': 0, '36-40': 0, '41-45': 0, '46-55': 0
    };
    
    tests.forEach(t => {
        const score = t.totalScore;
        if (score <= 20) distribution['0-20']++;
        else if (score <= 30) distribution['21-30']++;
        else if (score <= 35) distribution['31-35']++;
        else if (score <= 40) distribution['36-40']++;
        else if (score <= 45) distribution['41-45']++;
        else distribution['46-55']++;
    });
    
    const container = document.getElementById('score-distribution');
    const maxCount = Math.max(...Object.values(distribution), 1);
    
    container.innerHTML = Object.entries(distribution).map(([range, count]) => `
        <div class="dist-bar" style="height: ${(count / maxCount * 100) || 4}%">
            <span class="dist-value">${count}</span>
            <span class="dist-label">${range}</span>
        </div>
    `).join('');
}

function renderRecentTests(tests) {
    const tbody = document.getElementById('recent-tests-body');
    
    if (tests.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--gray-400);">暂无数据</td></tr>';
        return;
    }
    
    tbody.innerHTML = tests.map(t => {
        const rating = getRating(t.totalScore);
        return `
            <tr>
                <td>${t.name}</td>
                <td>${t.school}</td>
                <td><strong>${t.totalScore}</strong></td>
                <td><span class="rating-badge rating-${rating.class}">${rating.label}</span></td>
                <td>${formatDate(t.endTime)}</td>
                <td><button class="btn btn-text" onclick="viewCandidate('${t.id}')">查看</button></td>
            </tr>
        `;
    }).join('');
}

function loadCandidates() {
    const tests = getAllTests().filter(t => t.completed);
    renderCandidatesTable(tests);
    
    // 绑定筛选
    document.getElementById('search-candidate').addEventListener('input', filterCandidates);
    document.getElementById('filter-rating').addEventListener('change', filterCandidates);
}

function renderCandidatesTable(tests) {
    const tbody = document.getElementById('candidates-body');
    
    if (tests.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; color: var(--gray-400);">暂无数据</td></tr>';
        return;
    }
    
    tbody.innerHTML = tests.map(t => {
        const rating = getRating(t.totalScore);
        return `
            <tr>
                <td>${t.name}</td>
                <td>${t.school}</td>
                <td>${t.major}</td>
                <td>${t.scores.module1}/20</td>
                <td>${t.scores.module2}/20</td>
                <td>${t.scores.module3}/15</td>
                <td>${t.scores.module4}/96</td>
                <td><strong>${t.totalScore}</strong></td>
                <td><span class="rating-badge rating-${rating.class}">${rating.label}</span></td>
                <td><button class="btn btn-text" onclick="viewCandidate('${t.id}')">详情</button></td>
            </tr>
        `;
    }).join('');
}

function filterCandidates() {
    const searchTerm = document.getElementById('search-candidate').value.toLowerCase();
    const ratingFilter = document.getElementById('filter-rating').value;
    
    let tests = getAllTests().filter(t => t.completed);
    
    if (searchTerm) {
        tests = tests.filter(t => 
            t.name.toLowerCase().includes(searchTerm) || 
            t.school.toLowerCase().includes(searchTerm)
        );
    }
    
    if (ratingFilter) {
        tests = tests.filter(t => {
            const rating = getRating(t.totalScore);
            return rating.class === ratingFilter;
        });
    }
    
    renderCandidatesTable(tests);
}

function loadAnalysis() {
    const tests = getAllTests().filter(t => t.completed);
    
    if (tests.length === 0) {
        document.getElementById('dimension-1-stats').textContent = '暂无数据';
        document.getElementById('dimension-2-stats').textContent = '暂无数据';
        document.getElementById('dimension-3-stats').textContent = '暂无数据';
        document.getElementById('dimension-4-stats').textContent = '暂无数据';
        return;
    }
    
    const avgM1 = (tests.reduce((sum, t) => sum + t.scores.module1, 0) / tests.length).toFixed(1);
    const avgM2 = (tests.reduce((sum, t) => sum + t.scores.module2, 0) / tests.length).toFixed(1);
    const avgM3 = (tests.reduce((sum, t) => sum + t.scores.module3, 0) / tests.length).toFixed(1);
    const avgM4 = (tests.reduce((sum, t) => sum + t.scores.module4, 0) / tests.length).toFixed(1);
    
    document.getElementById('dimension-1-stats').textContent = `平均分: ${avgM1}/20`;
    document.getElementById('dimension-2-stats').textContent = `平均分: ${avgM2}/20`;
    document.getElementById('dimension-3-stats').textContent = `平均分: ${avgM3}/15`;
    document.getElementById('dimension-4-stats').textContent = `平均分: ${avgM4}/96`;
}

// ==================== 候选人详情 ====================
function viewCandidate(id) {
    const tests = getAllTests();
    const test = tests.find(t => t.id === id);
    
    if (!test) return;
    
    const rating = getRating(test.totalScore);
    
    const content = `
        <div class="detail-section">
            <h4>基本信息</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">姓名</span>
                    <span class="detail-value">${test.name}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">手机号</span>
                    <span class="detail-value">${test.phone}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">学校</span>
                    <span class="detail-value">${test.school}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">专业</span>
                    <span class="detail-value">${test.major}</span>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h4>得分详情</h4>
            <div class="score-breakdown">
                <div class="score-item">
                    <div class="score-item-label">数理逻辑</div>
                    <div class="score-item-value">${test.scores.module1}</div>
                </div>
                <div class="score-item">
                    <div class="score-item-label">风险决策</div>
                    <div class="score-item-value">${test.scores.module2}</div>
                </div>
                <div class="score-item">
                    <div class="score-item-label">模式识别</div>
                    <div class="score-item-value">${test.scores.module3}</div>
                </div>
                <div class="score-item">
                    <div class="score-item-label">日常偏好</div>
                    <div class="score-item-value">${test.scores.module4}</div>
                </div>
            </div>
            <div style="margin-top: 16px; text-align: center;">
                <span style="font-size: 24px; font-weight: 700; color: var(--primary);">${test.totalScore}</span>
                <span style="color: var(--gray-500);"> / 55分</span>
                <span class="rating-badge rating-${rating.class}" style="margin-left: 12px;">${rating.label}</span>
            </div>
        </div>
        
        <div class="detail-section">
            <h4>潜质评估</h4>
            <div style="background: var(--gray-50); padding: 16px; border-radius: var(--radius);">
                ${generatePotentialAssessment(test)}
            </div>
        </div>
        
        <div class="detail-section">
            <h4>面试建议</h4>
            <div style="background: #eff6ff; padding: 16px; border-radius: var(--radius);">
                ${generateInterviewSuggestions(test)}
            </div>
        </div>
    `;
    
    document.getElementById('modal-candidate-name').textContent = `${test.name} - 测试详情`;
    document.getElementById('modal-candidate-content').innerHTML = content;
    document.getElementById('candidate-modal').classList.add('active');
}

function generatePotentialAssessment(test) {
    let assessment = [];
    
    // 数理逻辑评估
    if (test.scores.module1 >= 16) {
        assessment.push('✓ <strong>数理敏感度高：</strong>数字规律识别和逻辑推理能力优秀');
    } else if (test.scores.module1 >= 12) {
        assessment.push('○ <strong>数理敏感度中等：</strong>具备基本的数字分析能力');
    } else {
        assessment.push('△ <strong>数理敏感度待提升：</strong>数字敏感度可能需要培养');
    }
    
    // 风险决策评估
    if (test.scores.module2 >= 16) {
        assessment.push('✓ <strong>风险决策理性：</strong>具备良好的风险管理意识');
    } else if (test.scores.module2 >= 12) {
        assessment.push('○ <strong>风险决策一般：</strong>需要进一步考察风险意识');
    } else {
        assessment.push('△ <strong>风险决策需关注：</strong>可能存在非理性决策倾向');
    }
    
    // 模式识别评估
    if (test.scores.module3 >= 12) {
        assessment.push('✓ <strong>学习能力强：</strong>能快速掌握规则并应用');
    } else if (test.scores.module3 >= 9) {
        assessment.push('○ <strong>学习能力中等：</strong>规则理解能力尚可');
    } else {
        assessment.push('△ <strong>学习能力待考察：</strong>可能需要更多培训支持');
    }
    
    return assessment.map(a => `<p style="margin-bottom: 8px;">${a}</p>`).join('');
}

function generateInterviewSuggestions(test) {
    const suggestions = [];
    
    if (test.totalScore >= scoreThresholds.high) {
        suggestions.push('该候选人笔试表现优异，建议优先安排面试。');
        suggestions.push('面试重点：考察实际交易场景下的决策能力、抗压能力。');
        suggestions.push('推荐问题：沉没成本测试、简单博弈游戏模拟。');
    } else if (test.totalScore >= scoreThresholds.medium) {
        suggestions.push('该候选人具备培养潜力，建议进入第二轮筛选。');
        suggestions.push('面试重点：深入了解其学习意愿、对电力交易的认知。');
        suggestions.push('注意交叉验证自评与客观题的一致性。');
    } else {
        suggestions.push('该候选人笔试得分偏低，建议谨慎考虑。');
        suggestions.push('如安排面试，重点考察是否有其他相关潜质或特殊经历。');
    }
    
    // 特殊关注
    const module4Score = test.scores.module4;
    if (module4Score > 80 || module4Score < 40) {
        suggestions.push('<strong>注意：</strong>日常偏好量表得分偏高/偏低，可能存在社会称许性偏差，面试时需进一步验证。');
    }
    
    return suggestions.map(s => `<p style="margin-bottom: 8px;">${s}</p>`).join('');
}

function closeModal() {
    document.getElementById('candidate-modal').classList.remove('active');
}

// ==================== 工具函数 ====================
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function getRating(totalScore) {
    if (totalScore >= scoreThresholds.high) {
        return { label: '高潜质', class: 'high' };
    } else if (totalScore >= scoreThresholds.medium) {
        return { label: '可培养', class: 'medium' };
    } else {
        return { label: '需考察', class: 'low' };
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

// ==================== 数据管理功能 ====================
function exportData() {
    const tests = getAllTests();
    const dataStr = JSON.stringify(tests, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `test-results-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

function backupData() {
    const backup = {
        tests: getAllTests(),
        thresholds: scoreThresholds,
        exportTime: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(backup, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

function handleRestoreData(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            
            if (data.tests) {
                localStorage.setItem('testResults', JSON.stringify(data.tests));
            }
            if (data.thresholds) {
                scoreThresholds = data.thresholds;
                localStorage.setItem('scoreThresholds', JSON.stringify(scoreThresholds));
            }
            
            alert('数据恢复成功！');
            loadDashboard();
        } catch (err) {
            alert('数据恢复失败，请检查文件格式');
        }
    };
    reader.readAsText(file);
}

function clearAllData() {
    if (confirm('确定要清空所有测试数据吗？此操作不可恢复！')) {
        localStorage.removeItem('testResults');
        alert('数据已清空');
        loadDashboard();
    }
}

// 保存阈值设置
document.addEventListener('change', function(e) {
    if (e.target.id === 'high-threshold' || e.target.id === 'medium-threshold') {
        const high = parseInt(document.getElementById('high-threshold').value);
        const medium = parseInt(document.getElementById('medium-threshold').value);
        
        if (high <= medium) {
            alert('高潜质分数线必须高于可培养分数线');
            return;
        }
        
        scoreThresholds = { high, medium };
        localStorage.setItem('scoreThresholds', JSON.stringify(scoreThresholds));
    }
});

// 点击模态框外部关闭
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// 防止未登录访问管理后台
window.addEventListener('load', function() {
    const adminPage = document.getElementById('admin-page');
    if (adminPage && adminPage.classList.contains('active')) {
        if (!sessionStorage.getItem('adminLoggedIn')) {
            switchPage('login-page');
        }
    }
});
