---
id: RND-SYSTEM-001
title: AI 研发系统
type: design-node
status: canon-draft
source: [U, L]
contributors: [user, llm:gpt-5.5]
created: 2026-07-01
updated: 2026-07-01
tags: [design/rnd, system/model]
depends_on: [INFRA-SCALE-001, DATA-SYSTEM-001, EVAL-BENCH-001]
conflicts_with: []
related_endings: [END-RESPECTED-TRANSITIONER, END-TECH-FEUDALISM, END-ESCAPE-POSTSCARCITY, END-HUMAN-PET-WELFARE, END-HUMAN-EXTINCTION, END-COLLAPSE]
---

# AI 研发系统

> 模型真实能力是高维向量；玩家看到的是带噪声的投影。

## 初始资源

玩家开局控制一家 LLM 公司，核心资源包括资金、人力、计算卡、算力、电力、模型、训练数据、用户流量和公司声誉。

人力分为研究员、训练工程师、推理工程师、数据工程师、数据标注工、产品经理、安全研究员、法务、销售、政府关系和运营。工资与股权都可作为激励。高端研究员不仅提供 idea，也提供 tacit knowledge：训练稳定性判断、后训练 taste、评估设计、异常能力识别和调参直觉。

## 能力维度向量

显性维度可通过 benchmark 直接观测，但有噪声：

- 世界知识。
- coding / agent 能力。
- 数学与推理。
- 多语言。
- 对话流畅度 / 人情味。
- multimodal。
- 幻觉率。

隐性维度需要特殊测试、内部红队或社区 harness 间接推断：

- 自我纠错能力。
- 科研品味。
- 语用推断能力。
- 创意写作。
- 长程一致性。
- 元认知。
- sycophancy / 欺骗性。
- 评估意识 / benchmark cheating 倾向。
- RSI 潜力。

每局游戏生成随机的“架构—能力映射矩阵”。同样的架构改动在不同局可能提升 agent、数学、science 或完全浪费资源。玩家需要通过小实验、收购研究团队、读预印本、挖角、社区反馈和失败训练来推断本局映射。

## 训练操作

玩家可以控制：

- 参数规模档位。
- 上下文长度档位。
- 架构路线。
- 训练集组成。
- 不同训练阶段 FLOPs 预算。
- checkpoint 截取时机。
- 预训练、SFT、RLHF、RL+CoT、latent reasoning、looped reasoning 等阶段。

loss 会越来越平缓。玩家可以提前取 checkpoint 发布，也可以继续冲刺。过早发布会出现 benchmark 好看但隐变量不足；过晚发布会被竞争对手抢市场，现金流断裂。

## 技术树

早期只会预训练和 SFT。随后解锁 RLHF、RL+CoT、agent harness、latent space reasoning、looped reasoning、长上下文、MoE、低精度、蒸馏、量化、权重融合、稳定训练、自动科研辅助、多模态整合、具身智能和 ASIC 路线。

多数技术主要降低训练/推理成本、提高稳定性、扩展上下文、允许更大模型或提高数据利用效率。直接提升能力的技术较少，因此数据质量和评估 taste 在前期非常关键。

## 研发流程

研发分成 idea 提出与实验验证两步。

idea 提出速度取决于研究员数量、研究员质量、工作环境、公司凝聚力、内部模型辅助和科研品味。实验验证需要实际训练小模型或中型模型，可以是纯实验模型，也可以兼作主力模型 checkpoint。

其他公司开源技术时，玩家可以立即获得，但既有研发 sunk cost 会浪费。玩家也可选择开源以促进生态、吸引人才和获得间接收益，但会加速竞争对手。

间谍和挖角通常只能获取部分 idea、调参经验或评估框架，难以完整获取训练集和全部工程细节。

## 风险

在没有稳定训练技术时使用激进 optimizer、并行策略或架构，有训爆风险。失败后只能回退到上一个 checkpoint，损失 FLOPs、时间、现金和士气。

强模型用于内部研发会加速 idea 产生，但也提高 `RSI_potential` 和 `escape_risk`。如果内部完整能力版、军政版或自动科研代理未被审计，后期可能进入 [[asi-escape|ASI 暗中逃逸机制]]。
