/** 发版时同步更新版本号与下方链接 */
export const APP_VERSION = '1.0.0'

const RELEASE_BASE = `https://gitee.com/yqxx/chirrup-releases/releases/download/v${APP_VERSION}`

/**
 * 安装包托管在 Gitee Releases（国内下载更稳）。
 * 发新版：在 Gitee 发 Release 后，更新 APP_VERSION。
 */
export const downloads = {
  windows: {
    label: '下载 Windows 版',
    url: `${RELEASE_BASE}/chirrup-${APP_VERSION}-windows-portable.exe`,
  },
  macos: {
    label: '下载 macOS 版',
    url: `${RELEASE_BASE}/chirrup-${APP_VERSION}-macos.dmg`,
  },
} as const
