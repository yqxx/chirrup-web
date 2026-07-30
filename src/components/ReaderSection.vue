<template>
  <section class="section reader" id="reader">
    <div class="container reader-inner">
      <div class="reader-copy">
        <span class="section-label">读书迷你条</span>
        <h2 class="section-title">本地 TXT，悬浮按句读</h2>
        <p class="section-desc">
          主窗口「读书」Tab 导入 TXT，打开迷你条低调翻阅。不提供在线书源；可与预警/行情迷你条并存。
        </p>
        <ul class="reader-notes">
          <li>UTF-8 / GBK，进度与字号保存在本机</li>
          <li>支持自动滚字；<kbd>←</kbd><kbd>A</kbd> 上一句，<kbd>→</kbd><kbd>D</kbd><kbd>空格</kbd> 下一句</li>
        </ul>
      </div>

      <div class="reader-bar-mock" aria-hidden="true">
        <button type="button" class="nav" tabindex="-1">‹</button>
        <p class="sentence">智人之所以能统治地球，是因为他们有虚构故事的能力……</p>
        <button type="button" class="nav" tabindex="-1">›</button>
        <span class="pct">42%</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.reader {
  background:
    linear-gradient(180deg, #f8f4e8 0%, var(--color-bg) 100%);
  border-block: 1px solid var(--color-border);
}

.reader-inner {
  display: grid;
  grid-template-columns: 1fr min(100%, 420px);
  gap: 32px 40px;
  align-items: center;
}

.reader-copy {
  .section-desc {
    max-width: 36em;
  }
}

.reader-notes {
  margin: 16px 0 0;
  padding-left: 1.2em;
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-muted);

  li + li {
    margin-top: 6px;
  }

  kbd {
    margin: 0 2px;
    padding: 1px 5px;
    border-radius: 4px;
    border: 1px solid var(--color-border);
    background: var(--color-bg);
    font-size: 12px;
    font-family: inherit;
  }
}

.reader-bar-mock {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: #fafafa;
  box-shadow: var(--shadow-md);

  .nav {
    width: 26px;
    height: 26px;
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

@media (max-width: 768px) {
  .reader-inner {
    grid-template-columns: 1fr;
  }
}
</style>
