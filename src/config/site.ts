/** Vite base：自定义域名根路径为 `/` */
export const BASE_URL = import.meta.env.BASE_URL

export function publicUrl(path: string): string {
  const clean = path.replace(/^\//, '')
  return `${BASE_URL}${clean}`
}
