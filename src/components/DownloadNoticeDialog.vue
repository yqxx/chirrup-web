<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="notice-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-notice-title"
      @keydown.esc.prevent="emit('close')"
    >
      <button type="button" class="notice-backdrop" aria-label="关闭" @click="emit('close')" />
      <div class="notice-panel" ref="panelEl">
        <h3 id="download-notice-title">下载须知</h3>
        <p class="lead">
          安装包暂未代码签名，浏览器可能会拦截。请按下面步骤操作：
        </p>

        <ol class="notice-steps">
          <li>
            <strong>浏览器提示「通常不会下载」时</strong>
            <span>在下载项右侧点 <em>⋯</em> → <em>保留</em>；若再弹出确认，点删除旁的箭头 → <em>仍然保留</em>。</span>
          </li>
          <li>
            <strong>打开文件时出现 SmartScreen</strong>
            <span>点 <em>更多信息</em> → <em>仍要运行</em>。</span>
          </li>
        </ol>

        <div class="notice-actions">
          <button type="button" class="btn btn-secondary" @click="emit('close')">取消</button>
          <a
            class="btn btn-primary"
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            @click="emit('confirm')"
          >
            <Download :size="16" />
            继续下载
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
import { Download } from '@lucide/vue'

const props = defineProps<{
  open: boolean
  url: string
}>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()

const panelEl = ref<HTMLElement | null>(null)

watch(
  () => props.open,
  async (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) {
      await nextTick()
      panelEl.value?.querySelector<HTMLElement>('a, button')?.focus()
    }
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped lang="scss">
.notice-root {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.notice-backdrop {
  position: absolute;
  inset: 0;
  border: none;
  background: rgba(23, 23, 23, 0.48);
  cursor: pointer;
}

.notice-panel {
  position: relative;
  width: min(100%, 440px);
  padding: 24px;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--color-border);
  background: var(--color-bg);
  box-shadow: var(--shadow-lg);

  h3 {
    margin: 0 0 8px;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.03em;
  }
}

.lead {
  margin: 0 0 18px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.notice-steps {
  margin: 0 0 24px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;

  li {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 14px;
    border-radius: var(--radius-md);
    background: var(--color-accent-muted);
    border: 1px solid rgba(212, 175, 55, 0.28);
  }

  strong {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text);
  }

  span {
    font-size: 13px;
    line-height: 1.6;
    color: var(--color-text-muted);
  }

  em {
    font-style: normal;
    font-weight: 700;
    color: var(--color-text);
  }
}

.notice-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
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
</style>
