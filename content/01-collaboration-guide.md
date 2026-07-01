---
id: COLLAB-GUIDE-001
title: 协作规范
type: guide
status: canon-draft
source: [U, L]
contributors: [user, llm:gpt-5.5]
created: 2026-07-01
updated: 2026-07-01
tags: [collaboration, guide]
---

# 协作规范

> 本仓库不是聊天记录堆积处，而是可维护的群体创作知识库。所有人都可以塞 idea，但必须留下来源、关系和冲突指针。

## 基本原则

Markdown 是唯一可信源。Quartz、Obsidian、Canvas、Mermaid 都是阅读视图，不是唯一真相。

新增内容优先写成节点。节点可以是机制、变量、结局、冲突、角色、叙事碎片或世界观接口。节点不要求一开始完整，但必须能被定位、引用、审阅和废弃。

不要让复杂关系只存在于脑子里。写清楚 `depends_on`、`conflicts_with`、`related_endings`、`replaces`。

## 来源标记

- `U`：人类贡献者的原始想法。
- `L`：LLM 整理、结构化、扩展、命名或补丁。
- `M`：人类与 LLM 或多人共同形成。
- `W`：既有世界观设定。
- `R`：现实参考。
- `TBD`：来源待确认。

LLM 可以是协作者，但不能作为不署名的幽灵作者。如果 LLM 只是整理人类贡献者的想法，写 `source: [U, L]`。

## 节点状态

- `seed`：一句话想法，尚未接入结构。
- `draft`：草稿，有正文但未审阅。
- `canon-draft`：暂定正史，可继续修改。
- `canon`：稳定设定，大改需要 PR 审阅。
- `conflict`：存在未解决冲突。
- `deprecated`：废弃但保留历史。
- `rejected`：明确否决并保留原因。

## 节点 ID

常用前缀：

- `CORE`：核心设计哲学。
- `COLLAB`：协作规范。
- `RND`：研发系统。
- `INFRA`：训练/推理基础设施。
- `DATA`：数据系统。
- `EVAL`：评估与 benchmark。
- `REL`：发布与产品。
- `ECON`：经济与产业链。
- `MACRO`：宏观模型。
- `POL`：监管与政商。
- `RSI`：递归自我改进。
- `ASI`：ASI 逃逸与行为。
- `END`：结局。
- `WORLD`：世界观接口。
- `CONFLICT`：冲突指针。

## 页面模板

见 [[node-template|节点模板]]。

## 写作粒度

一个页面最好控制在 500-2500 字。超过 3000 字，考虑拆分。低于 200 字，先挂在父节点里，不要过早碎片化。

Mermaid 只画高层图，不承载所有内容。一张图最好 10-30 个节点。复杂内容靠 wikilink、frontmatter 和正文关系维护。

## PR 检查

每次 PR 至少检查：

- 是否标注来源、贡献者和更新时间。
- 是否说明依赖、冲突、影响结局。
- 是否引入了与 [[ending-dag|结局 DAG]] 相冲突的新路径。
- 是否浪漫化技术封建主义或 ASI 逃逸。
- 是否让玩家过早明确知道 ASI 逃逸。
- 是否把后稀缺写成单纯“机仆养人”，而忽略产权、形态自由和政治参与。
- 是否重新引入已移除的无机冯诺依曼机远未来生态模块。

## 冲突处理

不要直接覆盖旧节点。发现冲突时：

1. 在新节点 frontmatter 中写 `conflicts_with`。
2. 在正文中解释冲突机制。
3. 如果影响结局，更新相关结局页面。
4. 不能解决时，新建 `CONFLICT-*` 节点。
5. 废弃旧节点时改成 `deprecated`，不要直接删。
