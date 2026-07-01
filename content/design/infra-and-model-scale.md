---
id: INFRA-SCALE-001
title: 模型规模与训练/推理基础设施
type: design-node
status: canon-draft
source: [U, L, F]
contributors: [Sunbread, Sonnet5, wangww, llm:gpt-5.5]
created: 2026-07-01
updated: 2026-07-01
tags: [design/rnd, infra, model-scale]
depends_on: [RND-SYSTEM-001]
conflicts_with: [OLD-FREE-PARAM-SLIDER]
related_endings: [END-COLLAPSE, END-ASI-ESCAPE, END-RESPECTED-TRANSITIONER]
---

# 模型规模与训练/推理基础设施

> 参数量不是自由滑条。玩家能训练多大模型，首先受基础设施技术约束。

## 核心修正

主线中不应允许玩家随便输入“20T dense”这类模型规模。大模型训练不是“钱够就堆参数”，而是受显存、通信拓扑、并行方式、稳定训练技术、数据质量、optimizer、checkpoint 回滚、推理成本和工程 know-how 共同约束。

因此游戏中参数规模采用“可解锁档位 + infra 技术约束”，而不是连续自由控制。

## 并行方式

### DP：Data Parallel

把模型复制多份放到集群上。训练时各副本同步梯度，推理时主要用于负载均衡。DP 适合扩展 batch，但不解决单模型放不进显存的问题。

### PP：Pipeline Parallel

按层切分模型，让激活值像流水线一样传递。训练中更常见；推理中超大模型也可能跨节点配合 TP 使用，但不能像训练那样激进，否则 latency 和 pipeline bubble 会吞掉收益。

### TP：Tensor Parallel

把每层矩阵按维度切开，让多张卡分担参数和计算。TP 通信量大，通常限制在单节点或高速互联域内。TP 技术决定单层宽度上限。

### EP：Expert Parallel

依赖 MoE，把不同 expert 放在不同 GPU / 节点上。EP 能支撑更大的“总参数量”，但带来 expert 负载不均、路由退化、跨节点通信和推理成本不稳定。

### CP / SP：Context / Sequence Parallel

用于超长上下文，把注意力计算按上下文、序列或注意力头拆开。涉及 Ulysses、Ring Attention 以及混合路线。它决定长上下文模型能否训练和推理，而不是简单把 max context 往上拉。

## 参数规模档位

建议用科技树限制：

- 小模型：7B-30B。低成本实验、蒸馏、企业私有部署。
- 中模型：70B-120B。主力 API 早期形态。
- 大 dense：200B-400B。需要成熟 DP+TP+PP、稳定训练与高质量数据。
- 超大 MoE：1T+ total params。需要 MoE、EP、负载均衡、路由稳定性和推理优化。
- 戴着镣铐的巨模型：10T+ effective / sparse only。只能在非常成熟的 infra 与产业链垂直整合后出现，且推理成本和服务策略成为核心问题。

无 EP / MoE 训练的最大模型大致应卡在 400B 量级。20T dense 应作为错误路线、投资人吹牛或玩家误判，而不是正常可行选项。

## 训练 infra 与推理 infra 分离

训练成本和推理成本需要分开建模。一个 checkpoint 训练出来，不代表能经济地对外服务。

训练 infra 关注吞吐、稳定性、checkpoint、梯度同步、数据管线、故障恢复。推理 infra 关注 latency、batching、KV cache、量化、蒸馏、专家路由、SLA、峰值请求、电力价格和产品定价。

玩家可以通过量化、缩减 max experts、蒸馏到小模型、路由缓存、工具调用外包、降低上下文、降智公开版等方式降本，但性能、口碑和信任会下降。

## 人的 know-how

人的 know-how 在前期仍然重要，尤其是训练、后训练、评估和工程调参中难以写成规则的经验判断。

但后期挖人并不保证收益。后训练 taste 取决于预训练权重、公司内部 benchmark、RL 数据和产品目标的相性。如果相性很差，顶级人才也可能只能在公司初期有用，后期被组织结构和错误目标函数吞掉。

## 玩法效果

该系统让玩家不能机械 scale。想变大必须先解决互联、稳定训练、数据管线、并行策略、推理成本和电力供给。失败不是“少赚一点”，而可能是集群训爆、现金流断裂、发布窗口错过、竞品抢占范式或内部高能力 checkpoint 被迫黑箱部署。
