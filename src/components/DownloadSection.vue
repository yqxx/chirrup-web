<template>
  <section class="section download" id="download">
    <div class="container">
      <div class="download-head">
        <span class="section-label">下载</span>
        <h2 class="section-title">获取风紧扯呼</h2>
        <p class="section-desc">当前版本 {{ APP_VERSION }}。安装包托管于 Gitee，国内可直接下载。</p>
      </div>

      <div class="download-grid">
        <article class="download-card">
          <div class="card-top">
            <Monitor :size="28" stroke-width="1.75" />
            <div>
              <h3>Windows</h3>
              <p>{{ downloads.windows.hint }}</p>
            </div>
          </div>
          <div class="card-actions">
            <a
              class="btn btn-primary"
              :href="downloads.windows.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download :size="16" />
              {{ downloads.windows.label }}
            </a>
          </div>
        </article>

        <article class="download-card">
          <div class="card-top">
            <Apple :size="28" stroke-width="1.75" />
            <div>
              <h3>macOS</h3>
              <p>{{ downloads.macos.hint }}</p>
            </div>
          </div>
          <div class="card-actions">
            <a
              class="btn btn-primary"
              :href="downloads.macos.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download :size="16" />
              {{ downloads.macos.label }}
            </a>
          </div>
        </article>
      </div>

      <div class="download-note">
        <Info :size="18" />
        <p>
          安装包暂未代码签名。Windows 可能出现 SmartScreen，点击「更多信息 → 仍要运行」；macOS
          首次打开请见下方
          <a href="#guide">使用指南</a>。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Apple, Download, Info, Monitor } from '@lucide/vue'
import { APP_VERSION, downloads } from '@/config/downloads'
</script>

<style scoped lang="scss">
.download {
  background: var(--color-bg);
}

.download-head {
  margin-bottom: 40px;
}

.download-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

.download-card {
  padding: 28px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  transition:
    border-color var(--transition),
    box-shadow var(--transition);

  &:hover {
    border-color: var(--color-cta);
    box-shadow: var(--shadow-md);
  }
}

.card-top {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  color: var(--color-text);

  h3 {
    margin: 0 0 4px;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: var(--color-text-muted);
  }
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
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

.download-note {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px 18px;
  border-radius: var(--radius-md);
  background: var(--color-accent-muted);
  border: 1px solid rgba(212, 175, 55, 0.28);
  color: var(--color-text-muted);
  font-size: 14px;

  p {
    margin: 0;
    line-height: 1.6;
  }

  a {
    color: var(--color-text);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  :deep(svg) {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--color-cta);
  }
}

@media (max-width: 640px) {
  .download-grid {
    grid-template-columns: 1fr;
  }
}
</style>
