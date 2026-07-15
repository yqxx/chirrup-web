<template>
  <section class="section how" id="how">
    <div class="container">
      <div class="how-head">
        <span class="section-label">使用</span>
        <h2 class="section-title">三步上手</h2>
        <p class="section-desc">装上、设好目标应用，同事一喊就能切屏。</p>
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
    desc: '选择 Windows 安装包 / 便携版，或 macOS DMG。未签名包首次运行按引导放行即可。',
  },
  {
    title: '设置昵称与目标应用',
    desc: '从已打开应用中选择「收到预警时切换」的目标，并挑一个职场代号。',
  },
  {
    title: '同一局域网，一键预警',
    desc: '全员连同一 Wi‑Fi，点「风紧扯呼」或迷你条，其他人自动切屏。',
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
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
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

@media (max-width: 768px) {
  .steps {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
