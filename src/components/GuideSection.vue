<template>
  <section class="section guide" id="guide" ref="rootEl">
    <div class="container">
      <div class="guide-head">
        <span class="section-label">指南</span>
        <h2 class="section-title">首次运行与使用</h2>
        <p class="section-desc">未签名安装包可能被系统拦截。看一遍示意，再按步骤放行即可。</p>
      </div>

      <div class="platform-tabs" role="tablist" aria-label="操作系统">
        <button
          type="button"
          role="tab"
          :aria-selected="platform === 'windows'"
          :class="{ active: platform === 'windows' }"
          @click="setPlatform('windows')"
        >
          Windows
        </button>
        <button
          type="button"
          role="tab"
          :aria-selected="platform === 'macos'"
          :class="{ active: platform === 'macos' }"
          @click="setPlatform('macos')"
        >
          macOS
        </button>
      </div>

      <div class="guide-demo">
        <div
          class="scene"
          :class="{ paused: paused || reducedMotion }"
          @mouseenter="paused = true"
          @mouseleave="paused = false"
          aria-hidden="true"
        >
          <!-- Windows scenes -->
          <template v-if="platform === 'windows'">
            <div class="dialog" ref="dialogEl">
              <div class="dialog-icon warn">!</div>
              <div class="dialog-body">
                <h3>Windows 已保护你的电脑</h3>
                <p class="detail">Microsoft Defender SmartScreen 阻止了未识别的应用。</p>
                <div class="dialog-actions">
                  <button type="button" class="ghost" tabindex="-1" ref="moreBtn">更多信息</button>
                  <button type="button" class="primary" tabindex="-1" ref="runBtn">仍要运行</button>
                </div>
              </div>
            </div>
            <div class="app-mock" ref="appEl">
              <div class="app-chrome">
                <img :src="iconUrl" alt="" width="18" height="18" />
                <span>风紧扯呼</span>
              </div>
              <div class="app-fields">
                <label>我的昵称</label>
                <div class="field" ref="fieldEl">PPT战神</div>
                <label>目标应用</label>
                <div class="field">季度汇报.xlsx</div>
              </div>
            </div>
          </template>

          <!-- macOS scenes -->
          <template v-else>
            <div class="dialog mac" ref="dialogEl">
              <div class="dialog-icon mac-icon">
                <img :src="iconUrl" alt="" width="28" height="28" />
              </div>
              <div class="dialog-body">
                <h3>无法打开“风紧扯呼”</h3>
                <p class="detail">
                  Apple 无法检查其是否包含恶意软件。可在隐私与安全性中仍要打开。
                </p>
                <div class="dialog-actions">
                  <button type="button" class="ghost" tabindex="-1" ref="moreBtn">好</button>
                  <button type="button" class="primary" tabindex="-1" ref="runBtn">仍要打开</button>
                </div>
              </div>
            </div>
            <div class="app-mock" ref="appEl">
              <div class="app-chrome">
                <img :src="iconUrl" alt="" width="18" height="18" />
                <span>风紧扯呼</span>
              </div>
              <div class="app-fields">
                <label>我的昵称</label>
                <div class="field" ref="fieldEl">摸鱼达人</div>
                <label>目标应用</label>
                <div class="field">Notes</div>
              </div>
            </div>
          </template>
        </div>

        <ol class="steps" aria-label="操作步骤">
          <li
            v-for="(item, index) in currentSteps"
            :key="`${platform}-${item.title}`"
            :class="{ active: step === index }"
          >
            <button type="button" class="step-btn" @click="jumpTo(index)">
              <span class="num">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="text">
                <strong>{{ item.title }}</strong>
                <em>{{ item.desc }}</em>
              </span>
            </button>
          </li>
        </ol>
      </div>

      <div class="prep">
        <h3>使用前准备</h3>
        <ul>
          <li>所有设备连接同一局域网（同一 Wi‑Fi / 路由器）。</li>
          <li>防火墙允许应用使用 UDP 端口 12345。</li>
          <li>Windows：目标应用填完整路径或进程名；macOS：填应用名称（如 Notes）。</li>
          <li>本机发出的预警不会触发本机切屏；配置仅保存在本机。</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import gsap from 'gsap'
import { publicUrl } from '@/config/site'
import { useInView } from '@/composables/useInView'
import { usePrefersReducedMotion } from '@/composables/usePrefersReducedMotion'

type Platform = 'windows' | 'macos'

const iconUrl = publicUrl('icon.svg')
const platform = ref<Platform>('windows')
const step = ref(0)
const paused = ref(false)

const rootEl = ref<HTMLElement | null>(null)
const dialogEl = ref<HTMLElement | null>(null)
const moreBtn = ref<HTMLElement | null>(null)
const runBtn = ref<HTMLElement | null>(null)
const appEl = ref<HTMLElement | null>(null)
const fieldEl = ref<HTMLElement | null>(null)

const inView = useInView(rootEl, 0.28)
const reducedMotion = usePrefersReducedMotion()

const stepsMap = {
  windows: [
    {
      title: '遇到 SmartScreen',
      desc: '提示「Windows 已保护你的电脑」时先别关闭。',
    },
    {
      title: '更多信息 → 仍要运行',
      desc: '展开更多信息后，点击「仍要运行」。',
    },
    {
      title: '允许网络访问',
      desc: '防火墙弹出时选择允许（UDP 12345）。',
    },
    {
      title: '设置昵称与目标应用',
      desc: '进入主界面后完成首次配置即可使用。',
    },
  ],
  macos: [
    {
      title: '安装到应用程序',
      desc: '打开 DMG，将应用拖入「应用程序」。',
    },
    {
      title: '仍要打开',
      desc: '若无法验证开发者：隐私与安全性 → 仍要打开。',
    },
    {
      title: '或解除隔离',
      desc: '终端执行 xattr 命令后，从启动台打开。',
    },
    {
      title: '设置昵称与目标应用',
      desc: '进入主界面后完成首次配置即可使用。',
    },
  ],
} as const

const currentSteps = computed(() => stepsMap[platform.value])

let tl: gsap.core.Timeline | null = null

function setPlatform(next: Platform) {
  if (platform.value === next) return
  platform.value = next
  step.value = 0
}

function jumpTo(index: number) {
  step.value = index
  if (reducedMotion.value || !tl) {
    applyStatic(index)
    return
  }
  const labels = ['s0', 's1', 's2', 's3'] as const
  const label = labels[index]
  if (!label) return
  tl.seek(label)
  if (!paused.value) tl.play()
}

function applyStatic(index: number) {
  if (!dialogEl.value || !appEl.value || !moreBtn.value || !runBtn.value) return
  gsap.set([moreBtn.value, runBtn.value], { boxShadow: 'none', scale: 1 })
  if (index < 3) {
    gsap.set(dialogEl.value, { opacity: 1, scale: 1, y: 0 })
    gsap.set(appEl.value, { opacity: 0, y: 16 })
    if (index >= 1) gsap.set(moreBtn.value, { boxShadow: '0 0 0 2px rgba(212,175,55,0.55)' })
    if (index >= 2) gsap.set(runBtn.value, { boxShadow: '0 0 0 2px rgba(212,175,55,0.55)' })
  } else {
    gsap.set(dialogEl.value, { opacity: 0, scale: 0.96, y: -8 })
    gsap.set(appEl.value, { opacity: 1, y: 0 })
    if (fieldEl.value) gsap.set(fieldEl.value, { boxShadow: '0 0 0 2px rgba(212,175,55,0.45)' })
  }
}

function buildTimeline() {
  if (!dialogEl.value || !appEl.value || !moreBtn.value || !runBtn.value) return

  tl?.kill()
  tl = gsap.timeline({
    repeat: -1,
    defaults: { ease: 'power2.out' },
    onUpdate() {
      const t = tl?.time() ?? 0
      if (t < 1.8) step.value = 0
      else if (t < 3.6) step.value = 1
      else if (t < 5.2) step.value = 2
      else step.value = 3
    },
  })

  gsap.set(dialogEl.value, { opacity: 1, scale: 1, y: 0 })
  gsap.set(appEl.value, { opacity: 0, y: 20 })
  gsap.set([moreBtn.value, runBtn.value], { boxShadow: 'none', scale: 1 })
  if (fieldEl.value) gsap.set(fieldEl.value, { boxShadow: 'none' })

  tl.addLabel('s0')
    .to({}, { duration: 1.6 })
    .addLabel('s1')
    .to(moreBtn.value, { boxShadow: '0 0 0 2px rgba(212,175,55,0.65)', scale: 1.04, duration: 0.35 })
    .to({}, { duration: 1.2 })
    .addLabel('s2')
    .to(moreBtn.value, { boxShadow: 'none', scale: 1, duration: 0.2 })
    .to(runBtn.value, { boxShadow: '0 0 0 2px rgba(212,175,55,0.65)', scale: 1.04, duration: 0.35 })
    .to({}, { duration: 1.1 })
    .addLabel('s3')
    .to(dialogEl.value, { opacity: 0, scale: 0.96, y: -10, duration: 0.4 })
    .to(appEl.value, { opacity: 1, y: 0, duration: 0.45 }, '-=0.15')

  if (fieldEl.value) {
    tl.to(
      fieldEl.value,
      { boxShadow: '0 0 0 2px rgba(212,175,55,0.5)', duration: 0.3, yoyo: true, repeat: 3 },
      '-=0.1',
    )
  }

  tl.to({}, { duration: 1.5 })
}

async function rebuild() {
  await nextTick()
  if (reducedMotion.value) {
    tl?.kill()
    tl = null
    applyStatic(step.value)
    return
  }
  buildTimeline()
  syncPlayback()
}

function syncPlayback() {
  if (reducedMotion.value) {
    tl?.pause(0)
    tl?.kill()
    tl = null
    applyStatic(Math.min(step.value, 3))
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

watch(platform, () => {
  rebuild()
})

watch([inView, paused, reducedMotion], syncPlayback)

onMounted(() => {
  rebuild()
})

onUnmounted(() => {
  tl?.kill()
  tl = null
})
</script>

<style scoped lang="scss">
.guide {
  background: linear-gradient(180deg, var(--color-surface) 0%, #ffffff 100%);
  border-top: 1px solid var(--color-border);
}

.guide-head {
  margin-bottom: 28px;
}

.platform-tabs {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  margin-bottom: 28px;
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  border: 1.5px solid var(--color-border);
}

.platform-tabs button {
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color var(--transition),
    color var(--transition);

  &.active {
    background: var(--color-primary);
    color: #fafafa;
  }

  &:hover:not(.active) {
    color: var(--color-text);
    background: var(--color-surface);
  }
}

.guide-demo {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 32px;
  align-items: stretch;
  margin-bottom: 40px;
}

.scene {
  position: relative;
  min-height: 320px;
  padding: 24px;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--color-border);
  background:
    radial-gradient(ellipse 60% 50% at 50% 30%, rgba(212, 175, 55, 0.08), transparent 60%),
    #f4f4f5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &.paused {
    outline: 1.5px dashed rgba(212, 175, 55, 0.45);
  }
}

.dialog {
  width: min(100%, 360px);
  display: flex;
  gap: 14px;
  padding: 18px;
  border-radius: var(--radius-md);
  background: var(--color-bg);
  border: 1.5px solid var(--color-border);
  box-shadow: var(--shadow-md);
  z-index: 2;

  &.mac {
    flex-direction: column;
    align-items: center;
    text-align: center;

    .dialog-body {
      align-items: center;
    }

    .dialog-actions {
      justify-content: center;
    }
  }
}

.dialog-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  background: #fef3c7;
  color: #b45309;

  &.mac-icon {
    background: var(--color-accent-muted);
  }
}

.dialog-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;

  h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .detail {
    margin: 0;
    font-size: 13px;
    line-height: 1.55;
    color: var(--color-text-muted);
  }
}

.dialog-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;

  button {
    height: 34px;
    padding: 0 12px;
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 600;
    pointer-events: none;
  }

  .ghost {
    border: 1.5px solid var(--color-border-strong);
    background: var(--color-bg);
    color: var(--color-text);
  }

  .primary {
    border: none;
    background: var(--color-cta);
    color: var(--color-cta-text);
  }
}

.app-mock {
  position: absolute;
  width: min(88%, 340px);
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-border);
  background: var(--color-bg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 1;
}

.app-chrome {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 14px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  font-size: 13px;
  font-weight: 700;
}

.app-fields {
  padding: 16px;

  label {
    display: block;
    margin-bottom: 6px;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-subtle);
  }

  .field {
    height: 36px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    margin-bottom: 12px;
    border-radius: var(--radius-sm);
    border: 1.5px solid var(--color-border);
    font-size: 14px;
    font-weight: 500;
  }
}

.steps {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-btn {
  width: 100%;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px 14px;
  border: 1.5px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition:
    background-color var(--transition),
    border-color var(--transition);

  &:hover {
    background: var(--color-bg);
  }
}

.steps li.active .step-btn {
  background: var(--color-bg);
  border-color: rgba(212, 175, 55, 0.45);
  box-shadow: var(--shadow-sm);
}

.num {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--color-border-strong);
  line-height: 1.2;
}

.steps li.active .num {
  color: var(--color-cta);
}

.text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;

  strong {
    font-size: 15px;
    font-weight: 700;
    color: var(--color-text);
  }

  em {
    font-style: normal;
    font-size: 13px;
    line-height: 1.5;
    color: var(--color-text-muted);
  }
}

.prep {
  padding-top: 28px;
  border-top: 1px solid var(--color-border);

  h3 {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 700;
  }

  ul {
    margin: 0;
    padding-left: 1.2em;
    color: var(--color-text-muted);
    font-size: 14px;
    line-height: 1.7;
  }

  li + li {
    margin-top: 6px;
  }
}

@media (max-width: 900px) {
  .guide-demo {
    grid-template-columns: 1fr;
  }

  .scene {
    min-height: 280px;
  }
}
</style>
