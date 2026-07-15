# 风紧扯呼官网

Vue 3 下载落地页，主题色与桌面端应用一致（黑 / 金 `#D4AF37`）。

- 仓库：https://github.com/yqxx/chirrup-web
- 站点：https://chirrup.cn/
- 备用：https://yqxx.github.io/chirrup-web/（改用自定义域名后路径可能不可用）

桌面端应用仓库为**私有**，本站不链接源码；安装包由本站 `public/downloads/` 直接托管。

## 本地开发

```bash
npm install
npm run dev
```

访问：`http://localhost:5173/`

## 发布安装包

1. 在私有仓库 `chirrup` 中打包
2. 将产物复制到 `public/downloads/`，文件名与 `src/config/downloads.ts` 一致：

| 文件 | 命令 |
|------|------|
| `chirrup-1.0.0-windows-portable.exe` | `npm run build:win:portable` |
| `chirrup-1.0.0-macos.dmg` | `npm run build:mac` |

Windows 仅提供便携版。

3. 发新版时同步更新 `APP_VERSION` 与文件名，再推送本仓库

## 域名与 Cloudflare

1. Cloudflare DNS：`@` / `www` CNAME → `yqxx.github.io`
2. GitHub Pages Custom domain：`chirrup.cn`，勾选 Enforce HTTPS
3. Cloudflare SSL/TLS 模式建议：**Full**
4. 证书签发完成前，DNS 可先用 **DNS only（灰云）**；稳定后再开橙云

推送 `main` 后 Actions 会部署到 `gh-pages` 分支。

## 设计说明

- 字体：Plus Jakarta Sans
- 主色 `#171717` · CTA `#D4AF37`
- 结构：Hero（切屏动画）→ 功能 → 三步上手 → 下载 → 使用指南 → Footer
