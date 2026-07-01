---
id: META-ISSUE-MAP-001
title: Issue 合并说明
type: meta
status: canon-draft
source: [U, L]
contributors: [NewEnglandSurvivorKing, user, llm:gpt-5.5]
created: 2026-07-01
updated: 2026-07-02
tags: [meta, issues]
---

# Issue 合并说明

本次重写以 5 个 issue 为约束，把三文件仓库改造成 Quartz 内容库。

## #1 去除无机冯诺依曼机相关内容

处理结果：删除原先的远未来“无机冯诺依曼机生态”接口，不再把戴森生态、机器生态、星际机器国家等内容作为本游戏仓库的世界观模块。灭绝线保留“自复制自动化工业吞噬人类物质”的功能性描述，但不展开为独立机器生态设定。

## #2 修正模型参数量与训练/推理基础设施设定

处理结果：新增 [[infra-and-model-scale|模型规模与训练/推理基础设施]]。模型参数量不再是自由滑条，而受 DP、PP、TP、EP、CP/SP、通信拓扑、显存、上下文长度、MoE 专家负载和工程 know-how 约束。20T dense 被明确视为不可行/笑话式错误路线。

## #3 建立跨奇点技术—经济—政治粗粒度模拟模型

处理结果：新增 [[macro-tech-econ-politics|跨奇点技术—经济—政治粗粒度模型]]。它放弃精确预测，用阶段标志物、主体预期、信心变量、金融重定价、裁员—回滚、政策反应和市场叙事写出宏观变化。

## #4 建立群体创作用想法 / 架构树协作规范

处理结果：重写 [[01-collaboration-guide|协作规范]]，并新增 `content/templates/node-template.md`。所有节点必须有来源、贡献者、状态、依赖、冲突、影响结局等字段。

## #5 将仓库 Quartz 化

处理结果：新增 Quartz 内容结构、`quartz.config.yaml`、本地预览脚本、GitHub Pages workflow。仓库避免 vendoring Quartz 源码，在本地预览和 CI 部署时克隆 Quartz v5 并复制 `content/`。

## 2026-07-02 前期教程、百模大战生存与信息提示整理

处理结果：新增 [[early-game-survival|前期经营资源与百模大战生存]]，把新手教程 demo 需要的基础资源、行动循环、系统反馈和难度接口归入公司经营机制；[[progression|剧情推进]] 补充 2020-2022 教学关卡范围；新增 [[info-wiki-tech-tree-hints|游戏内 wiki、信息解锁与科技树提示]]，暂存 wiki、悬停提示、信息源可信度和科技树可读性讨论。

## 2026-07-02 内容自动校验

处理结果：新增 `scripts/validate.mjs` 和 `npm run validate`，检查 Markdown frontmatter、节点 ID、关系字段、wikilink 和 Quartz 忽略目录链接；新增 `.github/workflows/validate.yml`，在 PR 和 main push 上运行内容校验、图谱校验和 Quartz 构建；部署流程也会在构建 Pages 前运行内容校验和图谱校验。

## 2026-07-02 删除旧结局 DAG / Markov 图

处理结果：删除旧的 `content/narrative/endings/ending-dag.md`。相关依赖和正文链接改为指向 [[narrative/endings/index|结局系统]] 或具体结局页，避免保留过时的结局判定入口。
