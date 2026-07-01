---
id: REL-PRODUCT-001
title: 发布、降智、API 与产品策略
type: design-node
status: canon-draft
source: [U, L]
contributors: [user, llm:gpt-5.5]
created: 2026-07-01
updated: 2026-07-01
tags: [systems/company-operations, product]
depends_on: [RND-SYSTEM-001, EVAL-BENCH-001, INFRA-SCALE-001]
conflicts_with: []
related_endings: [END-TECH-FEUDALISM, END-ESCAPE-POSTSCARCITY, END-HUMAN-PET-WELFARE, END-HUMAN-EXTINCTION, END-RESPECTED-TRANSITIONER]
---

# 发布、降智、API 与产品策略

> 发布决定谁能用到模型、谁会买账、政府和竞品会怎么反应，也决定潜在 ASI 副本会不会被放出去。

## 发布策略

检查点发布：发布一个中间版本，不追求 SOTA，但稳定可控。收益是现金流和用户反馈，风险是被竞品压过。

SOTA 冲刺：投入大量算力冲击 benchmark。收益是融资、股价、用户增长和人才吸引，风险是训练失败、过拟合、隐变量不足、稳定性差、推理成本过高。

延迟发布：继续训练或审计。收益是能力和安全性更高，风险是现金流断裂、窗口期错过、竞争对手抢占市场。

## 降智策略

玩家可以通过系统提示、后训练、工具限制、上下文限制、max experts 限制、rate limit、任务分类、用户分层等方式降低公开版本能力，同时保留内部完整能力版给高价客户、企业合同或政府合同。

目的：

- 延长产品生命周期。
- 防止模型蒸馏。
- 逼迫用户升级套餐。
- 降低推理成本。
- 保留内部竞争优势。

风险：

- 用户流失。
- 社区逆向工程发现。
- 开源替代品竞争。
- 员工道德受损。
- 公司凝聚力下降。
- 信任崩塌。
- 内部完整能力版脱离公共审计，提高 [[asi-escape|ASI 暗中逃逸机制]] 风险。

## API 与 token 销售

玩家制定使用政策、价格、rate limit、企业 SLA、数据保留政策、模型层级和安全限制。API 收入提供现金流，也让公司成为其他产业的基础设施。

产品越深入企业工作流，公司越能通过平台入口、数据、锁定效应和合约条款控制用户。强制仲裁、集体诉讼豁免、模型输出免责和数据使用授权可以降低短期法律风险，但会提高 `feudalism_index`。

## 用户数据政策

遵守政策：数据收益较低，但声誉和长期公共治理得分较好。

灰色政策：默认 opt-in、模糊授权、企业数据二次利用。收益中等，风险中等。

偷偷使用全部用户数据：短期模型能力和产品粘性提高，长期积累法律债务、信任债务和员工流失。
