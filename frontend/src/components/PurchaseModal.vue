<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      @click.self="$emit('close')"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        class="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden animate-in"
      >
        <!-- Header -->
        <div class="p-6 pb-0">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold">获取源码</h3>
            <button
              class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              @click="$emit('close')"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-4">
          <!-- Project name -->
          <div class="text-center">
            <p class="text-sm text-[var(--text-muted)] mb-1">项目：</p>
            <p class="font-semibold">{{ project?.title }}</p>
          </div>

          <!-- Price badge -->
          <div class="text-center py-2">
            <span class="inline-block text-2xl font-bold text-primary-600 dark:text-primary-400">
              ¥{{ project?.price }}
            </span>
          </div>

          <div class="border-t border-[var(--border)] pt-4 space-y-3">
            <!-- Baidu Netdisk link -->
            <div class="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4">
              <div class="flex items-center gap-2 mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span class="text-sm font-medium">百度网盘链接</span>
              </div>
              <div class="flex items-center gap-2">
                <input
                  :value="project?.pan_link"
                  readonly
                  class="flex-1 text-xs bg-white dark:bg-zinc-800 border border-[var(--border)] rounded-lg px-3 py-2 truncate"
                />
                <button
                  class="shrink-0 text-xs font-medium px-3 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                  @click="copyLink"
                >
                  {{ copied ? '已复制' : '复制' }}
                </button>
              </div>
            </div>

            <!-- Contact info with business card -->
            <div class="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4">
              <div class="flex items-center gap-2 mb-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span class="text-sm font-medium">联系我获取更多</span>
              </div>
              <!-- Business Card - clickable to enlarge -->
              <div
                class="rounded-xl overflow-hidden border border-[var(--border)] cursor-pointer hover:opacity-90 transition-opacity mb-3"
                @click="showCardModal = true"
              >
                <img
                  src="/images/个人名片.png"
                  alt="个人名片"
                  class="w-full h-auto object-contain"
                />
              </div>
              <p class="text-sm font-medium text-primary-600 dark:text-primary-400">
                {{ project?.contact_info || '添加微信获取支持' }}
              </p>
              <p class="text-xs text-[var(--text-muted)] mt-1">
                加微信备注"及时雨源码"通过更快
              </p>
            </div>

            <!-- Card Enlarge Modal -->
            <Teleport to="body">
              <div
                v-if="showCardModal"
                class="fixed inset-0 z-[200] flex items-center justify-center p-4"
                @click.self="showCardModal = false"
              >
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showCardModal = false" />
                <div class="relative max-w-2xl w-full animate-in">
                  <button
                    class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors z-10 shadow-lg"
                    @click="showCardModal = false"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                  <img
                    src="/images/个人名片.png"
                    alt="个人名片"
                    class="w-full h-auto rounded-2xl shadow-2xl"
                    @click="showCardModal = false"
                  />
                </div>
              </div>
            </Teleport>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 pt-0">
          <button
            class="w-full py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
            @click="$emit('close')"
          >
            了解详情
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  project: Object,
})

const emit = defineEmits(['close'])
const copied = ref(false)
const showCardModal = ref(false)

async function copyLink() {
  if (!props.project?.pan_link) return
  try {
    await navigator.clipboard.writeText(props.project.pan_link)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    const input = document.createElement('input')
    input.value = props.project.pan_link
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}

watch(() => props.visible, (val) => {
  if (val) copied.value = false
})
</script>

<style scoped>
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-in {
  animation: slide-up 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>