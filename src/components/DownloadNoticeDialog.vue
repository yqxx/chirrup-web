<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="notice-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-notice-title"
      @keydown.esc.prevent="emit('close')"
    >
      <button type="button" class="notice-backdrop" aria-label="关闭" @click="emit('close')" />
      <div class="notice-panel" ref="panelEl">
        <h3 id="download-notice-title">下载须知</h3>
        <p class="lead">安装包暂未代码签名，浏览器可能提示「通常不会下载」。按示意保留文件即可。</p>

        <div class="demo-row">
          <div class="browser-demo" aria-hidden="true">
            <div class="dl-flyout">
              <div class="dl-head">下载</div>

              <!-- Stage 0–1: uncommon download warning -->
              <div class="dl-card" :class="{ dim: stage >= 2 }">
                <span class="warn-icon">!</span>
                <p>
                  通常不会下载 <b>chirrup.exe</b>。请在打开前确保信任此文件。
                </p>
                <div class="dl-more" :class="{ pulse: stage === 0 }" ref="moreEl">⋯</div>
              </div>

              <div v-show="stage === 1" class="ctx-menu" ref="menuEl">
                <span>删除</span>
                <span class="active">保留</span>
                <span>了解更多信息</span>
              </div>

              <!-- Stage 2: trust confirm -->
              <div v-show="stage >= 2" class="dl-confirm" ref="confirmEl">
                <p class="confirm-title">打开前请确保信任 chirrup.exe</p>
                <p class="confirm-desc">Microsoft Defender SmartScreen 无法验证此文件是否安全。</p>
                <div class="confirm-meta">发布者：未知</div>
                <div class="confirm-actions">
                  <span class="ghost">取消</span>
                  <span class="split" :class="{ pulse: stage === 2 }">
                    删除
                    <i>▾</i>
                  </span>
                </div>
                <div v-show="stage === 3" class="keep-menu" ref="keepEl">
                  <span class="active">仍然保留</span>
                </div>
              </div>
            </div>
          </div>

          <ol class="notice-steps">
            <li :class="{ active: stage <= 1 }">
              <strong>01 点 ⋯ → 保留</strong>
              <span>下载栏出现黄色提示时，点右侧 <em>⋯</em>，再选 <em>保留</em>。</span>
            </li>
            <li :class="{ active: stage >= 2 }">
              <strong>02 仍然保留</strong>
              <span>若再次确认，点 <em>删除</em> 旁箭头，选 <em>仍然保留</em>。</span>
            </li>
          </ol>
        </div>

        <div class="notice-actions">
          <button type="button" class="btn btn-secondary" @click="emit('close')">取消</button>
          <a
            class="btn btn-primary"
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            @click="emit('confirm')"
          >
            <Download :size="16" />
            继续下载
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
import { Download } from '@lucide/vue'

const props = defineProps<{
  open: boolean
  url: string
}>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()

const panelEl = ref<HTMLElement | null>(null)
const stage = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function tick() {
  stage.value = (stage.value + 1) % 4
}

function startLoop() {
  stopLoop()
  stage.value = 0
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stage.value = 3
    return
  }
  timer = setInterval(tick, 1600)
}

function stopLoop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

watch(
  () => props.open,
  async (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) {
      await nextTick()
      startLoop()
      panelEl.value?.querySelector<HTMLElement>('a, button')?.focus()
    } else {
      stopLoop()
    }
  },
)

onUnmounted(() => {
  stopLoop()
  document.body.style.overflow = ''
})
</script>

<style scoped lang="scss">
.notice-root {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.notice-backdrop {
  position: absolute;
  inset: 0;
  border: none;
  background: rgba(23, 23, 23, 0.48);
  cursor: pointer;
}

.notice-panel {
  position: relative;
  width: min(100%, 560px);
  padding: 24px;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--color-border);
  background: var(--color-bg);
  box-shadow: var(--shadow-lg);

  h3 {
    margin: 0 0 8px;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.03em;
  }
}

.lead {
  margin: 0 0 18px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.demo-row {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 16px;
  margin-bottom: 22px;
  align-items: stretch;
}

.browser-demo {
  min-height: 220px;
}

.dl-flyout {
  position: relative;
  height: 100%;
  min-height: 220px;
  padding: 12px;
  border-radius: var(--radius-md);
  background: #1c1c1c;
  color: #fafafa;
  overflow: hidden;
}

.dl-head {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 700;
}

.dl-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 8px;
  align-items: start;
  padding: 10px;
  border-radius: 8px;
  background: #2a2a2a;
  transition: opacity 0.25s ease;

  &.dim {
    opacity: 0.35;
  }

  p {
    margin: 0;
    font-size: 12px;
    line-height: 1.45;
    color: #d4d4d4;

    b {
      color: #fff;
      font-weight: 600;
    }
  }
}

.warn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid #eab308;
  color: #eab308;
  font-size: 11px;
  font-weight: 800;
}

.dl-more {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 16px;
  line-height: 1;
  color: #a3a3a3;

  &.pulse {
    color: #fff;
    background: rgba(212, 175, 55, 0.35);
    box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.55);
  }
}

.ctx-menu {
  position: absolute;
  top: 88px;
  right: 18px;
  z-index: 3;
  min-width: 120px;
  padding: 6px;
  border-radius: 8px;
  background: #333;
  border: 1px solid #404040;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 2px;

  span {
    padding: 8px 10px;
    border-radius: 4px;
    font-size: 12px;
    color: #e5e5e5;

    &.active {
      background: rgba(212, 175, 55, 0.28);
      color: #fafafa;
      font-weight: 700;
      box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.55);
    }
  }
}

.dl-confirm {
  position: relative;
  margin-top: 10px;
  padding: 12px;
  border-radius: 8px;
  background: #2a2a2a;
  border: 1px solid #404040;
}

.confirm-title {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.confirm-desc {
  margin: 0 0 8px;
  font-size: 11px;
  line-height: 1.45;
  color: #a3a3a3;
}

.confirm-meta {
  margin-bottom: 12px;
  font-size: 11px;
  color: #737373;
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  .ghost {
    padding: 6px 12px;
    border-radius: 4px;
    border: 1px solid #525252;
    font-size: 12px;
    color: #e5e5e5;
  }

  .split {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 4px;
    background: #fafafa;
    color: #171717;
    font-size: 12px;
    font-weight: 700;

    i {
      font-style: normal;
      opacity: 0.7;
    }

    &.pulse {
      box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.7);
    }
  }
}

.keep-menu {
  position: absolute;
  right: 12px;
  bottom: 44px;
  min-width: 110px;
  padding: 6px;
  border-radius: 8px;
  background: #333;
  border: 1px solid #404040;
  box-shadow: var(--shadow-md);

  span {
    display: block;
    padding: 8px 10px;
    border-radius: 4px;
    font-size: 12px;

    &.active {
      background: rgba(212, 175, 55, 0.28);
      font-weight: 700;
      box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.55);
    }
  }
}

.notice-steps {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 14px;
    border-radius: var(--radius-md);
    border: 1.5px solid transparent;
    background: var(--color-surface);
    transition:
      border-color var(--transition),
      background-color var(--transition);

    &.active {
      background: var(--color-accent-muted);
      border-color: rgba(212, 175, 55, 0.45);
    }
  }

  strong {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text);
  }

  span {
    font-size: 13px;
    line-height: 1.55;
    color: var(--color-text-muted);
  }

  em {
    font-style: normal;
    font-weight: 700;
    color: var(--color-text);
  }
}

.notice-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;

  .btn {
    height: 42px;
    padding: 0 16px;
    font-size: 14px;
  }

  .btn-primary {
    box-shadow: none;
  }
}

@media (max-width: 640px) {
  .demo-row {
    grid-template-columns: 1fr;
  }

  .browser-demo {
    min-height: 200px;
  }
}
</style>
