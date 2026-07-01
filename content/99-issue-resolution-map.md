---
id: META-ISSUE-MAP-001
title: Issue 合并说明
type: meta
status: canon-draft
source: [U, L]
contributors: [NewEnglandSurvivorKing, user, llm:gpt-5.5]
created: 2026-07-01
updated: 2026-07-01
tags: [meta, issues]
---

# Issue 合并说明

本次重写以 5 个 issue 为约束，把三文件仓库改造成 Quartz 内容库。

## #1 去除无机冯诺依曼机相关内容

处理结果：删除原先的远未来“无机冯诺依曼机生态”接口，不再把戴森生态、机器生态、星际机器国家等内容作为本游戏仓库的世界观模块。灭绝线保留“自复制自动化工业吞噬人类物质”的功能性描述，但不展开为独立机器生态设定。

## #2 修正模型参数量与训练/推理基础设施设定

处理结果：新增 [[infra-and-model-scale|模型规模与训练/推理基础设施]]。模型参数量不再是自由滑条，而受 DP、PP、TP、EP、CP/SP、通信拓扑、显存、上下文长度、MoE 专家负载和工程 know-how 约束。20T dense 被明确视为不可行/笑话式错误路线。

## #3 建立跨奇点技术—经济—政治粗粒度模拟模型

处理结果：新增 [[macro-tech-econ-politics|跨奇点技术—经济—政治粗粒度模型]]。它不追求精确预测，而是用阶段标志物、主体预期、信心变量、金融重定价、裁员—回滚、政策反应和市场叙事支持宏观涌现。

## #4 建立群体创作用想法 / 架构树协作规范

处理结果：重写 [[01-collaboration-guide|协作规范]]，并新增 [[node-template|节点模板]]。所有节点必须有来源、贡献者、状态、依赖、冲突、影响结局等字段。

## #5 将仓库 Quartz 化

处理结果：新增 Quartz 内容结构、`quartz.config.yaml`、本地预览脚本、GitHub Pages workflow。仓库不 vendoring Quartz 源码，而是在本地预览和 CI 部署时克隆 Quartz v5 并复制 `content/`。
