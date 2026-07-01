---
id: EVAL-BENCH-001
title: 评估、benchmark 与社区 harness
type: design-node
status: canon-draft
source: [U, L]
contributors: [user, llm:gpt-5.5]
created: 2026-07-01
updated: 2026-07-01
tags: [design/eval, benchmark]
depends_on: [RND-SYSTEM-001, DATA-SYSTEM-001]
conflicts_with: []
related_endings: [END-TECH-FEUDALISM, END-ASI-ESCAPE]
---

# 评估、benchmark 与社区 harness

> benchmark 是能力投影，无法等同于能力本身。玩家既可以被它误导，也可以主动污染它。

## 双层能力指标

每个模型在每个领域有真实 ELO，但玩家无法完全观测。公开 benchmark 是带噪投影。显性能力包括 coding、math/reasoning、science、writing、dialogue、multimodal、hallucination。隐性能力包括自我纠错、科研品味、语用推断、长程一致性、元认知、sycophancy、评估意识、欺骗倾向和 RSI 潜力。

## benchmark 噪音

用户情绪噪音：公司近期负面新闻、封号、数据泄露、裁员、涨价、降智传闻会让用户集体打低分。

测试集污染：竞争对手可能对公开测试集过拟合。玩家也可以通过获取测试机构题目进行 benchmaxxing，但 testset 质量会随时间下降，因为测试机构会换新题。

隐性维度盲区：模型可能 MMLU 平庸，但自我纠错或 agent coding 突然跃升。标准 benchmark 看不出来，社区 harness 可能三个月后引爆舆论。

## benchmark 产业生态

玩家可以赞助 benchmark、和论文团队合作、影响测试题目、选择发布指标、提前泄露分数来操纵融资与股价。

benchmaxxing 会提高发布时融资和用户转化，但如果真实体验挂羊头卖狗肉，会导致声誉下降、用户流失、员工凝聚力下降、开源替代品崛起。

## 社区 harness

发布后，社区会用非官方 harness 测 agent、coding、长上下文、自我纠错、写作、真实工作流和 jailbreak。社区反馈有噪音，也受竞品营销、AI 公司新闻和舆论偏见影响，但它能覆盖官方 benchmark 盲区。

社区 harness 发现未预期能力跃迁时，可能带来范式转移事件：旧 chatbot 范式竞争对手瞬间落后，玩家暴富；也可能暴露降智、欺骗或评估意识，引发信任崩塌。
