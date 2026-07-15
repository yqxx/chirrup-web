<template>
  <section class="hero" id="top">
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-grid" />
      <div class="hero-glow" />
    </div>

    <div class="container hero-inner">
      <div class="hero-copy">
        <p class="brand-mark reveal">风紧扯呼</p>
        <h1 class="hero-title reveal reveal-delay-1">局域网实时预警<br />一键切屏保平安</h1>
        <p class="hero-desc reveal reveal-delay-2">
          同事一喊「风紧扯呼」，全员自动切到安全应用。轻量本地，即下即用。
        </p>
        <div class="hero-actions reveal reveal-delay-3">
          <a class="btn btn-primary" href="#download">
            <Download :size="18" />
            免费下载
          </a>
          <a class="btn btn-secondary" href="#download">使用指南</a>
        </div>
        <ul class="hero-meta reveal reveal-delay-3">
          <li>Windows / macOS</li>
          <li>无需账号</li>
          <li>纯局域网 · 不上云</li>
        </ul>
      </div>

      <div class="hero-visual reveal reveal-delay-2">
        <HeroSwitchDemo />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Download } from '@lucide/vue'
import HeroSwitchDemo from '@/components/HeroSwitchDemo.vue'
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  overflow: hidden;
  padding: 72px 0 96px;
  background:
    radial-gradient(ellipse 80% 60% at 70% 20%, rgba(212, 175, 55, 0.14), transparent 55%),
    radial-gradient(ellipse 50% 40% at 10% 80%, rgba(23, 23, 23, 0.04), transparent 50%),
    linear-gradient(180deg, #fafafa 0%, #ffffff 55%, #f8f4e8 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(23, 23, 23, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(23, 23, 23, 0.035) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%);
}

.hero-glow {
  position: absolute;
  top: -10%;
  right: 5%;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.22), transparent 70%);
  filter: blur(20px);
}

.hero-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 48px;
  align-items: center;
}

.brand-mark {
  margin: 0 0 16px;
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--color-text);
}

.hero-title {
  margin: 0 0 18px;
  font-size: clamp(22px, 3.2vw, 32px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.35;
  color: var(--color-secondary);
}

.hero-desc {
  margin: 0 0 28px;
  max-width: 440px;
  font-size: 17px;
  color: var(--color-text-muted);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-subtle);

  li {
    position: relative;

    &:not(:last-child)::after {
      content: '';
      position: absolute;
      right: -12px;
      top: 50%;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: var(--color-border-strong);
      transform: translateY(-50%);
    }
  }
}

.hero-visual {
  position: relative;
  min-width: 0;
}

@media (max-width: 900px) {
  .hero {
    padding: 48px 0 72px;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .hero-visual {
    max-width: 440px;
    margin-inline: auto;
  }
}
</style>
