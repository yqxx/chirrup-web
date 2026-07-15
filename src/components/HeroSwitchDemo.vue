<template>
  <div
    ref="rootEl"
    class="hero-switch"
    :class="{ paused: paused || reducedMotion }"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    aria-hidden="true"
  >
    <p class="caption">{{ caption }}</p>

    <div class="desktop">
      <div class="desktop-bar">
        <span>桌面</span>
        <em>预警后自动切屏</em>
      </div>

      <div class="window window-idle" ref="idleWin">
        <div class="win-chrome">
          <span /><span /><span />
          <em>周末计划 · 未保存</em>
        </div>
        <div class="win-body">
          <div class="fake-video" />
          <p>正在播放……</p>
        </div>
      </div>

      <div class="window window-safe" ref="safeWin">
        <div class="win-chrome">
          <span /><span /><span />
          <em>季度汇报.xlsx</em>
        </div>
        <div class="win-body">
          <div class="sheet-grid">
            <div v-for="n in 12" :key="n" class="cell" :class="{ accent: n === 5 }">
              {{ n === 5 ? 'OK' : '' }}
            </div>
          </div>
          <p>工作中 · 目标应用</p>
        </div>
      </div>

      <div class="alert-toast" ref="toastEl">
        <span class="dot" />
        <div>
          <strong>PPT战神</strong>
          <em>发出预警</em>
        </div>
      </div>

      <div class="mini-bar" ref="miniEl">
        <img :src="iconUrl" alt="" width="16" height="16" />
        <span>风紧扯呼</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import gsap from 'gsap'
import { publicUrl } from '@/config/site'
import { useInView } from '@/composables/useInView'
import { usePrefersReducedMotion } from '@/composables/usePrefersReducedMotion'

const START_DELAY = 0.65

const iconUrl = publicUrl('icon.svg')
const rootEl = ref<HTMLElement | null>(null)
const idleWin = ref<HTMLElement | null>(null)
const safeWin = ref<HTMLElement | null>(null)
const toastEl = ref<HTMLElement | null>(null)
const miniEl = ref<HTMLElement | null>(null)

const stage = ref(0)
const paused = ref(false)
const inView = useInView(rootEl, 0.25)
const reducedMotion = usePrefersReducedMotion()

const captions = ['摸鱼窗口在前', '收到局域网预警', '切换到安全应用', '保持工作界面'] as const
const caption = computed(() => captions[stage.value] ?? captions[0])

let tl: gsap.core.Timeline | null = null

function setStaticSafe() {
  gsap.set(idleWin.value, { opacity: 0.25, scale: 0.92, x: -28, y: 18, zIndex: 1 })
  gsap.set(safeWin.value, { opacity: 1, scale: 1, x: 0, y: 0, zIndex: 3 })
  gsap.set(toastEl.value, { opacity: 0, y: 12 })
  gsap.set(miniEl.value, { opacity: 1, scale: 1 })
  stage.value = 2
}

function buildTimeline() {
  if (!idleWin.value || !safeWin.value || !toastEl.value || !miniEl.value) return

  tl?.kill()
  tl = gsap.timeline({
    repeat: -1,
    defaults: { ease: 'power2.out' },
    onUpdate() {
      const t = (tl?.time() ?? 0) - START_DELAY
      if (t < 0) stage.value = 0
      else if (t < 1.4) stage.value = 0
      else if (t < 2.6) stage.value = 1
      else if (t < 4.4) stage.value = 2
      else stage.value = 3
    },
  })

  gsap.set(idleWin.value, { opacity: 1, scale: 1, x: 0, y: 0, zIndex: 3 })
  gsap.set(safeWin.value, { opacity: 0.55, scale: 0.94, x: 36, y: 22, zIndex: 1 })
  gsap.set(toastEl.value, { opacity: 0, y: 16, scale: 0.96 })
  gsap.set(miniEl.value, { opacity: 0.7, scale: 1 })

  const t0 = START_DELAY

  tl.to({}, { duration: START_DELAY })
    .to({}, { duration: 1.2 })
    .to(toastEl.value, { opacity: 1, y: 0, scale: 1, duration: 0.45 }, t0 + 1.2)
    .to(miniEl.value, { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1 }, t0 + 1.35)
    .to(
      idleWin.value,
      { opacity: 0.2, scale: 0.9, x: -32, y: 20, zIndex: 1, duration: 0.55 },
      t0 + 2.4,
    )
    .to(
      safeWin.value,
      { opacity: 1, scale: 1, x: 0, y: 0, zIndex: 3, duration: 0.55 },
      t0 + 2.4,
    )
    .to(toastEl.value, { opacity: 0, y: -8, duration: 0.35 }, t0 + 3.6)
    .to({}, { duration: 1.4 })
}

function syncPlayback() {
  if (reducedMotion.value) {
    tl?.kill()
    tl = null
    setStaticSafe()
    return
  }

  if (!inView.value) {
    tl?.pause()
    return
  }

  if (!tl) buildTimeline()

  if (paused.value) tl?.pause()
  else tl?.play()
}

watch([inView, paused, reducedMotion], syncPlayback)

onMounted(() => {
  syncPlayback()
})

onUnmounted(() => {
  tl?.kill()
  tl = null
})
</script>

<style scoped lang="scss">
.hero-switch {
  &.paused .desktop {
    outline-color: rgba(212, 175, 55, 0.45);
  }
}

.caption {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-cta);
  letter-spacing: 0.02em;
  min-height: 1.2em;
}

.desktop {
  position: relative;
  height: 340px;
  padding: 14px;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--color-border);
  background: linear-gradient(160deg, #f4f4f5 0%, #e7e5e4 100%);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  outline: 1.5px dashed transparent;
  outline-offset: 2px;
  transition: outline-color var(--transition);
}

.desktop-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-subtle);

  em {
    font-style: normal;
    color: var(--color-cta);
  }
}

.window {
  position: absolute;
  width: min(74%, 300px);
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-border);
  background: var(--color-bg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transform-origin: center center;
}

.window-idle {
  left: 14%;
  top: 56px;
}

.window-safe {
  left: 24%;
  top: 70px;
}

.win-chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 10px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-border-strong);

    &:nth-child(1) {
      background: #ef4444;
    }
    &:nth-child(2) {
      background: #eab308;
    }
    &:nth-child(3) {
      background: #22c55e;
    }
  }

  em {
    margin-left: 8px;
    font-style: normal;
    font-size: 11px;
    font-weight: 600;
    color: var(--color-text-subtle);
  }
}

.win-body {
  padding: 12px;

  p {
    margin: 8px 0 0;
    font-size: 12px;
    color: var(--color-text-subtle);
  }
}

.fake-video {
  height: 96px;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, #262626 0%, #525252 45%, #171717 100%);
}

.sheet-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}

.cell {
  height: 24px;
  border-radius: 3px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: #15803d;

  &.accent {
    background: var(--color-accent-muted);
    border-color: rgba(212, 175, 55, 0.45);
    color: var(--color-cta);
  }
}

.alert-toast {
  position: absolute;
  right: 14px;
  bottom: 56px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: #fafafa;
  box-shadow: var(--shadow-md);
  z-index: 5;

  strong {
    display: block;
    font-size: 13px;
  }

  em {
    font-style: normal;
    font-size: 12px;
    color: #a3a3a3;
  }
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-cta);
  box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.25);
}

.mini-bar {
  position: absolute;
  left: 14px;
  bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 12px;
  border-radius: var(--radius-full);
  background: rgba(23, 23, 23, 0.92);
  color: #fafafa;
  font-size: 12px;
  font-weight: 600;
  z-index: 6;
  box-shadow: var(--shadow-sm);
}

@media (max-width: 900px) {
  .desktop {
    height: 300px;
  }
}
</style>
