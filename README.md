# 风紧扯呼官网

Vue 3 下载落地页，主题色与桌面端应用一致（黑 / 金 `#D4AF37`），部署于 GitHub Pages。

- 仓库：https://github.com/yqxx/chirrup-web
- 站点：https://yqxx.github.io/chirrup-web/

桌面端应用仓库为**私有**，本站不链接源码；安装包由本站 `public/downloads/` 直接托管。

## 本地开发

```bash
npm install
npm run dev
```

访问：`http://localhost:5173/chirrup-web/`

## 发布安装包

1. 在私有仓库 `chirrup` 中打包
2. 将产物复制到 `public/downloads/`，文件名与 `src/config/downloads.ts` 一致：

| 文件 | 命令 |
|------|------|
| `chirrup-1.0.0-windows-portable.exe` | `npm run build:win:portable` |
| `chirrup-1.0.0-macos.dmg` | `npm run build:mac` |

Windows 仅提供便携版。

3. 发新版时同步更新 `APP_VERSION` 与文件名，再推送本仓库

## GitHub Pages

推送到 `main` 后，GitHub Actions 会构建并发布到 `gh-pages` 分支。

首次部署后，到仓库 Settings → Pages：

1. Source 选 **Deploy from a branch**
2. Branch 选 **gh-pages** / **/ (root)**
3. Save

站点：https://yqxx.github.io/chirrup-web/

## 设计说明

- 字体：Plus Jakarta Sans
- 主色 `#171717` · CTA `#D4AF37`
- 结构：Hero（切屏动画）→ 功能 → 三步上手 → 下载 → 使用指南 → Footer
