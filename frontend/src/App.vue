<template>
  <div class="min-h-screen bg-[var(--surface)] text-[var(--text)]">
    <!-- Navbar - 管理员页面不显示 -->
    <header
      v-if="!isAdminPage"
      ref="headerRef"
      class="sticky top-0 z-50 bg-[var(--surface)]/80 backdrop-blur-lg transition-shadow duration-300"
      :class="scrolled ? 'shadow-sm border-b border-[var(--border)]' : 'border-b border-transparent'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <router-link to="/" class="flex items-center gap-3 group">
            <img
              src="/images/TR及时雨.png"
              alt="及时雨源码"
              class="h-9 w-9 rounded-lg object-cover group-hover:scale-105 transition-transform"
            />
            <span class="text-lg font-semibold tracking-tight">及时雨源码</span>
          </router-link>
          <nav class="flex items-center gap-4">
            <router-link
              to="/"
              class="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              所有项目
            </router-link>
            <router-link
              to="/contact"
              class="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              联系我
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <!-- Toast Container -->
    <Toast />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Toast from '@/components/Toast.vue'

const route = useRoute()
const isAdminPage = computed(() => route.path === '/admin')
const headerRef = ref(null)
const scrolled = ref(false)

let observer = null

onMounted(() => {
  // Use IntersectionObserver for scroll detection - no scroll listeners
  observer = new IntersectionObserver(
    ([entry]) => {
      scrolled.value = !entry.isIntersecting
    },
    { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
  )
  // Create a sentinel element at the top
  const sentinel = document.createElement('div')
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none'
  document.body.prepend(sentinel)
  observer.observe(sentinel)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style>
.router-link-exact-active {
  color: var(--color-primary-600, #2563eb) !important;
  font-weight: 600 !important;
}
</style>