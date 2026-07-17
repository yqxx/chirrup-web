<template>
  <section class="section features" id="features">
    <div class="container">
      <div class="features-head">
        <span class="section-label">功能</span>
        <h2 class="section-title">预警 + 阅读，一个应用搞定</h2>
        <p class="section-desc">轻量、本地、即时响应——不依赖云端，不收集数据。</p>
      </div>

      <div class="feature-grid">
        <article v-for="item in features" :key="item.title" class="feature-item">
          <div class="feature-icon">
            <component :is="item.icon" :size="22" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { AppWindow, BookOpen, HardDrive, Layers, Radio, Shield } from '@lucide/vue'

const features = [
  {
    icon: Radio,
    title: '局域网 UDP 广播',
    desc: '同一子网内即时预警，端口 12345，无需服务器。',
  },
  {
    icon: AppWindow,
    title: '自动切换应用',
    desc: '按本机预设，预警后切到目标应用；也可只收提醒不切屏。',
  },
  {
    icon: Layers,
    title: '双迷你条模式',
    desc: '预警条与读书条可同时驻留桌面，互不占用、右键各开对应 Tab。',
  },
  {
    icon: BookOpen,
    title: '本地 TXT 书架',
    desc: '导入合法持有的 TXT，按句阅读、记进度，字号与自动滚字可调。',
  },
  {
    icon: HardDrive,
    title: '极致轻量',
    desc: '便携包约 5–15MB，下载即用，不占空间。',
  },
  {
    icon: Shield,
    title: '数据不上云',
    desc: '预警配置、书架与阅读进度均保存在本机，隐私安心。',
  },
]
</script>

<style scoped lang="scss">
.features {
  background: var(--color-bg);
}

.features-head {
  margin-bottom: 48px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px 32px;
}

.feature-item {
  padding: 8px 0;

  h3 {
    margin: 0 0 8px;
    font-size: 17px;
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

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-bottom: 16px;
  border-radius: var(--radius-md);
  background: var(--color-accent-muted);
  color: var(--color-cta);
}

@media (max-width: 900px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
