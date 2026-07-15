# 风紧扯呼官网

Vue 3 下载落地页，主题色与桌面端应用一致（黑 / 金 `#D4AF37`）。

- 仓库：https://github.com/yqxx/chirrup-web
- 站点：https://chirrup.cn/
- 备用：https://yqxx.github.io/chirrup-web/（改用自定义域名后路径可能不可用）

桌面端应用仓库为**私有**，本站不链接源码；安装包托管在
[Gitee Releases](https://gitee.com/yqxx/chirrup-releases/releases)。

## 本地开发

```bash
npm install
npm run dev
```

访问：`http://localhost:5173/`

## 发布安装包

1. 在私有仓库 `chirrup` 中打包
2. 到 [chirrup-releases](https://gitee.com/yqxx/chirrup-releases) 创建发行版，上传：

| 文件 | 命令 |
|------|------|
| `chirrup-x.y.z-windows-portable.exe` | `npm run build:win:portable` |
| `chirrup-x.y.z-macos.dmg` | `npm run build:mac` |

3. 更新 `src/config/downloads.ts` 的 `APP_VERSION`，推送本仓库

Windows 仅提供便携版。

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
