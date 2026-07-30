<template>
  <section class="section faq" id="faq">
    <div class="container">
      <div class="faq-head">
        <span class="section-label">常见问题</span>
        <h2 class="section-title">连不上？不放心？先看这几条</h2>
        <p class="section-desc">安装拦截、在线 1 人、预警没反应——多数能在下面找到原因。</p>
      </div>

      <div class="faq-list">
        <details class="faq-item">
          <summary>为什么下载、安装要多几步？安全吗？</summary>
          <div class="faq-a">
            <p>
              当前安装包<strong>未做代码签名 / Apple 公证</strong>（个人开发者证书与公证成本较高），Windows
              SmartScreen、浏览器「保留」、macOS「无法验证 / 已损坏」都是系统对<strong>未签名软件</strong>的常规拦截，不是文件损坏，也不代表被病毒感染。
            </p>
            <p>
              <strong>安全方面：</strong>预警只在局域网内用 UDP
              广播，不经过我们的服务器；配置与历史留在本机，不收集账号、不上传聊天内容。安装包托管在官网指向的
              Gitee Releases，请勿从不明镜像下载。
            </p>
            <p>
              放行时请按页面「下载与安装」示意操作即可。后续若提供签名版本，可直接替换安装，无需改你的配置。
            </p>
          </div>
        </details>

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
            <p>若在线人数仍为 1，优先查是否跨网段，而不是只盯防火墙。</p>
          </div>
        </details>

        <details class="faq-item">
          <summary>收到预警但不自动切应用？</summary>
          <div class="faq-a">
            <p>
              预警到达后，对方若关闭了「自动切换应用」，只会提示、不会切软件。确认对方已开启自动切换，且目标应用填写正确（Windows
              填进程名，如 <code>notepad.exe</code>；macOS 填应用名，如 <code>Notes</code>）。
            </p>
          </div>
        </details>

        <details class="faq-item">
          <summary>如何查看本机 IP 和在线人数？</summary>
          <div class="faq-a">
            <p>
              主界面<strong>底部与版本号同一行</strong>会显示本机内网 IP；顶部有「在线 · N
              人」。排查互通时可对比双方 IP 是否同网段。
            </p>
            <p>
              若一直显示在线 1 人，参见上文「跨子网」说明。两台都先打开主窗口停几秒，再点发送预警（在线心跳由主窗口发出）。
            </p>
          </div>
        </details>

        <details class="faq-item">
          <summary>读书迷你条怎么用？能在线找书吗？</summary>
          <div class="faq-a">
            <p>
              主窗口切到「读书」Tab → 导入你<strong>合法持有</strong>的 TXT（支持 UTF-8 / GBK）→ 点「读书迷你条」打开悬浮条。按句显示，可调字号、滚速与自动滚字；键盘
              <kbd>←</kbd>/<kbd>A</kbd> 上一句，<kbd>→</kbd>/<kbd>D</kbd>/<kbd>空格</kbd> 下一句。
            </p>
            <p>
              应用<strong>不提供在线书源</strong>，书架与阅读进度都在本机。读书条可与预警迷你条同时驻留；收到预警时会闪动提醒。
            </p>
          </div>
        </details>

        <details class="faq-item">
          <summary>行情迷你条怎么用？数据准吗？</summary>
          <div class="faq-a">
            <p>
              主窗口切到「行情」Tab → 录入 A 股 6 位代码加入自选 → 点「行情迷你条」打开悬浮条。支持手动/自动刷新，非交易时段会降频但仍显示最近价格。
            </p>
            <p>
              数据来自腾讯/新浪公开接口，<strong>仅供参考，不构成投资建议</strong>。键盘
              <kbd>←</kbd>/<kbd>A</kbd>、<kbd>→</kbd>/<kbd>D</kbd>/<kbd>空格</kbd> 切换标的，<kbd>Q</kbd> 隐藏迷你条。
            </p>
          </div>
        </details>

        <details class="faq-item">
          <summary>有问题如何联系？</summary>
          <div class="faq-a">
            <p>
              发邮件至
              <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a
              >，请说明操作系统版本、现象描述，并尽量附上报错截图。
            </p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CONTACT_EMAIL } from '@/config/site'
</script>

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

  kbd {
    font-size: 12px;
    padding: 1px 6px;
    border-radius: 4px;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    font-family: inherit;
  }

  a {
    color: var(--color-text);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: var(--color-cta-hover);
    }
  }
}
</style>
