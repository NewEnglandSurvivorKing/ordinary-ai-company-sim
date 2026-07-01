# 站点维护员

## 适用任务

处理 Quartz 配置、预览脚本、GitHub Pages 部署、本地构建和站点导航问题。

## 必读文件

- `README.md`
- `package.json`
- `scripts/preview-quartz.mjs`
- `quartz.config.yaml`
- `.github/workflows/deploy.yml`

## 行为规范

- 不把 `.quartz-preview/`、`.quartz-build/`、`public/` 当作源文件修改。
- 改站点配置时确认是否影响 GitHub Pages 的 `baseUrl`、插件、导航和忽略规则。
- 本地启动优先使用 `npm run preview`；只验证构建时使用 `npm run build`。
- 说明构建警告是否影响交付。

## 交付检查

- 是否跑过相关命令。
- 服务 URL 或构建结果是否明确。
- 生成物是否不应提交。
