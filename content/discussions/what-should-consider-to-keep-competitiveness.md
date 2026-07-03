---

id: DISCUSS-DIFFICULTY-RND-002

title:保持公司竞争力需要考虑的因素

type: discussion-issue

status: draft

source: [U, L]

contributors: ["奇点复读机", Asdika, EDLSDPSY, "某种有机智能", "Sunbread OverClock", "如更云如更", "海胆", "月岛芙兰灯", "llm:Deepseek V4 Pro", "华中的荆棘"]

created: 2026-07-02

updated: 2026-07-03

tags: [discussions, systems/ai-training-sim, difficulty, tech-tree, economy]

depends_on: [RND-SYSTEM-001, DISCUSS-DIFFICULTY-RND-001]

conflicts_with: []

related_endings: []

---

# 保持公司竞争力需要考虑的因素

> 本节收录关于如何设计玩家在主线中需要考虑的经营条件，包括模型训练、科技树、水论文、人力流动、开局年份等内容。

## 训练稳定性

玩家投入时间、钱、内部数据和算力训练模型，内部交付物是checkpoint。loss curve可象征性存在，如loss spike提示训爆，会在玩家使用moe架构时不仔细调优导致专家训炸和silent data corruption两种情况下触发。训爆情况发生时默认回退。

配方实验部分：分两条路，其一是爬ladder，从小参数量开始试验是否能跑通；其二是在原始规模训练前多少token找到差不多的配比。

## 科技树和随机性

科技树起码得决定可见指标（模型各方面性能、参数量、架构），公司内部有自己的bench可查看。

模型性能提升：opd （蒸馏线）、RLVR I/II/III 三级初期只强化推理能力，后面需基于infra进步允许agentic RL 、loop transformer工程难部署但说不定有巨大优势（暂时归到A门）、接入公开API和simulator、全脑模拟（陷阱选项）、类脑计算（陷阱选项）、课程预训练、合成数据、跨卡通信、投机采样

能源：可控核聚变（陷阱选项）、光伏、太空电站、火电、永动机（陷阱选项）

建议科技树带有一定随机性，每局都要重新试错，以体现llm研发的本质是抽卡。科技树的设计应当隐式引导玩家理解当前frontier的路线选择。

## A门水论文

部分技术属于编故事水论文，不指导模型迭代（如latent cot、loop transformer），不确定可以先写到科技树，到时日面包会筛掉。

## 人力流动

可以参考群星，显示公司人才流动。人才流动受是否上市、融资影响，人才资源充足可以提供科技加成、科技突破。可加入岗位条件，并受技术栈匹配程度影响，技术栈不匹配也会导致人才流失。

demo暂时用玩具模型占位，如作为科技树点亮条件。后期可加入资金-人才兑换模块。

## 开局年份

允许选择开局年份（2018-2025）2023年百模大战作为推荐的开局，2023年后入局需要选择扮演已有的公司或走cursor路线。2020年入局可以选择起步在日本。

demo开局先做2023年百模大战。

## 可接入的既有节点

- [[rnd-system|AI 研发系统]] 已有风险、训练操作、技术树和初始资源段落，可以承接每局随机、试错、训练稳定性和开局年份。
- [[difficulty-player-assist-rnd-tech-tree|难度分层、玩家辅助与研发科技树随机性]]已有研发系统保留试错和科技树节点来源，可以承接训练稳定性、科技树和随机性。