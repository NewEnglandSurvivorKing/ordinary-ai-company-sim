# 一个很普通的 AI 公司模拟经营游戏

这是 `ordinary-ai-company-sim` 的 Quartz 化重写版。仓库的 canonical source 仍然是 Markdown；Quartz / GitHub Pages 只是阅读层，Obsidian 可以作为本地创作 GUI。

游戏表面上是前沿 AI 公司模拟经营：训练模型、融资、买卡、抢电、卖 API、做 benchmark、上市、操纵预期、签政府合同、收购产业链。实际上是让玩家在几年后看到 AI 产业新闻时产生不适感：技术能力怎样经由资本、基础设施和监管变成技术封建主义权力。

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
   ├─ systems/
   │  ├─ ai-training-sim/
   │  ├─ macro-econ-politics/
   │  └─ company-operations/
   ├─ narrative/
   │  ├─ endings/
   │  └─ setting/
   ├─ discussions/
   ├─ graphs/
   └─ templates/
```

正文都在 `content/`。`README.md` 只做协作入口、稳定目录和部署说明，不记录阶段性改动；已处理 issue 见 `content/99-issue-resolution-map.md`。

`systems/` 收玩家操作、资源、变量和系统反馈。`narrative/` 收剧情呈现、ASI 叙事、结局系统和世界设定背景。`discussions/` 收 issue、聊天记录和还没有提炼成正式节点的材料。`graphs/` 收可复用交互关系图的数据文件。

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

新增内容优先写成中等粒度节点，避免继续堆超长 Markdown。一个节点通常对应一个机制、变量、结局、冲突或剧情/世界设定接口。未提炼的聊天和 issue 先进入 `discussions/`，稳定后再迁入 `systems/` 或 `narrative/`。

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
tags: [systems/ai-training-sim, system/data]
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
