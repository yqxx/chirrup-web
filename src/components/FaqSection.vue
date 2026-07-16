<template>
  <section class="section faq" id="faq">
    <div class="container">
      <div class="faq-head">
        <span class="section-label">常见问题</span>
        <h2 class="section-title">连不上？先看这几条</h2>
        <p class="section-desc">在线人数一直是 1、预警没反应，多半是局域网没打通。</p>
      </div>

      <div class="faq-list">
        <details class="faq-item">
          <summary>两边都显示「在线 1 人」，互相收不到预警？</summary>
          <div class="faq-a">
            <p>
              本机列表会算上自己，所以 1 人 = 没收到对方的在线广播。UDP 广播（端口
              12345）只在<strong>同一子网</strong>内有效。
            </p>
            <p>
              先对比双方 IP：应大致同网段（如都是 <code>192.168.1.x</code>）。<strong
                >同一 Wi‑Fi 名称不等于同一网段</strong
              >——公司网常按楼层 / AP / 设备类型分 VLAN，可能出现一台
              <code>10.181.27.x</code>、另一台 <code>10.181.49.x</code>。
            </p>
            <p>
              快速自测：两台都连<strong>同一个手机热点</strong>，在线应变为
              2。办公环境可找网管申请同一 VLAN，或换能互通的网络。
            </p>
          </div>
        </details>

        <details class="faq-item">
          <summary>Windows / macOS 防火墙怎么放行？</summary>
          <div class="faq-a">
            <p>
              <strong>Windows（最常见）：</strong>设置 → Windows 安全中心 → 防火墙
              →「允许应用通过防火墙」，勾选「风紧扯呼」的<strong>专用</strong>（必要时也勾公用）。首次弹窗若点过「取消」会一直拦截。
            </p>
            <p>
              <strong>macOS：</strong>系统设置 → 网络 → 防火墙，若已开启，允许「风紧扯呼」传入连接。
            </p>
            <p>两边 UDP 都在「监听中」但人数仍为 1 时，优先查是否跨网段，而不是只盯防火墙。</p>
          </div>
        </details>

        <details class="faq-item">
          <summary>收到预警但不自动切应用？</summary>
          <div class="faq-a">
            <p>
              预警到达后，对方若关闭了「自动切换应用」，只会提示、不会切软件。确认对方已开启自动切换，且目标应用名
              / 路径填写正确（Windows 可用完整路径或进程名；macOS 填应用名，如
              <code>Notes</code>）。
            </p>
          </div>
        </details>

        <details class="faq-item">
          <summary>网络自检里看什么？</summary>
          <div class="faq-a">
            <p>应用内网络自检会显示平台、UDP 是否监听、昵称、在线人数与本机地址。</p>
            <p>
              「在线 1（其他人 0）」+ 双方 IP 第三段 / 网段明显不同 → 跨子网，广播到不了。<br />
              「UDP 未监听」→ 端口被占用或未正常启动，先重启应用。<br />
              两台都先打开主窗口停几秒，再点发送预警（在线心跳由主窗口发出）。
            </p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
  background:
    linear-gradient(180deg, var(--color-surface) 0%, #f8f4e8 100%);
  border-top: 1px solid var(--color-border);
}

.faq-head {
  margin-bottom: 36px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  max-width: 720px;
}

.faq-item {
  border-bottom: 1px solid var(--color-border);

  &:first-child {
    border-top: 1px solid var(--color-border);
  }

  summary {
    list-style: none;
    cursor: pointer;
    padding: 18px 28px 18px 0;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.45;
    position: relative;
    color: var(--color-text);

    &::-webkit-details-marker {
      display: none;
    }

    &::after {
      content: '+';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      font-weight: 500;
      color: var(--color-cta);
      line-height: 1;
    }
  }

  &[open] summary::after {
    content: '−';
  }

  summary:hover {
    color: var(--color-secondary);
  }
}

.faq-a {
  padding: 0 0 20px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-muted);

  p {
    margin: 0 0 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: var(--color-text);
    font-weight: 650;
  }

  code {
    font-size: 12px;
    padding: 1px 6px;
    border-radius: 4px;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    color: var(--color-text);
  }
}
</style>
