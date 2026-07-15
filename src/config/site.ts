/** Vite base，GitHub Pages 下为 `/chirrup-web/` */
export const BASE_URL = import.meta.env.BASE_URL

export function publicUrl(path: string): string {
  const clean = path.replace(/^\//, '')
  return `${BASE_URL}${clean}`
}
