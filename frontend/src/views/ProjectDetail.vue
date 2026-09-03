<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Loading -->
    <div v-if="loading" class="text-center py-20">
      <div class="inline-block w-8 h-8 border-2 border-[var(--border)] border-t-primary-600 rounded-full animate-spin"></div>
      <p class="mt-4 text-[var(--text-muted)]">加载中...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-[var(--text-muted)]">{{ error }}</p>
      <router-link to="/" class="mt-4 inline-block text-primary-600 hover:underline">
        返回首页
      </router-link>
    </div>

    <template v-else-if="project">
      <!-- Back -->
      <router-link
        to="/"
        class="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] mb-6 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m15 18-6-6 6-6" />
        </svg>
        返回列表
      </router-link>

      <!-- Main Content -->
      <div class="grid lg:grid-cols-5 gap-8">
        <!-- Left: Video & Description -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Video Embed -->
          <div v-if="project.video_url" class="rounded-2xl overflow-hidden border border-[var(--border)] bg-black">
            <div class="video-embed">
              <iframe
                :src="project.video_url"
                title="项目演示视频"
                allowfullscreen
                allow="autoplay; fullscreen"
              />
            </div>
          </div>
          <div
            v-else
            class="aspect-video rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-[var(--border)]"
          >
            <p class="text-[var(--text-muted)]">暂无演示视频</p>
          </div>

          <!-- Description -->
          <div class="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-6">
            <h2 class="text-lg font-bold mb-4">项目介绍</h2>
            <p class="text-sm leading-relaxed text-[var(--text)] whitespace-pre-wrap">
              {{ project.description || '暂无描述' }}
            </p>
          </div>
        </div>

        <!-- Right: Info Sidebar -->
        <div class="lg:col-span-2">
          <div class="sticky top-24 space-y-4">
            <!-- Project Info Card -->
            <div class="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-6">
              <h1 class="text-xl font-bold mb-2">{{ project.title }}</h1>
              <div class="flex items-center gap-2 mb-4">
                <span class="text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full">
                  {{ project.category_name || '未分类' }}
                </span>
                <span v-if="project.is_hot" class="text-xs">🔥 热门</span>
              </div>

              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-6">
                ¥{{ project.price }}
              </div>

              <button
                @click="openModal"
                class="w-full py-3 rounded-full bg-white text-zinc-900 font-semibold hover:bg-gray-100 border border-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                立即获取源码
              </button>

              <p class="text-xs text-[var(--text-muted)] text-center mt-3">
                点击获取百度网盘链接和联系方式
              </p>
            </div>

            <!-- Quick Info -->
            <div class="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-6 space-y-3">
              <div class="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-[var(--text-muted)]">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
                <span class="text-sm">{{ project.category_name || '未分类' }}</span>
              </div>
              <div class="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-[var(--text-muted)]">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span class="text-sm">上架于 {{ formatDate(project.created_at) }}</span>
              </div>
              <div class="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-[var(--text-muted)]">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span class="text-sm">购买后获取百度网盘链接</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>

  <!-- Purchase Modal -->
  <PurchaseModal v-model:visible="modalVisible" :project="project" @close="modalVisible = false" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { projectApi } from '@/api'
import PurchaseModal from '@/components/PurchaseModal.vue'

const route = useRoute()
const project = ref(null)
const loading = ref(true)
const error = ref(null)
const modalVisible = ref(false)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function openModal() {
  modalVisible.value = true
}

async function loadProject() {
  loading.value = true
  error.value = null
  try {
    const res = await projectApi.get(route.params.id)
    project.value = res.data
  } catch (err) {
    if (err.response?.status === 404) {
      error.value = '项目不存在或已下架'
    } else {
      error.value = '加载失败，请稍后重试'
    }
  } finally {
    loading.value = false
  }
}

onMounted(loadProject)
</script>