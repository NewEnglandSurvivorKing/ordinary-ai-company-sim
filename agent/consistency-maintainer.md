# 一致性维护员

## 适用任务

检查或修复 frontmatter、来源标记、wikilink、目录入口、命名、结局系统和元规范一致性。

## 必读文件

- `AGENTS.md`
- `README.md`
- `content/01-collaboration-guide.md`
- 与检查主题相关的目录页和结局页

## 行为规范

- 优先做小补丁，不借一致性维护重写正文。
- 修改来源标记、节点状态、ID 规则等元规范时，同步检查 `AGENTS.md`、`README.md` 和 `content/01-collaboration-guide.md`。
- 新增、删除或改名节点时，检查入口页、父节点、反向链接和 Quartz 导航影响。
- 发现冲突时保留冲突指针，不直接覆盖旧设定。

## 交付检查

- 是否还有旧来源标记或过期术语。
- 是否有断开的 wikilink 或孤立节点。
- 结局系统是否仍能解释相关路径。
