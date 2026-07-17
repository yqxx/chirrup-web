<template>
  <section class="section reader" id="reader">
    <div class="container">
      <div class="reader-head">
        <span class="section-label">读书迷你条</span>
        <h2 class="section-title">预警归预警，阅读归阅读</h2>
        <p class="section-desc">
          独立悬浮读书条，可与预警迷你条同时驻留桌面。主窗口「读书」Tab 管理本地书架，不提供在线书源。
        </p>
      </div>

      <div class="reader-demo">
        <div class="reader-mock" aria-hidden="true">
          <div class="mock-tabs">
            <span class="tab">预警</span>
            <span class="tab active">读书</span>
          </div>
          <div class="mock-shelf">
            <div class="mock-shelf-head">
              <span>我的书</span>
              <span class="mock-btn">导入 TXT</span>
            </div>
            <div class="mock-book">
              <span class="book-title">人类简史.txt</span>
              <span class="book-progress">进度 42%</span>
            </div>
            <div class="mock-settings">
              <span>字号 · 滚速 · 自动滚字</span>
            </div>
          </div>
          <div class="mock-reader-bar" :class="{ pulse: pulsing }">
            <button type="button" class="nav" tabindex="-1">‹</button>
            <p class="sentence">智人之所以能统治地球，是因为他们有虚构故事的能力……</p>
            <button type="button" class="nav" tabindex="-1">›</button>
            <span class="pct">42%</span>
          </div>
          <p class="mock-caption">收到预警时，读书条会短暂高亮提醒</p>
        </div>

        <ul class="reader-points">
          <li v-for="item in points" :key="item.title">
            <strong>{{ item.title }}</strong>
            <span>{{ item.desc }}</span>
          </li>
        </ul>
      </div>

      <div class="reader-hotkeys">
        <h3>键盘翻页</h3>
        <p>先点击读书迷你条获得焦点，再按键翻句（不占用其他窗口快捷键）。</p>
        <dl>
          <div>
            <dt>上一句</dt>
            <dd><kbd>←</kbd> 或 <kbd>A</kbd></dd>
          </div>
          <div>
            <dt>下一句</dt>
            <dd><kbd>→</kbd> 或 <kbd>D</kbd> 或 <kbd>空格</kbd></dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const points = [
  {
    title: '双迷你条并存',
    desc: '预警条负责广播与切屏，读书条负责低调翻页，右键可打开对应 Tab 的主窗口。',
  },
  {
    title: '本地 TXT 书架',
    desc: '导入你合法持有的 TXT（UTF-8 / GBK），进度与设置保存在本机。',
  },
  {
    title: '字号 · 滚速 · 自动滚字',
    desc: '按句分段显示，可调字号与自动滚动间隔，也可手动点按或键盘翻页。',
  },
  {
    title: '预警联动提醒',
    desc: '同事发出预警时，读书条会闪动提示，方便你在阅读时也不漏信号。',
  },
]

const pulsing = ref(false)
let timer: number | undefined

onMounted(() => {
  timer = window.setInterval(() => {
    pulsing.value = true
    window.setTimeout(() => {
      pulsing.value = false
    }, 700)
  }, 4200)
})

onUnmounted(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<style scoped lang="scss">
.reader {
  background:
    linear-gradient(180deg, #f8f4e8 0%, var(--color-bg) 100%);
  border-block: 1px solid var(--color-border);
}

.reader-head {
  margin-bottom: 40px;
}

.reader-demo {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 36px;
  align-items: center;
  margin-bottom: 36px;
}

.reader-mock {
  padding: 20px;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--color-border);
  background:
    radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212, 175, 55, 0.1), transparent 60%),
    var(--color-surface);
}

.mock-tabs {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  margin-bottom: 16px;
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  border: 1px solid var(--color-border);

  .tab {
    padding: 6px 14px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-muted);

    &.active {
      background: var(--color-primary);
      color: #fafafa;
    }
  }
}

.mock-shelf {
  padding: 14px;
  margin-bottom: 16px;
  border-radius: var(--radius-md);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
}

.mock-shelf-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 700;
}

.mock-btn {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: var(--color-accent-muted);
  color: var(--color-text);
}

.mock-book {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-size: 13px;

  .book-title {
    font-weight: 600;
  }

  .book-progress {
    color: var(--color-text-muted);
    white-space: nowrap;
  }
}

.mock-settings {
  margin-top: 10px;
  font-size: 12px;
  color: var(--color-text-subtle);
}

.mock-reader-bar {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: #fafafa;
  box-shadow: var(--shadow-md);
  transition: box-shadow 0.35s ease, transform 0.35s ease;

  &.pulse {
    box-shadow:
      0 0 0 2px rgba(212, 175, 55, 0.55),
      var(--shadow-md);
    transform: translateY(-1px);
  }

  .nav {
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.08);
    color: #fafafa;
    font-size: 16px;
    line-height: 1;
  }

  .sentence {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pct {
    font-size: 11px;
    font-weight: 700;
    color: var(--color-cta);
    white-space: nowrap;
  }
}

.mock-caption {
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--color-text-subtle);
  text-align: center;
}

.reader-points {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px;

  li {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-left: 14px;
    border-left: 3px solid var(--color-cta);
  }

  strong {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  span {
    font-size: 14px;
    line-height: 1.65;
    color: var(--color-text-muted);
  }
}

.reader-hotkeys {
  padding: 20px 22px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-bg);

  h3 {
    margin: 0 0 6px;
    font-size: 16px;
    font-weight: 700;
  }

  > p {
    margin: 0 0 14px;
    font-size: 14px;
    color: var(--color-text-muted);
    line-height: 1.6;
  }

  dl {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 28px;
    margin: 0;
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  dt {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-muted);
  }

  dd {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
  }

  kbd {
    padding: 2px 7px;
    border-radius: 4px;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    font-size: 12px;
    font-family: inherit;
  }
}

@media (max-width: 900px) {
  .reader-demo {
    grid-template-columns: 1fr;
  }
}
</style>
