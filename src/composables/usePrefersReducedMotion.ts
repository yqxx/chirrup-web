import { onMounted, onUnmounted, ref } from 'vue'

export function usePrefersReducedMotion() {
  const reduced = ref(false)
  let mq: MediaQueryList | null = null

  function sync() {
    reduced.value = Boolean(mq?.matches)
  }

  onMounted(() => {
    mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    sync()
    mq.addEventListener('change', sync)
  })

  onUnmounted(() => {
    mq?.removeEventListener('change', sync)
  })

  return reduced
}
