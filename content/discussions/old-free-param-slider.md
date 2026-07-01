---
id: OLD-FREE-PARAM-SLIDER
title: 旧式自由参数量滑条冲突
type: conflict
status: deprecated
source: [U, L]
contributors: [user, "llm:codex"]
created: 2026-07-02
updated: 2026-07-02
tags: [discussions, conflict, systems/ai-training-sim]
depends_on: [INFRA-SCALE-001]
conflicts_with: [INFRA-SCALE-001]
related_endings: []
---

# 旧式自由参数量滑条冲突

> 这是一个保留历史的冲突指针：模型参数量不能作为任意输入的自由滑条。

## 冲突内容

旧设想中，玩家可以近似自由地输入或拉动目标参数规模。该做法会导向 20T dense 这类不符合当前机制约束的路线，也会削弱 [[infra-and-model-scale|模型规模与训练/推理基础设施]] 对显存、互联、并行方式、稳定训练和推理成本的限制。

## 处理结果

该方向已废弃。正式机制采用参数规模档位、基础设施技术约束和训练/推理成本分离，不允许把参数量写成单独的自由滑条。

## 来源

本页只把既有 `conflicts_with` 指针实体化，方便自动校验关系 ID，不新增新的玩法设定。
