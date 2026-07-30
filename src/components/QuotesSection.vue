<template>
  <section class="section quotes" id="quotes">
    <div class="container quotes-inner">
      <div class="quotes-copy">
        <span class="section-label">行情迷你条</span>
        <h2 class="section-title">A 股自选，悬浮低调盯盘</h2>
        <p class="section-desc">
          主窗口「行情」Tab 录入 6 位代码，打开迷你条轮播展示。行情仅供参考，不构成投资建议；可与预警/读书迷你条并存。
        </p>
        <ul class="quotes-notes">
          <li>自动/手动刷新（15s / 30s / 60s），非交易时段降频仍显示最近价</li>
          <li>A 股红涨绿跌；<kbd>←</kbd><kbd>A</kbd> 上一只，<kbd>→</kbd><kbd>D</kbd><kbd>空格</kbd> 下一只，<kbd>Q</kbd> 隐藏</li>
          <li>可调透明度、吸取背景/文字色伪装，支持日志皮肤</li>
        </ul>
      </div>

      <div class="quotes-bar-mock" aria-hidden="true">
        <button type="button" class="nav" tabindex="-1">‹</button>
        <p class="quote-line">
          <span class="code">600519</span>
          <span class="name">贵州茅台</span>
          <span class="price">1688.00</span>
          <span class="change up">+1.23%</span>
        </p>
        <button type="button" class="nav" tabindex="-1">›</button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.quotes {
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.quotes-inner {
  display: grid;
  grid-template-columns: 1fr min(100%, 440px);
  gap: 32px 40px;
  align-items: center;
}

.quotes-copy {
  .section-desc {
    max-width: 36em;
  }
}

.quotes-notes {
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
    background: var(--color-surface);
    font-size: 12px;
    font-family: inherit;
  }
}

.quotes-bar-mock {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--color-border);
  background: #f4f4f5;
  color: #171717;
  box-shadow: var(--shadow-sm);
  font-size: 13px;

  .nav {
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.05);
    color: inherit;
    font-size: 16px;
    line-height: 1;
  }

  .quote-line {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    font-variant-numeric: tabular-nums;
  }

  .code {
    opacity: 0.72;
    flex-shrink: 0;
  }

  .name {
    flex-shrink: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
  }

  .price {
    flex-shrink: 0;
    font-weight: 700;
  }

  .change {
    flex-shrink: 0;
    font-weight: 700;

    &.up {
      color: #dc2626;
    }

    &.down {
      color: #16a34a;
    }
  }
}

@media (max-width: 768px) {
  .quotes-inner {
    grid-template-columns: 1fr;
  }
}
</style>
