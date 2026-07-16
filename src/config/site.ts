/** Vite base：自定义域名根路径为 `/` */
export const BASE_URL = import.meta.env.BASE_URL

/** 正式站点域名（SEO canonical / OG 等） */
export const SITE_URL = 'https://chirrup.cn'

/** 反馈与联系 */
export const CONTACT_EMAIL = 'chirrup_cn@163.com'

export function publicUrl(path: string): string {
  const clean = path.replace(/^\//, '')
  return `${BASE_URL}${clean}`
}

export function absoluteUrl(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${clean === '/' ? '/' : clean}`
}
