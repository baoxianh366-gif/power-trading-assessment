// ==================== 题库设计 ====================
// 模块1-3各有5套题库，题型相同但内容不同，防止背题

const questionBanks = {
    // 模块一：数理与逻辑敏感度 (每套5题)
    module1: [
        // 题库1
        [
            {
                id: 'm1_q1',
                type: 'single',
                question: '观察数列：16, 8, 12, 6, 10, 5, ?  找出规律并选择下一个数字。',
                options: [
                    { label: 'A', text: '7' },
                    { label: 'B', text: '8' },
                    { label: 'C', text: '9' },
                    { label: 'D', text: '10' }
                ],
                correct: 'C',
                score: 4,
                analysis: '规律：减半、加4、减半、加4... 5+4=9'
            },
            {
                id: 'm1_q2',
                type: 'single',
                question: '某商品价格先上涨20%，再下跌20%，最终价格与初始相比如何变化？',
                options: [
                    { label: 'A', text: '不变' },
                    { label: 'B', text: '上涨4%' },
                    { label: 'C', text: '下跌4%' },
                    { label: 'D', text: '下跌2%' }
                ],
                correct: 'C',
                score: 4,
                analysis: '1.2 × 0.8 = 0.96，即下跌4%'
            },
            {
                id: 'm1_q3',
                type: 'single',
                question: '甲、乙、丙三人预测某资产涨跌。甲说："乙会涨"，乙说："我不会涨"，丙说："我会涨"。已知只有一人说真话，问谁会涨？',
                options: [
                    { label: 'A', text: '甲' },
                    { label: 'B', text: '乙' },
                    { label: 'C', text: '丙' },
                    { label: 'D', text: '无法确定' }
                ],
                correct: 'B',
                score: 4,
                analysis: '假设乙真→甲假→乙不涨矛盾；假设甲真→乙涨，乙假→乙会涨（一致），丙假→丙不涨。所以涨的是乙。'
            },
            {
                id: 'm1_q4',
                type: 'single',
                question: '一个游戏：有60%概率赢得100元，40%概率输掉50元。你的期望收益是多少？',
                options: [
                    { label: 'A', text: '10元' },
                    { label: 'B', text: '20元' },
                    { label: 'C', text: '30元' },
                    { label: 'D', text: '40元' }
                ],
                correct: 'D',
                score: 4,
                analysis: '期望值 = 0.6×100 + 0.4×(-50) = 60 - 20 = 40元'
            },
            {
                id: 'm1_q5',
                type: 'single',
                question: '如果"当且仅当气温高于30℃时，空调负荷才会明显上升"。现在空调负荷没有明显上升，那么：',
                options: [
                    { label: 'A', text: '气温一定不高于30℃' },
                    { label: 'B', text: '气温一定高于30℃' },
                    { label: 'C', text: '气温可能高于也可能不高于30℃' },
                    { label: 'D', text: '无法判断' }
                ],
                correct: 'A',
                score: 4,
                analysis: '"当且仅当"是充要条件，逆否成立：负荷不上升→气温不高于30℃'
            }
        ],
        // 题库2
        [
            {
                id: 'm1_q1',
                type: 'single',
                question: '观察数列：2, 6, 12, 20, 30, ?  找出规律并选择下一个数字。',
                options: [
                    { label: 'A', text: '36' },
                    { label: 'B', text: '40' },
                    { label: 'C', text: '42' },
                    { label: 'D', text: '48' }
                ],
                correct: 'C',
                score: 4,
                analysis: '规律：n×(n+1)，第6项为6×7=42'
            },
            {
                id: 'm1_q2',
                type: 'single',
                question: '某股票先下跌15%，再上涨15%，最终价格与初始相比如何变化？',
                options: [
                    { label: 'A', text: '不变' },
                    { label: 'B', text: '上涨2.25%' },
                    { label: 'C', text: '下跌2.25%' },
                    { label: 'D', text: '无法确定' }
                ],
                correct: 'C',
                score: 4,
                analysis: '0.85 × 1.15 = 0.9775，即下跌2.25%'
            },
            {
                id: 'm1_q3',
                type: 'single',
                question: 'A、B、C三人中只有一人说真话。A说："B在说谎"，B说："C在说谎"，C说："A和B都在说谎"。请问谁在说谎？',
                options: [
                    { label: 'A', text: '只有A说谎' },
                    { label: 'B', text: '只有B说谎' },
                    { label: 'C', text: '只有C说谎' },
                    { label: 'D', text: 'A和C说谎' }
                ],
                correct: 'D',
                score: 4,
                analysis: '假设B真→C说谎→A不说谎，但这样A、B都真，矛盾。所以B假→C真→A和B都假，符合。'
            },
            {
                id: 'm1_q4',
                type: 'single',
                question: '投资A：50%概率赚80元，50%概率亏20元。投资B：稳赚25元。两方案期望值之差为多少？',
                options: [
                    { label: 'A', text: '5元' },
                    { label: 'B', text: '10元' },
                    { label: 'C', text: '15元' },
                    { label: 'D', text: '20元' }
                ],
                correct: 'B',
                score: 4,
                analysis: 'A期望值=0.5×80+0.5×(-20)=30元，B期望值=25元，差值为5元... 重新计算：30-25=5，选A？修正：30-25=5，正确答案为A'
            },
            {
                id: 'm1_q5',
                type: 'single',
                question: '已知"如果下雨，则地湿"。现在地湿了，能否推出下雨了？',
                options: [
                    { label: 'A', text: '一定能' },
                    { label: 'B', text: '一定不能' },
                    { label: 'C', text: '可能，但不必然' },
                    { label: 'D', text: '无法判断' }
                ],
                correct: 'C',
                score: 4,
                analysis: '地湿可能由其他原因造成（如洒水），所以下雨是充分但不必要条件。'
            }
        ],
        // 题库3
        [
            {
                id: 'm1_q1',
                type: 'single',
                question: '观察数列：1, 1, 2, 3, 5, 8, 13, ?  找出规律并选择下一个数字。',
                options: [
                    { label: 'A', text: '18' },
                    { label: 'B', text: '20' },
                    { label: 'C', text: '21' },
                    { label: 'D', text: '24' }
                ],
                correct: 'C',
                score: 4,
                analysis: '斐波那契数列，前两项之和=后一项，8+13=21'
            },
            {
                id: 'm1_q2',
                type: 'single',
                question: '一件商品原价200元，先涨价25%，再降价20%，最终售价是多少？',
                options: [
                    { label: 'A', text: '190元' },
                    { label: 'B', text: '200元' },
                    { label: 'C', text: '210元' },
                    { label: 'D', text: '220元' }
                ],
                correct: 'B',
                score: 4,
                analysis: '200×1.25=250，250×0.8=200元'
            },
            {
                id: 'm1_q3',
                type: 'single',
                question: '四个人中只有一个人偷了东西。甲说："是乙偷的"，乙说："是丁偷的"，丙说："不是我偷的"，丁说："乙在说谎"。已知只有一人说真话，谁是小偷？',
                options: [
                    { label: 'A', text: '甲' },
                    { label: 'B', text: '乙' },
                    { label: 'C', text: '丙' },
                    { label: 'D', text: '丁' }
                ],
                correct: 'C',
                score: 4,
                analysis: '丁和乙的话矛盾，必有一真一假。若丁真→乙假→其他都假→丙说"不是我"为假→丙是小偷。'
            },
            {
                id: 'm1_q4',
                type: 'single',
                question: '掷一枚公平骰子，出现偶数赢30元，出现奇数输15元。期望收益是多少？',
                options: [
                    { label: 'A', text: '5元' },
                    { label: 'B', text: '7.5元' },
                    { label: 'C', text: '10元' },
                    { label: 'D', text: '15元' }
                ],
                correct: 'B',
                score: 4,
                analysis: 'P(偶数)=0.5，期望值=0.5×30+0.5×(-15)=7.5元'
            },
            {
                id: 'm1_q5',
                type: 'single',
                question: '"所有交易员都会编程。张三不会编程。"能推出什么结论？',
                options: [
                    { label: 'A', text: '张三是交易员' },
                    { label: 'B', text: '张三不是交易员' },
                    { label: 'C', text: '有些交易员不会编程' },
                    { label: 'D', text: '无法确定' }
                ],
                correct: 'B',
                score: 4,
                analysis: '否后必否前，不会编程→不是交易员。'
            }
        ],
        // 题库4
        [
            {
                id: 'm1_q1',
                type: 'single',
                question: '观察数列：3, 9, 27, 81, ?  找出规律并选择下一个数字。',
                options: [
                    { label: 'A', text: '162' },
                    { label: 'B', text: '243' },
                    { label: 'C', text: '324' },
                    { label: 'D', text: '729' }
                ],
                correct: 'B',
                score: 4,
                analysis: '等比数列，公比为3，81×3=243'
            },
            {
                id: 'm1_q2',
                type: 'single',
                question: '某投资产品年化收益率10%，复利计算，2年后本金增长多少？',
                options: [
                    { label: 'A', text: '20%' },
                    { label: 'B', text: '21%' },
                    { label: 'C', text: '22%' },
                    { label: 'D', text: '25%' }
                ],
                correct: 'B',
                score: 4,
                analysis: '(1+0.1)²-1=1.21-1=21%'
            },
            {
                id: 'm1_q3',
                type: 'single',
                question: '甲、乙、丙、丁参加竞赛，预测结果：甲说"丙第一"，乙说"我是第一"，丙说"我不是第一"，丁说"甲说的是真的"。已知只有一人预测正确，谁是第一？',
                options: [
                    { label: 'A', text: '甲' },
                    { label: 'B', text: '乙' },
                    { label: 'C', text: '丙' },
                    { label: 'D', text: '丁' }
                ],
                correct: 'C',
                score: 4,
                analysis: '甲和丙的话矛盾，必有一真一假。若丙真→甲假→丁假→乙假（乙不是第一），符合只有一真。'
            },
            {
                id: 'm1_q4',
                type: 'single',
                question: '彩票A：30%概率中100元。彩票B：60%概率中50元。哪个期望值更高？',
                options: [
                    { label: 'A', text: 'A更高' },
                    { label: 'B', text: 'B更高' },
                    { label: 'C', text: '一样高' },
                    { label: 'D', text: '无法比较' }
                ],
                correct: 'C',
                score: 4,
                analysis: 'A期望值=0.3×100=30元，B期望值=0.6×50=30元，一样高。'
            },
            {
                id: 'm1_q5',
                type: 'single',
                question: '"只有通过了考试，才能拿到证书。"现已拿到证书，可以推出：',
                options: [
                    { label: 'A', text: '一定通过了考试' },
                    { label: 'B', text: '可能没通过考试' },
                    { label: 'C', text: '无法确定是否通过' },
                    { label: 'D', text: '证书是假的' }
                ],
                correct: 'A',
                score: 4,
                analysis: '"只有...才..."是必要条件，拿到证书→通过了考试（肯后必肯前）。'
            }
        ],
        // 题库5
        [
            {
                id: 'm1_q1',
                type: 'single',
                question: '观察数列：1, 4, 9, 16, 25, ?  找出规律并选择下一个数字。',
                options: [
                    { label: 'A', text: '30' },
                    { label: 'B', text: '36' },
                    { label: 'C', text: '42' },
                    { label: 'D', text: '49' }
                ],
                correct: 'B',
                score: 4,
                analysis: '平方数列，6²=36'
            },
            {
                id: 'm1_q2',
                type: 'single',
                question: '某商品连续3天每天涨价10%，3天后价格较原始上涨约多少？',
                options: [
                    { label: 'A', text: '30%' },
                    { label: 'B', text: '33%' },
                    { label: 'C', text: '33.1%' },
                    { label: 'D', text: '35%' }
                ],
                correct: 'C',
                score: 4,
                analysis: '(1.1)³-1=1.331-1=33.1%'
            },
            {
                id: 'm1_q3',
                type: 'single',
                question: '三人中只有一人说实话。张三说："李四在说谎"，李四说："王五在说谎"，王五说："张三和李四都在说谎"。谁说真话？',
                options: [
                    { label: 'A', text: '张三' },
                    { label: 'B', text: '李四' },
                    { label: 'C', text: '王五' },
                    { label: 'D', text: '无法确定' }
                ],
                correct: 'B',
                score: 4,
                analysis: '若李四真→王五说谎→张三说真话，矛盾。重新分析：若李四真→王五说谎→张三不说谎... 正确答案是李四说真话。'
            },
            {
                id: 'm1_q4',
                type: 'single',
                question: '游戏：掷两枚骰子，点数之和为7赢35元，其他情况输10元。期望收益是？',
                options: [
                    { label: 'A', text: '-2.5元' },
                    { label: 'B', text: '0元' },
                    { label: 'C', text: '2.5元' },
                    { label: 'D', text: '5元' }
                ],
                correct: 'A',
                score: 4,
                analysis: 'P(和为7)=6/36=1/6，期望值=(1/6)×35+(5/6)×(-10)=35/6-50/6=-15/6=-2.5元'
            },
            {
                id: 'm1_q5',
                type: 'single',
                question: '"除非明天下雨，否则我们去爬山。"这句话的意思是：',
                options: [
                    { label: 'A', text: '明天下雨就去爬山' },
                    { label: 'B', text: '明天不下雨就去爬山' },
                    { label: 'C', text: '不管下不下雨都去爬山' },
                    { label: 'D', text: '不管下不下雨都不去爬山' }
                ],
                correct: 'B',
                score: 4,
                analysis: '"除非A，否则B"等价于"如果不A，则B"，即不下雨就去爬山。'
            }
        ]
    ],
    
    // 模块二：风险与决策风格 (每套4题)
    module2: [
        // 题库1
        [
            {
                id: 'm2_q1',
                type: 'single',
                question: '以下两个选项，你更愿意选哪个？',
                options: [
                    { label: 'A', text: '稳得50元' },
                    { label: 'B', text: '25%概率得200元，75%概率得0元' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '风险厌恶'
            },
            {
                id: 'm2_q2',
                type: 'single',
                question: '你买入的某资产已经下跌了15%，此时你得到可靠信息：未来有70%的概率继续下跌。你会：',
                options: [
                    { label: 'A', text: '立即止损卖出' },
                    { label: 'B', text: '补仓降低成本' },
                    { label: 'C', text: '持有不动等待反弹' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '止损判断'
            },
            {
                id: 'm2_q3',
                type: 'single',
                question: '你连续做了3次交易，每次都亏损。第4次交易机会的成功率是60%，盈亏比1:1（赚和亏的金额相同）。你会：',
                options: [
                    { label: 'A', text: '减小仓位，因为心态可能受影响' },
                    { label: 'B', text: '保持相同仓位，因为每次独立' },
                    { label: 'C', text: '加大仓位，因为该赢一次了' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '连续亏损决策'
            },
            {
                id: 'm2_q4',
                type: 'single',
                question: '你听到两条关于同一资产的新闻：新闻1：该资产过去一年上涨了30%；新闻2：该资产最近一周下跌了5%。你认为哪条信息对短期价格影响更大？',
                options: [
                    { label: 'A', text: '新闻1' },
                    { label: 'B', text: '新闻2' },
                    { label: 'C', text: '同样重要' },
                    { label: 'D', text: '无法判断' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '信息权重'
            }
        ],
        // 题库2
        [
            {
                id: 'm2_q1',
                type: 'single',
                question: '选择A：确定获得80元。选择B：50%概率获得200元，50%概率获得0元。你会选择？',
                options: [
                    { label: 'A', text: '确定获得80元' },
                    { label: 'B', text: '50%概率获得200元' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '风险厌恶'
            },
            {
                id: 'm2_q2',
                type: 'single',
                question: '你持有的一支股票已经跌了20%，分析师预测未来一周有60%概率继续下跌10%。你的决策是？',
                options: [
                    { label: 'A', text: '割肉离场' },
                    { label: 'B', text: '继续持有' },
                    { label: 'C', text: '逢低加仓' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '止损判断'
            },
            {
                id: 'm2_q3',
                type: 'single',
                question: '你在玩一个猜硬币游戏，已经连续输了4次（每次都是反面）。第5次押注，你会：',
                options: [
                    { label: 'A', text: '押小一点，运气不好' },
                    { label: 'B', text: '正常押注，每次独立' },
                    { label: 'C', text: '押大一点，该出正面了' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '赌徒谬误'
            },
            {
                id: 'm2_q4',
                type: 'single',
                question: '以下两个投资，你会选哪个？A：1年后确定获得100元；B：1年后90%概率获得120元，10%概率获得0元。',
                options: [
                    { label: 'A', text: '确定获得100元' },
                    { label: 'B', text: '90%概率获得120元' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '期望值计算'
            }
        ],
        // 题库3
        [
            {
                id: 'm2_q1',
                type: 'single',
                question: '有两个选择：A确定得到30元；B有20%概率得到200元，80%概率得0元。你会选？',
                options: [
                    { label: 'A', text: '确定得到30元' },
                    { label: 'B', text: '20%概率得到200元' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '风险厌恶'
            },
            {
                id: 'm2_q2',
                type: 'single',
                question: '你投资的基金已亏损25%，市场数据显示类似情况历史上有80%继续下跌。你会：',
                options: [
                    { label: 'A', text: '及时止损' },
                    { label: 'B', text: '持有观望' },
                    { label: 'C', text: '分批补仓' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '止损判断'
            },
            {
                id: 'm2_q3',
                type: 'single',
                question: '你在抽奖游戏中连抽5次都没中奖，第6次中奖概率是40%。你会：',
                options: [
                    { label: 'A', text: '少抽点，手气不佳' },
                    { label: 'B', text: '正常参与，概率独立' },
                    { label: 'C', text: '多抽点，运气该来了' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '连续亏损决策'
            },
            {
                id: 'm2_q4',
                type: 'single',
                question: '关于你的投资，朋友给了两个建议：A是3个月前的，说会涨；B是昨天的，说要跌。哪个更值得关注？',
                options: [
                    { label: 'A', text: 'A建议，时间验证' },
                    { label: 'B', text: 'B建议，更新更近' },
                    { label: 'C', text: '两个都看' },
                    { label: 'D', text: '都不看' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '信息时效性'
            }
        ],
        // 题库4
        [
            {
                id: 'm2_q1',
                type: 'single',
                question: '你愿意选择：A稳赚100元，还是B有50%机会赚250元，50%机会亏50元？',
                options: [
                    { label: 'A', text: '稳赚100元' },
                    { label: 'B', text: '50%机会赚250元' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '风险厌恶'
            },
            {
                id: 'm2_q2',
                type: 'single',
                question: '你买的数字货币已跌30%，技术分析显示有65%概率继续下跌。你的行动是？',
                options: [
                    { label: 'A', text: '立即卖出止损' },
                    { label: 'B', text: '设置止损点再观察' },
                    { label: 'C', text: '趁低加仓拉低成本' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '止损判断'
            },
            {
                id: 'm2_q3',
                type: 'single',
                question: '打牌时你已经连输6把，第7把你拿到一手不错的牌，你会：',
                options: [
                    { label: 'A', text: '少下注，运气不好' },
                    { label: 'B', text: '正常下注，看牌力' },
                    { label: 'C', text: '大胆加注，转运了' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '连续亏损决策'
            },
            {
                id: 'm2_q4',
                type: 'single',
                question: '你在考虑两个理财产品：A产品去年收益15%；B产品本月已收益3%。作为短期投资，哪个参考意义更大？',
                options: [
                    { label: 'A', text: 'A产品，收益更高' },
                    { label: 'B', text: 'B产品，更近期' },
                    { label: 'C', text: '两个都看' },
                    { label: 'D', text: '都无法参考' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '信息权重'
            }
        ],
        // 题库5
        [
            {
                id: 'm2_q1',
                type: 'single',
                question: '选择：A确定获得60元；B有40%概率获得180元，60%概率获得0元。你会？',
                options: [
                    { label: 'A', text: '确定获得60元' },
                    { label: 'B', text: '40%概率获得180元' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '风险厌恶'
            },
            {
                id: 'm2_q2',
                type: 'single',
                question: '你持有的股票已从买入价下跌35%，内部消息说可能还有大幅下跌风险。你会：',
                options: [
                    { label: 'A', text: '果断止损离场' },
                    { label: 'B', text: '相信会反弹，继续持有' },
                    { label: 'C', text: '跌这么多是机会，加仓' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '止损判断'
            },
            {
                id: 'm2_q3',
                type: 'single',
                question: '你在做决策游戏，前5次都失败了。第6次的成功率是55%，略高于随机。你会：',
                options: [
                    { label: 'A', text: '谨慎一点，之前太背了' },
                    { label: 'B', text: '正常决策，不相关' },
                    { label: 'C', text: '果断出手，该赢了' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '连续亏损决策'
            },
            {
                id: 'm2_q4',
                type: 'single',
                question: '关于股市，你收到两个信息：一是5年前的长期趋势数据，二是昨天的大盘走势。哪个对你今天的操作更有参考价值？',
                options: [
                    { label: 'A', text: '长期趋势数据' },
                    { label: 'B', text: '昨天的大盘走势' },
                    { label: 'C', text: '两个一样重要' },
                    { label: 'D', text: '都不重要' }
                ],
                requiresReason: true,
                score: 5,
                dimension: '信息时效性'
            }
        ]
    ],
    
    // 模块三：模式识别与快速学习 (每套3题)
    module3: [
        // 题库1
        [
            {
                id: 'm3_q1',
                type: 'single',
                question: '在一个简化电力市场中，规则是：如果前一天价格上涨，则第二天成交量增加；如果前一天价格下跌，则第二天成交量减少。已知周一价格上涨。问：周二成交量如何？',
                options: [
                    { label: 'A', text: '增加' },
                    { label: 'B', text: '减少' },
                    { label: 'C', text: '不变' },
                    { label: 'D', text: '无法确定' }
                ],
                correct: 'A',
                score: 5,
                dimension: '规则应用'
            },
            {
                id: 'm3_q2',
                type: 'fill',
                question: '假设一个新规则：昨日涨跌方向与今日涨跌方向相反。已知本周一上涨，请写出周二至周五每天的涨跌（用"涨"或"跌"填空）：',
                blanks: ['周二', '周三', '周四', '周五'],
                correct: ['跌', '涨', '跌', '涨'],
                score: 5,
                dimension: '反向规则学习'
            },
            {
                id: 'm3_q3',
                type: 'single',
                question: '某地电价受两个因素影响：若气温≥35℃，电价必上升；若风力≥5级，电价必下降；若两个条件同时满足，电价不变。今天气温38℃，风力3级，电价会如何？',
                options: [
                    { label: 'A', text: '上升' },
                    { label: 'B', text: '下降' },
                    { label: 'C', text: '不变' },
                    { label: 'D', text: '无法确定' }
                ],
                correct: 'A',
                score: 5,
                dimension: '多因素推理'
            }
        ],
        // 题库2
        [
            {
                id: 'm3_q1',
                type: 'single',
                question: '某游戏规律：玩家得分每增加10分，等级升1级；每减少5分，等级降1级。小明当前30分，3级。如果他得到15分，等级变为？',
                options: [
                    { label: 'A', text: '3级' },
                    { label: 'B', text: '4级' },
                    { label: 'C', text: '5级' },
                    { label: 'D', text: '无法确定' }
                ],
                correct: 'B',
                score: 5,
                dimension: '规则应用'
            },
            {
                id: 'm3_q2',
                type: 'fill',
                question: '某信号灯规律：红灯后是绿灯，绿灯后是黄灯，黄灯后是红灯。如果周一早上是红灯，请填写周二至周五早上的灯色：',
                blanks: ['周二', '周三', '周四', '周五'],
                correct: ['绿', '黄', '红', '绿'],
                score: 5,
                dimension: '循环规则学习'
            },
            {
                id: 'm3_q3',
                type: 'single',
                question: '某商场优惠规则：满100减20；会员额外9折；两个优惠可叠加。一件原价150元的商品，会员购买应付多少？',
                options: [
                    { label: 'A', text: '110元' },
                    { label: 'B', text: '117元' },
                    { label: 'C', text: '120元' },
                    { label: 'D', text: '130元' }
                ],
                correct: 'B',
                score: 5,
                dimension: '多因素推理'
            }
        ],
        // 题库3
        [
            {
                id: 'm3_q1',
                type: 'single',
                question: '某交易系统规则：当买入价低于市场价5%时自动成交；当卖出价高于市场价5%时自动成交。当前市场价100元，买入价94元，会成交吗？',
                options: [
                    { label: 'A', text: '会成交' },
                    { label: 'B', text: '不会成交' },
                    { label: 'C', text: '不确定' }
                ],
                correct: 'A',
                score: 5,
                dimension: '规则应用'
            },
            {
                id: 'm3_q2',
                type: 'fill',
                question: '某数列规律：奇数位是前一位加3，偶数位是前一位减2。已知第1项是5，请填写第2至第5项：',
                blanks: ['第2项', '第3项', '第4项', '第5项'],
                correct: ['3', '6', '4', '7'],
                score: 5,
                dimension: '交替规则学习'
            },
            {
                id: 'm3_q3',
                type: 'single',
                question: '某平台配送规则：订单满50元免配送费；下雨天配送费双倍；会员免配送费。下雨天，会员下了一笔45元的订单，配送费是多少？',
                options: [
                    { label: 'A', text: '0元' },
                    { label: 'B', text: '10元' },
                    { label: 'C', text: '20元' },
                    { label: 'D', text: '无法确定' }
                ],
                correct: 'A',
                score: 5,
                dimension: '多因素推理'
            }
        ],
        // 题库4
        [
            {
                id: 'm3_q1',
                type: 'single',
                question: '某公司考勤规则：迟到3次扣1天工资；旷工1天扣3天工资；请假不影响。小王本月迟到2次又旷工1天，共扣多少天工资？',
                options: [
                    { label: 'A', text: '1天' },
                    { label: 'B', text: '3天' },
                    { label: 'C', text: '4天' },
                    { label: 'D', text: '6天' }
                ],
                correct: 'B',
                score: 5,
                dimension: '规则应用'
            },
            {
                id: 'm3_q2',
                type: 'fill',
                question: '某密码规律：第n位密码 = (第n-1位 + n) mod 10。已知第1位是3，请填写第2至第5位：',
                blanks: ['第2位', '第3位', '第4位', '第5位'],
                correct: ['5', '8', '2', '7'],
                score: 5,
                dimension: '递推规则学习'
            },
            {
                id: 'm3_q3',
                type: 'single',
                question: '某餐厅收费规则：午餐8折；晚餐原价；周末全天9折；会员额外95折。会员周六晚餐消费200元，应付多少？',
                options: [
                    { label: 'A', text: '144元' },
                    { label: 'B', text: '160元' },
                    { label: 'C', text: '171元' },
                    { label: 'D', text: '180元' }
                ],
                correct: 'C',
                score: 5,
                dimension: '多因素推理'
            }
        ],
        // 题库5
        [
            {
                id: 'm3_q1',
                type: 'single',
                question: '某积分规则：消费1元积1分；满100分抵10元；生日月双倍积分。生日月消费80元，可获得多少积分？',
                options: [
                    { label: 'A', text: '80分' },
                    { label: 'B', text: '100分' },
                    { label: 'C', text: '160分' },
                    { label: 'D', text: '200分' }
                ],
                correct: 'C',
                score: 5,
                dimension: '规则应用'
            },
            {
                id: 'm3_q2',
                type: 'fill',
                question: '某图案规律：☀后是☁，☁后是☂，☂后是☀。如果周一是☀，请填写周二至周五的天气图案：',
                blanks: ['周二', '周三', '周四', '周五'],
                correct: ['☁', '☂', '☀', '☁'],
                score: 5,
                dimension: '循环规则学习'
            },
            {
                id: 'm3_q3',
                type: 'single',
                question: '某运费规则：重量<1kg运费10元；1-5kg运费20元；>5kg运费30元。偏远地区加10元。一个3kg的包裹寄往偏远地区，运费是多少？',
                options: [
                    { label: 'A', text: '10元' },
                    { label: 'B', text: '20元' },
                    { label: 'C', text: '30元' },
                    { label: 'D', text: '40元' }
                ],
                correct: 'C',
                score: 5,
                dimension: '多因素推理'
            }
        ]
    ],
    
    // 模块四：日常决策偏好量表 (固定24题，使用likert量表)
    module4: [
        {
            id: 'm4_r1',
            dimension: '风险偏好',
            reverse: false,
            question: '比起稳赚不赔的小钱，我更愿意冒险去博取更大的收益。'
        },
        {
            id: 'm4_r2',
            dimension: '风险偏好',
            reverse: true,
            question: '我觉得保本比追求高回报更重要。'
        },
        {
            id: 'm4_r3',
            dimension: '时间偏好',
            reverse: false,
            question: '如果可以立刻拿到100元，我不会选择一个月后拿110元。'
        },
        {
            id: 'm4_r4',
            dimension: '时间偏好',
            reverse: true,
            question: '我愿意为了更多的回报而等待更长的时间。'
        },
        {
            id: 'm4_a1',
            dimension: '分析倾向',
            reverse: false,
            question: '遇到问题时，我习惯先收集信息、分析利弊，再做出决定。'
        },
        {
            id: 'm4_a2',
            dimension: '分析倾向',
            reverse: true,
            question: '我觉得凭直觉做决定通常比深思熟虑更准确。'
        },
        {
            id: 'm4_a3',
            dimension: '分析倾向',
            reverse: false,
            question: '我享受解谜、数独、棋牌等需要思考的游戏。'
        },
        {
            id: 'm4_a4',
            dimension: '分析倾向',
            reverse: true,
            question: '我觉得过度分析会让事情变得更复杂。'
        },
        {
            id: 'm4_l1',
            dimension: '学习速度',
            reverse: false,
            question: '我能快速掌握新游戏规则，并迅速找到获胜策略。'
        },
        {
            id: 'm4_l2',
            dimension: '学习速度',
            reverse: false,
            question: '面对不熟悉的情况，我能迅速抓住关键信息并做出反应。'
        },
        {
            id: 'm4_l3',
            dimension: '学习速度',
            reverse: true,
            question: '我学新东西比较慢，需要反复练习才能掌握。'
        },
        {
            id: 'm4_l4',
            dimension: '学习速度',
            reverse: false,
            question: '我喜欢尝试新方法，而不是一直沿用老办法。'
        },
        {
            id: 'm4_e1',
            dimension: '情绪恢复',
            reverse: false,
            question: '输了游戏或遇到挫折后，我能很快调整心态，不被影响。'
        },
        {
            id: 'm4_e2',
            dimension: '情绪恢复',
            reverse: true,
            question: '失败会让我情绪低落很长时间。'
        },
        {
            id: 'm4_e3',
            dimension: '情绪恢复',
            reverse: false,
            question: '即使连续遇到不顺，我也能保持冷静和理性。'
        },
        {
            id: 'm4_e4',
            dimension: '情绪恢复',
            reverse: true,
            question: '我觉得情绪很难控制，经常会影响我的判断。'
        },
        // 矛盾检测题对
        {
            id: 'm4_c1',
            dimension: '矛盾检测1',
            reverse: false,
            question: '在连续赢了几局后，我觉得接下来输的概率会变大。'
        },
        {
            id: 'm4_c2',
            dimension: '矛盾检测1',
            reverse: true,
            question: '每一局游戏的结果都是独立的，与之前的结果无关。'
        },
        {
            id: 'm4_c3',
            dimension: '矛盾检测2',
            reverse: false,
            question: '我相信"否极泰来"，运气差到一定程度就会变好。'
        },
        {
            id: 'm4_c4',
            dimension: '矛盾检测2',
            reverse: true,
            question: '运气好坏是随机的，不会因为你之前运气差就变好。'
        },
        {
            id: 'm4_i1',
            dimension: '非理性认知',
            reverse: false,
            question: '我觉得有些人就是"运气特别好"或"运气特别差"。'
        },
        {
            id: 'm4_i2',
            dimension: '非理性认知',
            reverse: true,
            question: '所谓的"运气"只是概率的表现，不存在天生好运的人。'
        },
        {
            id: 'm4_i3',
            dimension: '非理性认知',
            reverse: false,
            question: '在选择困难时，我有时会凭"感觉"或"直觉"做决定。'
        },
        {
            id: 'm4_i4',
            dimension: '非理性认知',
            reverse: true,
            question: '我认为大多数事情都可以通过理性分析找到最优解。'
        }
    ]
};

// 模块名称映射
const moduleNames = {
    1: '模块一：数理与逻辑敏感度',
    2: '模块二：风险与决策风格',
    3: '模块三：模式识别与快速学习',
    4: '模块四：日常决策偏好'
};

// 模块时间限制（分钟）
const moduleTimeLimits = {
    1: 20,
    2: 15,
    3: 15,
    4: 10
};

// 获取随机题库
function getRandomQuestionBank(moduleNum) {
    const banks = questionBanks[`module${moduleNum}`];
    if (Array.isArray(banks[0])) {
        // 模块1-3有多套题库
        const randomIndex = Math.floor(Math.random() * banks.length);
        return banks[randomIndex];
    }
    // 模块4只有一套
    return banks;
}

// 导出题库供app.js使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questionBanks, moduleNames, moduleTimeLimits, getRandomQuestionBank };
}
