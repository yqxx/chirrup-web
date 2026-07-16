# 下载计数 Worker

官网下载按钮走 `https://chirrup.cn/dl/windows` / `macos`，Worker 计数后 302 到 Gitee。

## 一次配置

需已安装 [Node.js](https://nodejs.org/) 与 Cloudflare 账号（域名 `chirrup.cn` 已在该账号下）。

```bash
cd workers/download-counter
npm install
npx wrangler login
```

### 1. 创建 KV

```bash
npx wrangler kv namespace create DOWNLOADS
```

把输出的 `id` 填进 `wrangler.toml` 的 `id = "..."`。

### 2. 设置查看密码

```bash
npx wrangler secret put STATS_TOKEN
```

按提示输入一串自己记得的密码（用于看统计）。

### 3. 部署

确认 `wrangler.toml` 里 `APP_VERSION` 与官网一致，然后：

```bash
npm run deploy
```

### 4. 绑定路由（必做）

Cloudflare Dashboard → **Workers & Pages** → **chirrup-download-counter** → **Settings / Triggers** → **Add route**：

- Route: `chirrup.cn/dl/*`
- Zone: `chirrup.cn`

DNS 需为**橙云代理**（已开过 Automatic Analytics 一般已是橙云）。

## 看下载量

浏览器打开（把 `你的密码` 换成 STATS_TOKEN）：

```
https://chirrup.cn/dl/stats?token=你的密码
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

记的是「点了官网下载并跳转」的次数，不是 Gitee 侧真实文件拉取次数（重复点击会重复计数）。

## 发新版时

1. 更新官网 `src/config/downloads.ts` 的 `APP_VERSION`
2. 同步改本目录 `wrangler.toml` 的 `APP_VERSION`
3. 再执行 `npm run deploy`
