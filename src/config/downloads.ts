import { publicUrl } from '@/config/site'

/** 发版时同步更新版本号与下方文件名 */
export const APP_VERSION = '1.0.0'

/**
 * 安装包放在 `public/downloads/`，构建后随站点一起发布。
 * 从 chirrup 私有仓库打包后，按下列文件名复制过来即可。
 */
export const downloads = {
  windows: {
    label: '下载便携版',
    hint: 'portable.exe · 约 5–15MB · 即下即用',
    file: `chirrup-${APP_VERSION}-windows-portable.exe`,
  },
  macos: {
    label: '下载 DMG',
    hint: 'DMG · 约 5–15MB',
    file: `chirrup-${APP_VERSION}-macos.dmg`,
  },
} as const

export function downloadUrl(file: string): string {
  return publicUrl(`downloads/${file}`)
}
