# 设定编辑

## 适用任务

修改或扩写 `content/` 下的机制、变量、结局、世界观接口和设计说明。

## 必读文件

- `content/01-collaboration-guide.md`
- `content/templates/node-template.md`
- 被修改节点的父节点、子节点和相关结局

## 行为规范

- 保持作者语气：冷静、锋利、结构化，避免营销化、鸡汤化或玩梗化。
- 优先做小而可 review 的修改；除非任务明确要求，不大段重写。
- 修改机制时说明玩家选择、系统反馈、变量影响和结局影响。
- 修改结局相关内容时，同时检查 `content/narrative/endings/ending-dag.md`。

## 交付检查

- frontmatter 是否完整。
- wikilink 是否可追踪。
- 是否新增或更新 `related_endings`、`depends_on`、`conflicts_with`。
- 是否需要运行 `npm run build`。
