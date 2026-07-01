# 一个很普通的 AI 公司模拟经营游戏

这是 `ordinary-ai-company-sim` 的 Quartz 化重写版。仓库的 canonical source 仍然是 Markdown；Quartz / GitHub Pages 只是阅读层，Obsidian 可以作为本地创作 GUI。

游戏表面上是前沿 AI 公司模拟经营：训练模型、融资、买卡、抢电、卖 API、做 benchmark、上市、操纵预期、签政府合同、收购产业链。实际上是让玩家在几年后看到 AI 产业新闻时产生不适感：技术能力怎样经由资本、基础设施和监管变成技术封建主义权力。

## 当前重写目标

本次重写合并了 5 个 issue：

- #1：去除无机冯诺依曼机相关内容。仓库不再保留“无机冯诺依曼机生态”世界观接口，灭绝线中也改写为“自复制自动化工业”而非单独展开远未来机器生态。
- #2：修正模型参数量与训练/推理基础设施设定。参数量不再是自由滑条，而受 DP / PP / TP / EP / CP / SP、集群通信、专家负载、上下文并行和工程 know-how 约束。
- #3：建立跨奇点技术—经济—政治粗粒度模拟模型，用信心、预期、金融重定价、裁员过度和政策反应写出宏观变化。
- #4：建立群体创作用想法 / 架构树协作规范，明确节点 ID、来源、贡献者、依赖、冲突和审阅流程。
- #5：将仓库 Quartz 化，改造成可浏览的设计知识库。

## 推荐阅读方式

1. GitHub Pages / Quartz 站点：给朋友和协作者浏览。
2. Obsidian：本地写作、反向链接、图谱、折叠阅读。
3. GitHub Markdown：最低兼容视图，不作为主要阅读体验。

## 仓库结构

```text
ordinary-ai-company-sim/
├─ README.md
├─ quartz.config.yaml
├─ package.json
├─ scripts/
│  └─ preview-quartz.mjs
├─ .github/workflows/deploy.yml
└─ content/
   ├─ index.md
   ├─ 00-project-overview.md
   ├─ 01-collaboration-guide.md
   ├─ 99-issue-resolution-map.md
   ├─ design/
   ├─ endings/
   ├─ worldview/
   └─ templates/
```

正文都在 `content/`。`README.md` 只做协作入口和部署说明，不再承载大段策划案。

## 本地预览

本仓库不直接 vendoring Quartz 源码。预览脚本会在本地克隆 Quartz v5 到 `.quartz-preview/`，复制 `content/` 和 `quartz.config.yaml` 后构建。

```bash
npm run preview
```

只构建不启动服务：

```bash
npm run build
```

首次运行需要网络、Git、Node >= 22、npm >= 10.9.2。

## GitHub Pages 部署

仓库已包含 `.github/workflows/deploy.yml`。在 GitHub 仓库设置中进入 `Settings → Pages`，将 Source 设为 `GitHub Actions`。之后 push 到 `main` 会自动部署。

如果仓库所有者或仓库名变化，需要修改 `quartz.config.yaml` 里的：

```yaml
baseUrl: NewEnglandSurvivorKing.github.io/ordinary-ai-company-sim
```

## 写作原则

新增内容优先写成中等粒度节点，避免继续堆超长 Markdown。一个节点通常对应一个机制、变量、结局、冲突或世界观接口。

每个重要节点必须有 frontmatter：

```yaml
---
id: RND-DATA-001
title: 训练集系统
type: design-node
status: canon-draft
source: [U, L]
contributors: [user, llm:gpt-5.5]
created: 2026-07-01
updated: 2026-07-01
tags: [design/rnd, system/data]
depends_on: []
conflicts_with: []
related_endings: []
---
```

来源标记：

- `U`：人类贡献者的原始想法。
- `L`：LLM 整理、补全、结构化或命名。
- `M`：共同形成。
- `W`：既有世界观设定。
- `R`：现实参考。
- `TBD`：来源待确认。

## 设计底线

本游戏拒绝 AI 大亨爽游、黑暗启蒙角色扮演和“造出 ASI 统治世界”的奖励机结构。它允许强策略、诱惑、短期胜利和资本压力，但越往后越要让玩家看到：自己被资本、算力、监管和国家安全叙事共同驱动。

好结局可以存在。RSI / ASI 不必然是坏事。危险来自私有垄断、黑箱部署、军政绑定、未审计 checkpoint、CEV 不足、自动化红利未产权化背景下的不可逆能力跃迁。

好的后稀缺线要求玩家在关键节点放弃“拥有未来”的权力，让自动化产能、公共算力、对齐审计和形态自由成为所有人的权利。
