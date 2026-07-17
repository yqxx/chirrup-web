/** 发版时同步更新：本文件 APP_VERSION + workers/download-counter/wrangler.toml */
export const APP_VERSION = '1.0.6'

/**
 * 下载走本域 /dl/*（Cloudflare Worker 计数后跳转 Gitee）。
 * Worker 未部署时链接会 404，需先按 workers/download-counter/README.md 配置。
 */
export const downloads = {
  windows: {
    label: '下载 Windows 便携版',
    url: 'https://chirrup.cn/dl/windows',
  },
  macos: {
    label: '下载 macOS 版',
    url: 'https://chirrup.cn/dl/macos',
  },
} as const
