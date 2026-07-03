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

1. 数据。采用chinchilla变体，依据持有数据量决定模型参数量，但不需要完全写实。
2. 精细配比前置条件：继续预训练→课程预训练。不点课程预训练的话调配比的沉没成本难以接受。
3. infra。infra水平决定参数量和模型训练程度。infra和数据必须相辅相成，否则强行提高参数量而数据不足会导致模型欠训。

## roofline

设置硬件理论极限和sigmoid边际效益递减曲线，不需要太严谨真实。

## 部署/通信科技

[[infra-and-model-scale|模型规模与训练/推理基础设施]]已有DP/PP/TP/EP/CP-SP，此处补充一些相关的前置技术点：跨卡通信Ⅲ（EP前置），稀疏注意力，DSA

## scale-up附加题：降智

当scale-up所需要的算力卡越来越多，玩家需要的不止是开源，还有节流。在降低激活专家量、路由、稀疏注意力、pd分离等策略下腾出计算卡做更多实验，有的策略会导致旧模型降智。

此设计可以宣传科普为什么 ai 公司会降智以及怎么降智，吸引部分大模型用户。

## 可接入的既有节点

- [[infra-and-model-scale|模型规模与训练/推理基础设施]]已有DP/PP/TP/EP/CP-SP段落，可以承接部署/通信科技。
- [[difficulty-player-assist-rnd-tech-tree|难度分层、玩家辅助与研发科技树随机性]]已有模型规模和基础设施约束段落，可以承接scale-up的理论制约条件。
- [[what-should-consider-to-keep-competitiveness|保持公司竞争力需要考虑的因素]]已有科技树段落，含有本节提到的部分技术。
- [[release-and-product|发布、降智、API 与产品策略]]已有降智策略，结合本节可补充降智的收益。