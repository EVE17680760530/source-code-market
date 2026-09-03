<template>
  <div
    class="group cursor-pointer rounded-2xl overflow-hidden bg-[var(--surface-elevated)] border border-[var(--border)] transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1"
    @click="$router.push(`/project/${project.id}`)"
  >
    <div class="aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
      <img
        :src="project.cover_image || 'https://picsum.photos/seed/' + project.id + '/800/600'"
        :alt="project.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <div class="p-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded-full">
          {{ project.category_name || '未分类' }}
        </span>
        <span class="text-xs text-[var(--text-muted)]">
          {{ project.is_hot ? '🔥 热门' : '' }}
        </span>
      </div>
      <h3 class="font-semibold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
        {{ project.title }}
      </h3>
      <p class="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-3">
        {{ project.description }}
      </p>
      <div class="flex items-center justify-between">
        <span class="text-base font-bold text-primary-600 dark:text-primary-400">
          ¥{{ project.price }}
        </span>
        <button
          class="text-xs font-medium px-3 py-1.5 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          @click.stop="handleBuy"
        >
          查看详情
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['buy'])

function handleBuy(e) {
  e.stopPropagation()
  emit('buy', props.project)
}
</script>