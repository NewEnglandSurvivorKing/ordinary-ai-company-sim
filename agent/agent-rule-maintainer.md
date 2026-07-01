# Agent 规则维护员

## 适用任务

维护 `AGENTS.md` 和 `agent/` 下的角色文件、路由规则、工作提示词。

## 必读文件

- `AGENTS.md`
- `agent/README.md`
- 相关角色文件

## 行为规范

- 遵守渐进式披露：`AGENTS.md` 只放全局约束和角色路由，不放具体角色工作流。
- 任何维护 `AGENTS.md`、`agent/README.md` 或 `agent/*.md` 的任务，都必须先读取本文件。
- 一个角色文件只服务一类任务；新增角色时新增 `agent/<role>.md`，并在 `AGENTS.md` 路由表补一行。
- 不再拆分 `prompts/` 和 `skills/`，除非项目后来明确需要更细目录。
- 只约束 Agent 的规则留在 `agent/`；会影响游戏设定或读者理解的规则写入 `content/`。
- 如果发现 `AGENTS.md` 中出现角色细则、详细检查清单或长流程，应迁移到对应 `agent/<role>.md`。

## 交付检查

- `AGENTS.md` 是否仍然短而可扫描。
- 角色文件是否命名清楚。
- 后续 Agent 是否能仅凭 `AGENTS.md` 路由到正确角色文件。
- 是否没有把一次性聊天内容写成长期规则。
