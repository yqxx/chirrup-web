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

## 发新版（完整流程）

### 1. 打包并上传到 Gitee

在私有仓库 `chirrup` 中打包，到 [chirrup-releases](https://gitee.com/yqxx/chirrup-releases) 创建发行版 `vX.Y.Z`，上传：

| 文件 | 命令 |
|------|------|
| `chirrup-x.y.z-windows-portable.exe` | `npm run build:win:portable` |
| `chirrup-x.y.z-macos.dmg` | `npm run build:mac` |

Windows 仅提供便携版。

### 2. 同步版本号（两处必须一致）

| 文件 | 作用 |
|------|------|
| `src/config/downloads.ts` → `APP_VERSION` | 官网页面显示的 `vX.Y.Z` |
| `workers/download-counter/wrangler.toml` → `APP_VERSION` | Worker 跳转 Gitee 时拼的安装包版本 |

只改官网、不 deploy Worker → 页面显示新版本，但 `/dl/*` 仍会跳到旧包。

### 3. 部署 Worker（下载跳转 + 计数）

```bash
cd workers/download-counter
npm install
npm run deploy
```

### 4. 部署官网

```bash
cd ../..   # 回到仓库根目录
git add src/config/downloads.ts workers/download-counter/wrangler.toml
git commit -m "chore: bump to vX.Y.Z"
git push origin main
```

推送 `main` 后 GitHub Actions 自动部署到 `gh-pages`。

### 5. 验证

```text
https://chirrup.cn/                          # 版本号已更新
https://chirrup.cn/dl/windows                # 302 到 Gitee 对应 exe
https://chirrup.cn/dl/macos                  # 302 到 Gitee 对应 dmg
https://chirrup.cn/dl/stats?token=STATS_TOKEN  # JSON 下载计数
```

---

## 下载计数 Worker（首次配置）

官网下载按钮走 `https://chirrup.cn/dl/windows|macos`，Cloudflare Worker 计数后 302 到 Gitee。

详细说明见 [`workers/download-counter/README.md`](workers/download-counter/README.md)。

### 一次性部署

```bash
cd workers/download-counter
npm install
npx wrangler login
npx wrangler kv namespace create DOWNLOADS
```

把输出的 KV `id` 填入 `wrangler.toml` 的 `id = "..."`。

```bash
npx wrangler secret put STATS_TOKEN   # 设置查看统计的密码
npm run deploy
```

### 绑定路由（Cloudflare Dashboard）

Workers → **chirrup-download-counter** → **Domains** → **Add route**：

- 选域名 `chirrup.cn`
- Route pattern 填 **`chirrup.cn/dl/*`**（不要用默认的 `*.chirrup.cn/*`，否则会拦截整站）

DNS 需为**橙云代理**，路由才会生效。

### 查看下载量

```text
https://chirrup.cn/dl/stats?token=你的STATS_TOKEN
```

返回示例：

```json
{
  "version": "1.0.4",
  "windows": 12,
  "macos": 3,
  "total": 15
}
```

统计的是「点了官网下载并跳转」的次数；Gitee 不提供安装包下载计数。

---

## 访问量（Cloudflare Web Analytics）

域名已在 Cloudflare 且为橙云代理时，**Automatic setup** 会自动统计，无需额外脚本。

查看：Cloudflare Dashboard → **Analytics & Logs** → **Web Analytics** → `chirrup.cn`

| 指标 | 含义 |
|------|------|
| Visits | 访问次数（同一人多次访问会累计，非去重 UV） |
| Page views | 页面打开总次数 |

若同时存在 **JS Snippet** 条目，可删掉 Snippet 那条，只保留 Automatic，避免重复。

（可选）GitHub Secret `VITE_CF_BEACON_TOKEN` + 代码内 beacon：与 Automatic 功能重复，可不用。

---

## 域名与 GitHub Pages

1. Cloudflare DNS：`@` / `www` CNAME → `yqxx.github.io`（橙云）
2. GitHub Pages Custom domain：`chirrup.cn`，勾选 Enforce HTTPS
3. Cloudflare SSL/TLS：**Full**

---

## 设计说明

- 字体：Plus Jakarta Sans
- 主色 `#171717` · CTA `#D4AF37`
- 结构：Hero → 功能 → 读书迷你条 → 行情迷你条 → 三步上手 → 下载与安装 → 常见问题 → Footer

## SEO

- `index.html`：`title`、`description`、`canonical`、Open Graph、Twitter Card、JSON-LD
- `public/robots.txt`、`public/sitemap.xml`
- 分享图：`public/og.png`（1200×630，微信 / Slack 等预览用）

发版后可在 [Google Rich Results Test](https://search.google.com/test/rich-results) 或微信开发者工具里粘贴 `https://chirrup.cn/` 检查预览。
