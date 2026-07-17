<template>
  <section class="section how" id="how">
    <div class="container">
      <div class="how-head">
        <span class="section-label">使用</span>
        <h2 class="section-title">四步上手</h2>
        <p class="section-desc">主窗口分「预警 / 读书」两个 Tab，按需配置即可。</p>
      </div>

      <ol class="steps">
        <li v-for="(step, index) in steps" :key="step.title">
          <span class="step-num">{{ String(index + 1).padStart(2, '0') }}</span>
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    title: '下载并安装',
    desc: 'Windows 下载便携 exe（需 WebView2）；macOS 下载 DMG。首次运行按引导放行即可。',
  },
  {
    title: '预警 Tab：昵称与目标应用',
    desc: '设置职场代号、目标应用与颜色；可开预警迷你条，一键广播给同网段队友。',
  },
  {
    title: '读书 Tab：导入 TXT',
    desc: '导入本地 TXT 到书架，调字号与滚速，打开读书迷你条按句阅读；←A / →D空格 翻页。',
  },
  {
    title: '同一子网，协同使用',
    desc: '预警与读书可同时进行：收到预警时读书条会闪动提醒，队友则自动切屏（若已开启）。',
  },
]
</script>

<style scoped lang="scss">
.how {
  background:
    linear-gradient(180deg, var(--color-surface) 0%, #f8f4e8 100%);
  border-block: 1px solid var(--color-border);
}

.how-head {
  margin-bottom: 48px;
}

.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: none;

  li {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  h3 {
    margin: 0 0 8px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
    font-size: 15px;
    color: var(--color-text-muted);
    line-height: 1.65;
  }
}

.step-num {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--color-cta);
  line-height: 1;
}

@media (max-width: 1024px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .steps {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
