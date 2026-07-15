<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <img :src="iconUrl" alt="" width="24" height="24" />
        <div>
          <strong>风紧扯呼</strong>
          <span>局域网实时预警 · 一键切屏</span>
        </div>
      </div>

      <div class="footer-links">
        <a href="#features">功能</a>
        <a href="#how">使用</a>
        <a href="#download">下载</a>
      </div>

      <p class="footer-copy">© {{ year }} 风紧扯呼 · Chirrup</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { publicUrl } from '@/config/site'

const iconUrl = publicUrl('icon.svg')
const year = new Date().getFullYear()
</script>

<style scoped lang="scss">
.site-footer {
  padding: 48px 0 40px;
  background: var(--color-primary);
  color: #fafafa;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;

  strong {
    display: block;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  span {
    display: block;
    font-size: 13px;
    color: #a3a3a3;
  }
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;

  a {
    font-size: 14px;
    color: #a3a3a3;
    transition: color var(--transition);

    &:hover {
      color: var(--color-cta);
    }
  }
}

.footer-copy {
  margin: 0;
  padding-top: 20px;
  border-top: 1px solid #262626;
  font-size: 13px;
  color: #737373;
}
</style>
