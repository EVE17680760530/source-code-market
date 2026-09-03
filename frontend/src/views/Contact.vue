<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Page Header -->
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold mb-3">联系我</h1>
      <p class="text-[var(--text-muted)] max-w-md mx-auto">
        有任何需求或疑问，欢迎随时联系，我会在第一时间回复
      </p>
    </div>

    <div class="grid md:grid-cols-5 gap-8">
      <!-- Left: Business Card -->
      <div class="md:col-span-3">
        <div class="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-6">
          <h2 class="text-lg font-bold mb-4">个人名片</h2>
          <div class="rounded-xl overflow-hidden border border-[var(--border)]">
            <img
              src="/images/个人名片.png"
              alt="个人名片"
              class="w-full h-auto object-contain cursor-pointer hover:opacity-95 transition-opacity"
              @click="showCardModal = true"
            />
          </div>
          <p class="text-xs text-[var(--text-muted)] mt-3 text-center">
            点击图片放大查看 · 扫码或搜索微信即可联系
          </p>
        </div>
      </div>

      <!-- Right: Service Flow -->
      <div class="md:col-span-2">
        <div class="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-6">
          <h2 class="text-lg font-bold mb-4">服务内容</h2>
          <p class="text-sm text-[var(--text-muted)] mb-6">
            提供网站搭建、源码定制、文档排版等开发服务，从需求到交付全程跟进。
          </p>

          <!-- Flow Steps -->
          <div class="space-y-0">
            <div
              v-for="(step, idx) in steps"
              :key="idx"
              class="relative flex gap-4 pb-8 last:pb-0"
            >
              <!-- Step connector -->
              <div class="flex flex-col items-center">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  :class="step.color"
                >
                  {{ idx + 1 }}
                </div>
                <div
                  v-if="idx < steps.length - 1"
                  class="w-0.5 flex-1 mt-1 bg-[var(--border)]"
                ></div>
              </div>
              <!-- Step content -->
              <div class="pt-1">
                <h3 class="text-sm font-semibold mb-1">{{ step.title }}</h3>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact CTA -->
        <div class="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-6 mt-4">
          <h3 class="text-sm font-bold mb-2">立即咨询</h3>
          <p class="text-xs text-[var(--text-muted)] mb-4">
            添加微信时备注「及时雨源码」通过更快
          </p>
          <a
            :href="'https://weixin.qq.com'"
            target="_blank"
            class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            扫码添加微信
          </a>
        </div>
      </div>
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
</template>

<script setup>
import { ref } from 'vue'

const showCardModal = ref(false)

const steps = [
  {
    title: '咨询项目要求',
    desc: '沟通您的具体需求、项目类型、功能要求和技术偏好，我会给出专业建议。',
    color: 'bg-primary-600 text-white',
  },
  {
    title: '确定价格',
    desc: '根据项目复杂度、工期要求和技术难度，提供合理的报价方案。',
    color: 'bg-primary-500 text-white',
  },
  {
    title: '设计',
    desc: '出设计稿或原型图，确认后再进入开发阶段，确保符合预期。',
    color: 'bg-primary-500 text-white',
  },
  {
    title: '交付（期限内）',
    desc: '按约定时间交付完整项目，包含源码、说明文档和使用教程。',
    color: 'bg-primary-500 text-white',
  },
  {
    title: '售后',
    desc: '交付后提供技术支持和问题解答，确保项目顺利运行。',
    color: 'bg-primary-500 text-white',
  },
]
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