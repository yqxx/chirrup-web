import { onUnmounted, ref, watch, type Ref } from 'vue'

export function useInView(target: Ref<HTMLElement | null>, threshold = 0.35) {
  const inView = ref(false)
  let observer: IntersectionObserver | null = null

  watch(
    target,
    (el) => {
      observer?.disconnect()
      observer = null
      if (!el || inView.value) return

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            inView.value = true
            observer?.disconnect()
          }
        },
        { threshold },
      )
      observer.observe(el)
    },
    { immediate: true },
  )

  onUnmounted(() => {
    observer?.disconnect()
  })

  return inView
}
