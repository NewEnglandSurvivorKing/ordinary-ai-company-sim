---

id: DISCUSS-TIME-001

title: 时间系统与结算

type: discussion-issue

status: draft

source: [U, L]

contributors: [Asdika, "某种有机智能", "0xab16a9be", "海星剑辰", "Sunbread OverClock", "如更云如更", "海胆",  "llm:Deepseek V4 Pro", "华中的荆棘"]

created: 2026-07-03

updated: 2026-07-03

tags: [discussions, time, ux, core]

depends_on: []

conflicts_with: []

related_endings: []

---

# 时间系统与结算

> 本节收录关于游戏时间推进方式、结算节点和待办系统的设计构想。

## 时间系统：连续日历 + 关键节点集中结算

底层用连续日历和任务耗时，UI 上有待办栏，但叙事反馈最好按关键节点/季度/训练阶段集中结算，不要完全碎片化成信息流。

参考群星结算点，回合由事件截出，可以视为一种弹性回合制。

可以有季度总结、财报，让玩家知道阶段性做了什么。

**玩法变量：** `continuous_clock`, `settlement_nodes`（财报季/发布季/训练阶段）, `elastic_turn`

**玩家选择：** 何时推进时间；在结算点复盘。

**系统反馈：** 集中结算给"剧情反馈感"，避免流式时间打断注意力。

## 待办栏 / 邮箱 / 闹钟日历 + 可暂停即时制

设计一个待办事件和反馈信息栏，标识已处理和未处理。以及可以考虑给邮件附带闹钟/日历系统，玩家可以把邮件附的时间设为闹钟，到时间点自动暂停。即时制有自动暂停也有时间调速滑条，是回合制的上位替代。

**玩法变量：** `todo_inbox`, `alarm_calendar`, `speed_multipliers`, `auto_pause_on_event`

**玩家选择：** 设闹钟/调倍速/处理待办。

**系统反馈：** 出事自动暂停；信息寿命管理。
