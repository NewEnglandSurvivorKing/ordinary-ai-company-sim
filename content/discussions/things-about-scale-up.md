---

id: DISCUSS-DIFFICULTY-RND-003

title:更大更强的模型不是免费的

type: discussion-issue

status: draft

source: [U, L]

contributors: ["安蒂侨钚嗣", "某种有机智能", "奇点复读机", "Sunbread OverClock", "0xab16a9be", "如更云如更", "海胆", "月岛芙兰灯", "llm:Deepseek V4 Pro", "华中的荆棘"]

created: 2026-07-02

updated: 2026-07-03

tags: [discussions, systems/ai-training-sim, difficulty, tech-tree, infra]

depends_on: [RND-SYSTEM-001, DISCUSS-DIFFICULTY-RND-001, DISCUSS-DIFFICULTY-RND-002, INFRA-SCALE-001]

conflicts_with: []

related_endings: []

---

# 更大更强的模型不是免费的

> 本节收录模型scale up的条件和相关技术点，包括chinchilla公式、roofline、部署/通信科技等

## scale-up的理论制约条件

>  "Sunbread OverClock"：游戏会涉及好几个law，首先你手头有多少数据决定了你的参数量大概需要多大，这个是chinchilla变体，至于参数这个可以学习安东，反正也不需要完全写实（前面说过真写实就违反nda了）；其次如果要做精细配比的话，你首先得点出来课程预训练（前置是继续预训练），然后直接使用compute scaling law来在原规模（而非缩小规模，这里游戏会做出来，就是模型性能不遵循chinchilla的情况，然后发现你咋赶都赶不上npc frontier）上做checkpoint赛马实验，不点课程预训练的话调配比的沉没成本难以接受
>
> "Sunbread OverClock"：如果你infra做的够好，但你数据积累太少，又没有点出合成数据和继续预训练，你强行拉大参数量也是个欠训的模型

1. 数据。采用chinchilla变体，依据持有数据量决定模型参数量，但不需要完全写实。
2. 精细配比前置条件：继续预训练→课程预训练。不点课程预训练的话调配比的沉没成本难以接受。
3. infra。infra水平决定参数量和模型训练程度。infra和数据必须相辅相成，否则强行提高参数量而数据不足会导致模型欠训。

## roofline

> "Sunbread OverClock"：本来实际利用率也就在roofline的30%左右，大有优化空间。你可以做的比较安东，比如搞个sigmoid模拟边际效益递减。
>
> "某种有机智能"：如果只是给一个算力增加数量，玩家会抱怨怎么越往后期反而增益越小。如果以吃满多少理论极限的形式，可能会更好理解。

设置硬件理论极限和sigmoid边际效益递减曲线，不需要太严谨真实。

## 部署/通信科技

[[infra-and-model-scale|模型规模与训练/推理基础设施]]已有DP/PP/TP/EP/CP-SP，此处补充一些相关的前置技术点：跨卡通信Ⅲ（EP前置），稀疏注意力，DSA

## scale-up附加题：降智

>   "Sunbread OverClock"：等到了这个程度的时候，你会发现需要的卡的数量会越来越多，越来越多，越来越多，越来越多，然后就得融资。然后降智不就来了。dp通常不可能撤，不然用户调用直接就崩了，长期影响口碑，于是只能在激活专家量上面下手脚。 腾出来的卡拿去做更多的实验
>
> "某种有机智能"：除了激活专家和量化，还有哪些性价比比较好的降智方法来着，我看dsa的注意力窗口长度，缩引数量什么的都能降。
>
> "Sunbread OverClock"：他们点了稀疏注意力， 可以降低亿点cp压力。 游戏科技树别指望做这种焚诀（。deepthink做了你抄过来就行，，，

当scale-up所需要的算力卡越来越多，玩家需要的不止是开源，还有节流。在降低激活专家量、路由、稀疏注意力、pd分离等策略下腾出计算卡做更多实验，有的策略会导致旧模型降智。

此设计可以宣传科普为什么 ai 公司会降智以及怎么降智，吸引部分大模型用户。

## 可接入的既有节点

- [[infra-and-model-scale|模型规模与训练/推理基础设施]]已有DP/PP/TP/EP/CP-SP段落，可以承接部署/通信科技。
- [[difficulty-player-assist-rnd-tech-tree|难度分层、玩家辅助与研发科技树随机性]]已有模型规模和基础设施约束段落，可以承接scale-up的理论制约条件。
- [[what-should-consider-to-keep-competitiveness|保持公司竞争力需要考虑的因素]]已有科技树段落，含有本节提到的部分技术。
- [[release-and-product|发布、降智、API 与产品策略]]已有降智策略，结合本节可补充降智的收益。