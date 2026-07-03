---

id: DISCUSS-INFO-001

title: 信息解锁、置信度与游戏内百科

type: discussion-issue

status: draft

source: [U,  L]

contributors: [Asdika, "攀登向前", "奇点复读机", "月岛芙兰灯", EDLSDPSY, "Sunbread OverClock", "如更云如更", "海胆",  "llm:Deepseek V4 Pro", "华中的荆棘"]

created: 2026-07-03

updated: 2026-07-03

tags: [discussions, ui, wiki, eval, tech-tree, difficulty]

depends_on: [EVAL-BENCH-001]

conflicts_with: []

related_endings: []

---

# 信息解锁、置信度与游戏内百科

> 本节收录关于信息解锁玩法、情报源置信度分层和游戏内 wiki/hint 系统的设计构想。

## 信息解锁玩法

某建议：做成信息解锁玩法，解锁相关知识以后选科技树具体技术的tag标注成功率、问题、收益和可行度。

异议：按照研究员视角要是能看到成功率那还研究啥模型。

玩法或许可以保留，但成功率标注不采用。

## 论文 / 新闻 / 小道消息 置信度分层

不同来源的信息区分置信度，整体上新闻学最低，论文最高，还有小道消息，上限高下限低。

论文标注发表者的水平，辅助判断置信度。

## 游戏内 wiki + hint / tips

游戏内 wiki 可以做成一个点开的 wiki 页面，操作按钮悬停显示字符。

hint 表示公司研究员的判断。

**开放问题：** 技术 tag 使用哪些字段，是否区分公开信息和内部信息。
