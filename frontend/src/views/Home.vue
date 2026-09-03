<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section with Artistic Typography -->
    <section class="mb-12 pt-8">
      <div class="text-center">
        <!-- Animated headline line 1 -->
        <h1 class="hero-line">
          <span class="hero-word hero-word-1">精选</span>
          <span class="hero-word hero-word-2 text-primary-600 dark:text-primary-400">优质</span>
          <span class="hero-word hero-word-3">源码</span>
        </h1>
        <!-- Animated headline line 2 with gradient -->
        <h2 class="hero-line hero-line-2 mt-2">
          <span class="hero-word hero-word-4 bg-gradient-to-r from-primary-500 via-purple-500 to-primary-600 bg-clip-text text-transparent">
            一站直达
          </span>
          <span class="hero-word hero-word-5">，</span>
          <span class="hero-word hero-word-6">开启</span>
          <span class="hero-word hero-word-7 text-primary-600 dark:text-primary-400">创作</span>
        </h2>
        <!-- Animated subtitle -->
        <p class="hero-sub mt-6 max-w-lg mx-auto text-[var(--text-muted)] text-base leading-relaxed">
          及时雨源码，汇聚各类精品项目源代码
          <br class="sm:hidden" />
          学生作业、创业项目、学习案例应有尽有
        </p>
        <!-- Decorative separator -->
        <div class="hero-divider mt-8 flex items-center justify-center gap-3">
          <span class="block w-8 h-px bg-primary-400/50"></span>
          <span class="text-xs tracking-[0.2em] text-[var(--text-muted)]">CODE IS POETRY</span>
          <span class="block w-8 h-px bg-primary-400/50"></span>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="mb-8">
      <div class="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-4 sm:p-6">
        <!-- Search -->
        <div class="mb-4">
          <div class="relative">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="搜索项目标题或描述..."
              class="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>
        </div>

        <!-- Categories & Price Filter -->
        <div class="flex flex-wrap gap-2">
          <button
            :class="selectedCategory === null ? 'bg-primary-600 text-white' : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:border-primary-400'"
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            @click="selectedCategory = null; loadProjects()"
          >
            全部
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            :class="selectedCategory === cat.id ? 'bg-primary-600 text-white' : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:border-primary-400'"
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            @click="selectedCategory = cat.id; loadProjects()"
          >
            {{ cat.name }}
          </button>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-4">
          <span class="text-sm text-[var(--text-muted)]">价格范围：</span>
          <div class="flex items-center gap-2 flex-wrap">
            <button
              :class="priceRange === null ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'bg-transparent text-[var(--text-muted)]'"
              class="px-3 py-1 border border-[var(--border)] rounded-full text-xs font-medium hover:border-primary-400 transition-colors"
              @click="priceRange = null; loadProjects()"
            >
              全部
            </button>
            <button
              :class="priceRange === '0-50' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'bg-transparent text-[var(--text-muted)]'"
              class="px-3 py-1 border border-[var(--border)] rounded-full text-xs font-medium hover:border-primary-400 transition-colors"
              @click="priceRange = '0-50'; loadProjects()"
            >
              50元以下
            </button>
            <button
              :class="priceRange === '50-100' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'bg-transparent text-[var(--text-muted)]'"
              class="px-3 py-1 border border-[var(--border)] rounded-full text-xs font-medium hover:border-primary-400 transition-colors"
              @click="priceRange = '50-100'; loadProjects()"
            >
              50-100元
            </button>
            <button
              :class="priceRange === '100+' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'bg-transparent text-[var(--text-muted)]'"
              class="px-3 py-1 border border-[var(--border)] rounded-full text-xs font-medium hover:border-primary-400 transition-colors"
              @click="priceRange = '100+'; loadProjects()"
            >
              100元以上
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-20">
      <div class="inline-block w-8 h-8 border-2 border-[var(--border)] border-t-primary-600 rounded-full animate-spin"></div>
      <p class="mt-4 text-[var(--text-muted)]">加载中...</p>
    </div>

    <!-- Projects Grid (Masonry/Pinterest style) -->
    <div v-else class="masonry-grid">
      <div v-for="(project, idx) in projects" :key="project.id" class="masonry-item" :style="{ animationDelay: `${idx * 0.06}s` }">
        <ProjectCard :project="project" @buy="openModal(project)" />
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!loading && projects.length === 0"
      class="text-center py-20 border border-[var(--border)] rounded-2xl bg-[var(--surface-elevated)]"
    >
      <svg
        class="mx-auto w-12 h-12 text-[var(--text-muted)] mb-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
      <p class="text-[var(--text-muted)]">暂无符合条件的项目</p>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && totalPages > 1" class="text-center mt-10 mb-16">
      <div class="inline-flex items-center gap-1">
        <button
          :disabled="page <= 1"
          class="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] disabled:opacity-30 hover:bg-[var(--surface-elevated)] transition-colors disabled:cursor-not-allowed"
          @click="goToPage(1)"
        >
          «
        </button>
        <button
          :disabled="page <= 1"
          class="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] disabled:opacity-30 hover:bg-[var(--surface-elevated)] transition-colors disabled:cursor-not-allowed"
          @click="goToPage(page - 1)"
        >
          ‹
        </button>
        <template v-for="p in paginationPages" :key="p">
          <span v-if="p === -1" class="px-3 py-1 text-xs text-[var(--text-muted)]">...</span>
          <button
            :class="p === page
              ? 'px-3 py-1.5 text-xs rounded-lg bg-primary-600 text-white border border-primary-600'
              : 'px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] hover:bg-[var(--surface-elevated)] transition-colors'"
            @click="goToPage(p)"
          >
            {{ p }}
          </button>
        </template>
        <button
          :disabled="page >= totalPages"
          class="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] disabled:opacity-30 hover:bg-[var(--surface-elevated)] transition-colors disabled:cursor-not-allowed"
          @click="goToPage(page + 1)"
        >
          ›
        </button>
        <button
          :disabled="page >= totalPages"
          class="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] disabled:opacity-30 hover:bg-[var(--surface-elevated)] transition-colors disabled:cursor-not-allowed"
          @click="goToPage(totalPages)"
        >
          »
        </button>
      </div>
      <div class="text-xs text-[var(--text-muted)] mt-3">
        共 {{ total }} 个项目，第 {{ page }}/{{ totalPages }} 页
      </div>
    </div>
  </div>

  <!-- Pinterest-style Footer -->
  <footer class="w-full bg-zinc-900 text-zinc-300 mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-10">
        <!-- Brand -->
        <div class="flex-shrink-0">
          <div class="flex items-center gap-3 mb-2">
            <img
              src="/images/TR及时雨.png"
              alt="及时雨源码"
              class="h-8 w-8 rounded-lg object-cover"
            />
            <span class="text-lg font-bold text-white tracking-tight" style="font-family: 'Times New Roman', serif;">
              及时雨源码
            </span>
          </div>
          <p class="text-sm text-zinc-400 mt-2 max-w-xs">
            汇聚精品项目源代码，学生作业、创业项目、学习案例应有尽有。
          </p>
        </div>

        <!-- Link Columns -->
        <div class="flex gap-12 md:gap-16">
          <div>
            <h4 class="text-sm font-semibold text-white mb-4">关于我们</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-sm text-zinc-400 hover:text-white transition-colors">关于及时雨</a></li>
              <li><a href="#" class="text-sm text-zinc-400 hover:text-white transition-colors">常见问题</a></li>
              <li><a href="#" class="text-sm text-zinc-400 hover:text-white transition-colors">合作联系</a></li>
              <li><a href="#" class="text-sm text-zinc-400 hover:text-white transition-colors">加入我们</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-white mb-4">更多</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-sm text-zinc-400 hover:text-white transition-colors">帮助中心</a></li>
              <li><a href="#" class="text-sm text-zinc-400 hover:text-white transition-colors">创作者</a></li>
              <li><a href="#" class="text-sm text-zinc-400 hover:text-white transition-colors">开发文档</a></li>
              <li><a href="#" class="text-sm text-zinc-400 hover:text-white transition-colors">更新日志</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-zinc-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
          <span>©2025 及时雨源码</span>
          <a href="#" class="hover:text-zinc-300 transition-colors">服务条款</a>
          <a href="#" class="hover:text-zinc-300 transition-colors">版权声明</a>
          <a href="#" class="hover:text-zinc-300 transition-colors">隐私政策</a>
          <a href="#" class="hover:text-zinc-300 transition-colors">Cookie政策</a>
        </div>
        <div class="flex items-center gap-2 text-xs text-zinc-500">
          <span>关注我们</span>
          <span class="w-1 h-1 rounded-full bg-zinc-600"></span>
          <span class="hover:text-zinc-300 transition-colors cursor-pointer">微信</span>
          <span class="w-1 h-1 rounded-full bg-zinc-600"></span>
          <span class="hover:text-zinc-300 transition-colors cursor-pointer">QQ</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- Purchase Modal -->
  <PurchaseModal v-model:visible="modalVisible" :project="selectedProject" @close="modalVisible = false" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { projectApi, categoryApi } from '@/api'
import ProjectCard from '@/components/ProjectCard.vue'
import PurchaseModal from '@/components/PurchaseModal.vue'

const categories = ref([])
const projects = ref([])
const loading = ref(true)
const page = ref(1)
const totalPages = ref(0)
const total = ref(0)

const searchQuery = ref('')
const selectedCategory = ref(null)
const priceRange = ref(null)
const modalVisible = ref(false)
const selectedProject = ref(null)

function parsePriceRange() {
  if (!priceRange.value) return [null, null]
  if (priceRange.value === '0-50') return [0, 50]
  if (priceRange.value === '50-100') return [50, 100]
  if (priceRange.value === '100+') return [100, null]
  return [null, null]
}

const PAGE_SIZE = 8

function getPaginationPages(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages = []
  if (current <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i)
    pages.push(-1)
    pages.push(total)
  } else if (current >= total - 3) {
    pages.push(1)
    pages.push(-1)
    for (let i = total - 4; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    pages.push(-1)
    pages.push(current - 1)
    pages.push(current)
    pages.push(current + 1)
    pages.push(-1)
    pages.push(total)
  }
  return pages
}

const paginationPages = computed(() => getPaginationPages(page.value, totalPages.value))

async function loadProjects() {
  loading.value = true
  page.value = 1
  const [min, max] = parsePriceRange()
  try {
    const res = await projectApi.list({
      page: page.value,
      page_size: PAGE_SIZE,
      category_id: selectedCategory.value,
      price_min: min,
      price_max: max,
      search: searchQuery.value || null,
    })
    projects.value = res.data.items
    total.value = res.data.total
    totalPages.value = Math.ceil(total.value / PAGE_SIZE)
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

function goToPage(p) {
  if (p < 1 || p > totalPages.value || p === page.value) return
  page.value = p
  loadCurrentPage()
}

async function loadCurrentPage() {
  loading.value = true
  const [min, max] = parsePriceRange()
  try {
    const res = await projectApi.list({
      page: page.value,
      page_size: PAGE_SIZE,
      category_id: selectedCategory.value,
      price_min: min,
      price_max: max,
      search: searchQuery.value || null,
    })
    projects.value = res.data.items
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  if (window.searchTimeout) clearTimeout(window.searchTimeout)
  window.searchTimeout = setTimeout(() => {
    loadProjects()
  }, 300)
}

function openModal(project) {
  selectedProject.value = project
  modalVisible.value = true
}

async function loadCategories() {
  try {
    const res = await categoryApi.list()
    categories.value = res.data
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  loadCategories()
  loadProjects()
})
</script>

<style scoped>
/* Hero typography entrance animations */
.hero-word {
  display: inline-block;
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.hero-word-1 { animation-delay: 0.05s; }
.hero-word-2 { animation-delay: 0.15s; }
.hero-word-3 { animation-delay: 0.25s; }
.hero-word-4 { animation-delay: 0.45s; }
.hero-word-5 { animation-delay: 0.55s; }
.hero-word-6 { animation-delay: 0.65s; }
.hero-word-7 { animation-delay: 0.75s; }

.hero-sub {
  opacity: 0;
  animation: fadeInUp 0.6s 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.hero-divider {
  opacity: 0;
  animation: fadeIn 0.5s 1.1s ease-out forwards;
}

.hero-line {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
}
@media (min-width: 768px) {
  .hero-line {
    font-size: 3.25rem;
  }
}

/* Masonry card entrance animation */
.masonry-item {
  animation: cardReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes cardReveal {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>