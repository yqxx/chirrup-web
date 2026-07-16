/**
 * Download click counter + redirect to Gitee Releases.
 *
 * Routes (configure on Cloudflare):
 *   GET /dl/windows  → count + 302
 *   GET /dl/macos    → count + 302
 *   GET /dl/stats?token=... → JSON counts
 */

export interface Env {
  DOWNLOADS: KVNamespace
  APP_VERSION: string
  /** Optional; required for /dl/stats */
  STATS_TOKEN?: string
}

const PLATFORMS = ['windows', 'macos'] as const
type Platform = (typeof PLATFORMS)[number]

function giteeUrl(version: string, platform: Platform): string {
  const base = `https://gitee.com/yqxx/chirrup-releases/releases/download/v${version}`
  if (platform === 'windows') {
    return `${base}/chirrup-${version}-windows-portable.exe`
  }
  return `${base}/chirrup-${version}-macos.dmg`
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}

async function readCount(kv: KVNamespace, key: string): Promise<number> {
  const raw = await kv.get(key)
  const n = raw ? Number.parseInt(raw, 10) : 0
  return Number.isFinite(n) ? n : 0
}

async function bump(kv: KVNamespace, key: string): Promise<number> {
  const next = (await readCount(kv, key)) + 1
  await kv.put(key, String(next))
  return next
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname.replace(/\/+$/, '') || '/'

    if (path === '/dl/stats' || path === '/stats') {
      const token = url.searchParams.get('token') ?? ''
      if (!env.STATS_TOKEN || token !== env.STATS_TOKEN) {
        return json({ error: 'unauthorized' }, 401)
      }
      const windows = await readCount(env.DOWNLOADS, 'windows')
      const macos = await readCount(env.DOWNLOADS, 'macos')
      return json({
        version: env.APP_VERSION,
        windows,
        macos,
        total: windows + macos,
      })
    }

    const match = path.match(/^\/dl\/(windows|macos)$/)
    if (!match) {
      return json(
        {
          error: 'not_found',
          usage: ['/dl/windows', '/dl/macos', '/dl/stats?token=...'],
        },
        404,
      )
    }

    const platform = match[1] as Platform
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405 })
    }

    // Count only real navigation GETs (skip HEAD / prefetch if desired)
    if (request.method === 'GET') {
      const purpose = request.headers.get('Purpose') ?? request.headers.get('Sec-Purpose')
      if (purpose !== 'prefetch') {
        await bump(env.DOWNLOADS, platform)
      }
    }

    return Response.redirect(giteeUrl(env.APP_VERSION, platform), 302)
  },
}
