/** Cloudflare Web Analytics — only loads when VITE_CF_BEACON_TOKEN is set. */
export function initCloudflareAnalytics() {
  const token = import.meta.env.VITE_CF_BEACON_TOKEN?.trim()
  if (!token) return

  const script = document.createElement('script')
  script.defer = true
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
  script.setAttribute('data-cf-beacon', JSON.stringify({ token }))
  document.head.appendChild(script)
}
