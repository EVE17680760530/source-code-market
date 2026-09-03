<template>
  <div class="admin-page min-h-screen bg-[var(--surface)]">
    <!-- Login Page -->
    <div v-if="!isLoggedIn" class="flex items-center justify-center min-h-[80vh]">
      <div class="w-full max-w-md mx-auto px-4">
        <div class="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-8">
          <div class="text-center mb-8">
            <img
              src="/images/TR及时雨.png"
              alt="及时雨源码"
              class="h-14 w-14 rounded-xl object-cover mx-auto mb-4"
            />
            <h2 class="text-xl font-bold">管理员登录</h2>
            <p class="text-sm text-[var(--text-muted)] mt-1">及时雨源码后台管理系统</p>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">用户名</label>
              <input
                v-model="form.username"
                type="text"
                placeholder="请输入管理员用户名"
                class="w-full px-3 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                @keyup.enter="handleLogin"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">密码</label>
              <input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
                class="w-full px-3 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                @keyup.enter="handleLogin"
              />
            </div>
            <button
              @click="handleLogin"
              :disabled="loading"
              class="w-full py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="4" class="opacity-75" />
              </svg>
              {{ loading ? '登录中...' : '登录' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin Dashboard -->
    <template v-else>
      <div class="flex min-h-screen">
        <!-- Left Sidebar -->
        <aside class="w-64 bg-[var(--surface-elevated)] border-r border-[var(--border)] flex flex-col shrink-0">
          <!-- Brand -->
          <div class="p-5 border-b border-[var(--border)]">
            <router-link to="/" class="flex items-center gap-3 group">
              <img
                src="/images/TR及时雨.png"
                alt="及时雨源码"
                class="h-10 w-10 rounded-lg object-cover group-hover:scale-105 transition-transform"
              />
              <div>
                <div class="text-sm font-semibold">及时雨源码</div>
                <div class="text-xs text-[var(--text-muted)]">后台管理</div>
              </div>
            </router-link>
          </div>

          <!-- Navigation Menu -->
          <nav class="flex-1 p-3 space-y-1">
            <button
              v-for="item in menuItems"
              :key="item.key"
              @click="activeMenu = item.key"
              :class="[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                activeMenu === item.key
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]'
              ]"
            >
              <span v-html="item.icon" class="w-5 h-5 shrink-0"></span>
              <span>{{ item.label }}</span>
              <span
                v-if="item.badge"
                class="ml-auto text-xs bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full"
              >
                {{ item.badge }}
              </span>
            </button>
          </nav>

          <!-- Bottom Actions -->
          <div class="p-3 border-t border-[var(--border)] space-y-1">
            <button
              @click="handleLogout"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>退出登录</span>
            </button>
          </div>
        </aside>

        <!-- Right Content Area -->
        <main class="flex-1 overflow-y-auto">
          <!-- Projects Management -->
          <div v-if="activeMenu === 'projects'" class="p-6 lg:p-8">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <div>
                <h1 class="text-xl font-bold">项目管理</h1>
                <p class="text-sm text-[var(--text-muted)] mt-1">共 {{ adminTotal }} 个项目</p>
              </div>
              <button
                @click="openCreateModal"
                class="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30 border border-primary-600"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                新增项目
              </button>
            </div>

            <!-- Project Stats -->
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4">
                <div class="text-2xl font-bold">{{ adminTotal }}</div>
                <div class="text-xs text-[var(--text-muted)] mt-1">全部项目</div>
              </div>
              <div class="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4">
                <div class="text-2xl font-bold text-primary-600">{{ projects.filter(p => p.is_hot).length }}</div>
                <div class="text-xs text-[var(--text-muted)] mt-1">热门置顶</div>
              </div>
              <div class="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-4">
                <div class="text-2xl font-bold text-green-600">{{ projects.filter(p => p.is_published !== false).length }}</div>
                <div class="text-xs text-[var(--text-muted)] mt-1">已上架</div>
              </div>
            </div>

            <!-- Project Table -->
            <div class="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-[var(--border)]">
                      <th class="text-left px-4 py-3.5 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">#</th>
                      <th class="text-left px-4 py-3.5 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">标题</th>
                      <th class="text-left px-4 py-3.5 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">分类</th>
                      <th class="text-left px-4 py-3.5 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">价格</th>
                      <th class="text-center px-4 py-3.5 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">状态</th>
                      <th class="text-center px-4 py-3.5 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(proj, idx) in projects"
                      :key="proj.id"
                      class="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--surface)]/50 transition-colors"
                    >
                      <td class="px-4 py-3.5 text-sm text-[var(--text-muted)]">{{ proj.id }}</td>
                      <td class="px-4 py-3.5">
                        <div class="flex items-center gap-3">
                          <img
                            v-if="proj.cover_image"
                            :src="proj.cover_image"
                            :alt="proj.title"
                            class="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                          <div class="min-w-0">
                            <div class="text-sm font-medium truncate max-w-[200px]">{{ proj.title }}</div>
                            <div v-if="proj.description" class="text-xs text-[var(--text-muted)] truncate max-w-[200px] mt-0.5">
                              {{ proj.description }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-3.5">
                        <span class="inline-block text-xs px-2 py-1 bg-zinc-100 text-[var(--text-muted)] rounded-md">
                          {{ proj.category_name || '-' }}
                        </span>
                      </td>
                      <td class="px-4 py-3.5 text-sm font-semibold">¥{{ proj.price }}</td>
                      <td class="px-4 py-3.5 text-center">
                        <div class="flex items-center justify-center gap-2">
                          <span
                            :class="proj.is_hot ? 'bg-amber-100 text-amber-700' : 'bg-zinc-100 text-zinc-500'"
                            class="inline-block px-2 py-0.5 text-xs rounded-full"
                          >
                            {{ proj.is_hot ? '置顶' : '普通' }}
                          </span>
                          <span
                            :class="proj.is_published !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
                            class="inline-block px-2 py-0.5 text-xs rounded-full"
                          >
                            {{ proj.is_published !== false ? '上架' : '下架' }}
                          </span>
                        </div>
                      </td>
                      <td class="px-4 py-3.5">
                        <div class="flex items-center justify-center gap-2">
                          <button
                            @click="openEditModal(proj)"
                            class="text-xs px-3 py-1.5 border border-[var(--border)] rounded-lg hover:border-primary-400 hover:text-primary-600 transition-all"
                          >
                            编辑
                          </button>
                          <button
                @click="confirmDelete(proj)"
                class="text-xs px-3 py-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-all"
              >
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="projects.length === 0">
                      <td colspan="6" class="px-4 py-16 text-center text-[var(--text-muted)]">
                        <svg class="mx-auto w-10 h-10 mb-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                          <rect x="2" y="3" width="20" height="14" rx="2"/>
                          <line x1="8" y1="21" x2="16" y2="21"/>
                          <line x1="12" y1="17" x2="12" y2="21"/>
                        </svg>
                        <p class="text-sm">暂无项目，点击右上角「新增项目」开始添加</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- Pagination -->
              <div class="flex items-center justify-between px-4 py-3 border-t border-[var(--border)] bg-[var(--surface)]/50">
                <div class="text-xs text-[var(--text-muted)]">
                  共 {{ adminTotal }} 条，第 {{ adminPage }}/{{ totalPages }} 页
                </div>
                <div class="flex items-center gap-1">
                  <button
                    :disabled="adminPage <= 1"
                    class="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] disabled:opacity-30 hover:bg-[var(--surface-elevated)] transition-colors disabled:cursor-not-allowed"
                    @click="goToPage(1)"
                  >
                    «
                  </button>
                  <button
                    :disabled="adminPage <= 1"
                    class="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] disabled:opacity-30 hover:bg-[var(--surface-elevated)] transition-colors disabled:cursor-not-allowed"
                    @click="goToPage(adminPage - 1)"
                  >
                    ‹
                  </button>
                  <template v-for="p in paginationPages" :key="p">
                    <button
                      :class="p === adminPage
                        ? 'px-3 py-1.5 text-xs rounded-lg bg-primary-600 text-white border border-primary-600'
                        : 'px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] hover:bg-[var(--surface-elevated)] transition-colors'"
                      @click="goToPage(p)"
                    >
                      {{ p }}
                    </button>
                  </template>
                  <button
                    :disabled="adminPage >= totalPages"
                    class="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] disabled:opacity-30 hover:bg-[var(--surface-elevated)] transition-colors disabled:cursor-not-allowed"
                    @click="goToPage(adminPage + 1)"
                  >
                    ›
                  </button>
                  <button
                    :disabled="adminPage >= totalPages"
                    class="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] disabled:opacity-30 hover:bg-[var(--surface-elevated)] transition-colors disabled:cursor-not-allowed"
                    @click="goToPage(totalPages)"
                  >
                    »
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Categories Management -->
          <div v-if="activeMenu === 'categories'" class="p-6 lg:p-8">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h1 class="text-xl font-bold">分类管理</h1>
                <p class="text-sm text-[var(--text-muted)] mt-1">管理项目的分类标签</p>
              </div>
              <button
                @click="openCategoryModal(null)"
                class="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                新增分类
              </button>
            </div>

            <div class="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-[var(--border)]">
                      <th class="text-left px-4 py-3.5 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">#</th>
                      <th class="text-left px-4 py-3.5 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">分类名称</th>
                      <th class="text-center px-4 py-3.5 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="cat in categories"
                      :key="cat.id"
                      class="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--surface)]/50 transition-colors"
                    >
                      <td class="px-4 py-3.5 text-sm text-[var(--text-muted)]">{{ cat.id }}</td>
                      <td class="px-4 py-3.5">
                        <span class="text-sm font-medium">{{ cat.name }}</span>
                      </td>
                      <td class="px-4 py-3.5">
                        <div class="flex items-center justify-center gap-2">
                          <button
                            @click="openCategoryModal(cat)"
                            class="text-xs px-3 py-1.5 border border-[var(--border)] rounded-lg hover:border-primary-400 hover:text-primary-600 transition-all"
                          >
                            编辑
                          </button>
                          <button
                            @click="confirmDeleteCategory(cat)"
                            class="text-xs px-3 py-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
                          >
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="categories.length === 0">
                      <td colspan="3" class="px-4 py-16 text-center text-[var(--text-muted)] text-sm">
                        暂无分类，点击右上角「新增分类」开始添加
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Settings Page -->
          <div v-if="activeMenu === 'settings'" class="p-6 lg:p-8">
            <div class="mb-6">
              <h1 class="text-xl font-bold">首页设置</h1>
              <p class="text-sm text-[var(--text-muted)] mt-1">管理网站首页的基本信息</p>
            </div>

            <div class="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-6 max-w-2xl">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2">网站名称</label>
                  <input
                    v-model="siteSettings.name"
                    type="text"
                    class="w-full px-3 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">网站描述</label>
                  <textarea
                    v-model="siteSettings.description"
                    rows="3"
                    class="w-full px-3 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">联系微信</label>
                  <input
                    v-model="siteSettings.wechat"
                    type="text"
                    class="w-full px-3 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
                <button
                  @click="saveSettings"
                  class="px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                >
                  保存设置
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <!-- Create/Edit Project Modal -->
      <Teleport to="body">
        <div
          v-if="modalOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          @click.self="modalOpen = false"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div class="relative w-full max-w-2xl bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] text-zinc-900">
            <!-- Header -->
            <div class="shrink-0 p-6 pb-0">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-bold text-zinc-900">{{ isEditing ? '编辑项目' : '新增项目' }}</h3>
                <button
                  @click="modalOpen = false"
                  class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
            <!-- Scrollable Body -->
            <div class="flex-1 overflow-y-auto px-6">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-zinc-800 mb-2">项目标题 <span class="text-red-500">*</span></label>
                  <input
                    v-model="editForm.title"
                    type="text"
                    class="w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-zinc-800 mb-2">分类 <span class="text-red-500">*</span></label>
                  <select
                    v-model="editForm.category_id"
                    class="w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  >
                    <option :value="null">请选择分类</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                      {{ cat.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-zinc-800 mb-2">价格 (元)</label>
                  <input
                    v-model.number="editForm.price"
                    type="number"
                    step="0.01"
                    class="w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-zinc-800 mb-2">封面图片 URL</label>
                  <input
                    v-model="editForm.cover_image"
                    type="text"
                    class="w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                <label class="block text-sm font-medium text-zinc-800 mb-2">视频链接 (外部嵌入)</label>
                <input
                  v-model="editForm.video_url"
                  type="text"
                  placeholder="B站嵌入URL"
                  class="w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-zinc-800 mb-2">百度网盘链接 <span class="text-red-500">*</span></label>
                <input
                  v-model="editForm.pan_link"
                  type="text"
                  class="w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-zinc-800 mb-2">联系方式</label>
                <input
                  v-model="editForm.contact_info"
                  type="text"
                  placeholder="微信/QQ号..."
                  class="w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-zinc-800 mb-2">项目描述</label>
                <textarea
                  v-model="editForm.description"
                  rows="6"
                  class="w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 resize-y focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                ></textarea>
              </div>

              <div class="flex items-center gap-8">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="editForm.is_hot"
                    type="checkbox"
                    class="rounded border-zinc-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-zinc-800">置顶热门</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="editForm.is_published"
                    type="checkbox"
                    class="rounded border-zinc-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-zinc-800">上架</span>
                </label>
              </div>
            </div>
            <!-- Footer -->
            <div class="shrink-0 p-6 pt-0">
              <div class="flex items-center justify-end gap-2 pt-4 border-t border-zinc-200">
                <button
                  @click="modalOpen = false"
                  class="px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                >
                  取消
                </button>
                <button
                  @click="saveProject"
                  :disabled="saving"
                  class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
                >
                  <span v-if="saving" class="flex items-center gap-2">
                    <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="4" class="opacity-75" />
                    </svg>
                    保存中...
                  </span>
                  <span v-else>保存</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Delete Project Confirmation -->
      <Teleport to="body">
        <div
          v-if="deleteModalOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          @click.self="deleteModalOpen = false"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div class="relative w-full max-w-sm bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl shadow-2xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-red-600">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold">确认删除</h3>
                <p class="text-sm text-[var(--text-muted)]">此操作不可恢复</p>
              </div>
            </div>
            <p class="text-sm mb-6">
              确定要删除项目 <span class="font-semibold">"{{ projectToDelete?.title }}"</span> 吗？
            </p>
            <div class="flex items-center justify-end gap-2">
              <button
                @click="deleteModalOpen = false"
                class="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--surface)] transition-colors"
              >
                取消
              </button>
              <button
                @click="doDelete"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Category Modal -->
      <Teleport to="body">
        <div
          v-if="categoryModalOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          @click.self="categoryModalOpen = false"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div class="relative w-full max-w-md bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl shadow-2xl p-6">
            <h3 class="text-lg font-bold mb-6">{{ editingCategory ? '编辑分类' : '新增分类' }}</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">分类名称 <span class="text-red-500">*</span></label>
                <input
                  v-model="categoryForm.name"
                  type="text"
                  placeholder="例如：Python、前端、Java..."
                  class="w-full px-3 py-2.5 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  @keyup.enter="saveCategory"
                />
              </div>
              <div class="flex items-center justify-end gap-2 pt-4 border-t border-[var(--border)]">
                <button
                  @click="categoryModalOpen = false"
                  class="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--surface)] transition-colors"
                >
                  取消
                </button>
                <button
                  @click="saveCategory"
                  :disabled="categorySaving"
                  class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
                >
                  {{ categorySaving ? '保存中...' : '保存' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Delete Category Confirmation -->
      <Teleport to="body">
        <div
          v-if="deleteCategoryModalOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          @click.self="deleteCategoryModalOpen = false"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div class="relative w-full max-w-sm bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl shadow-2xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-red-600">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold">确认删除</h3>
                <p class="text-sm text-[var(--text-muted)]">此操作不可恢复</p>
              </div>
            </div>
            <p class="text-sm mb-6">
              确定要删除分类 <span class="font-semibold">"{{ categoryToDelete?.name }}"</span> 吗？
            </p>
            <div class="flex items-center justify-end gap-2">
              <button
                @click="deleteCategoryModalOpen = false"
                class="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--surface)] transition-colors"
              >
                取消
              </button>
              <button
                @click="doDeleteCategory"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { authApi, projectApi, categoryApi, adminApi } from '@/api'
import { useToast } from '@/composables/useToast'

const toast = useToast()
const isLoggedIn = ref(!!localStorage.getItem('admin_token'))
const loading = ref(false)
const activeMenu = ref('projects')

const form = ref({
  username: '',
  password: '',
})

const menuItems = [
  {
    key: 'projects',
    label: '项目管理',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  },
  {
    key: 'categories',
    label: '分类管理',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  },
  {
    key: 'settings',
    label: '首页设置',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  },
]

async function handleLogin() {
  if (!form.value.username || !form.value.password) {
    toast.warning('请填写用户名和密码')
    return
  }
  loading.value = true
  try {
    const res = await authApi.login(form.value.username, form.value.password)
    localStorage.setItem('admin_token', res.data.access_token)
    isLoggedIn.value = true
    toast.success('登录成功，欢迎回来！')
    await Promise.all([loadProjects(), loadCategories()])
  } catch (err) {
    const msg = err.response?.data?.detail || '登录失败，请检查用户名和密码是否正确'
    toast.error(msg)
  } finally {
    loading.value = false
  }
}

function handleLogout() {
  localStorage.removeItem('admin_token')
  isLoggedIn.value = false
  toast.info('已安全退出登录')
}

// Projects
const projects = ref([])
const categories = ref([])
const adminPage = ref(1)
const adminTotal = ref(0)
const adminPageSize = 8

const totalPages = computed(() => Math.ceil(adminTotal.value / adminPageSize) || 1)

const paginationPages = computed(() => {
  const total = totalPages.value
  const current = adminPage.value
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages = []
  if (current <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i)
    pages.push(-1, total)
  } else if (current >= total - 3) {
    pages.push(1, -1)
    for (let i = total - 4; i <= total; i++) pages.push(i)
  } else {
    pages.push(1, -1, current - 1, current, current + 1, -1, total)
  }
  return pages
})

async function loadProjects() {
  try {
    const res = await adminApi.listProjects(adminPage.value, adminPageSize)
    const data = res.data
    projects.value = data.items
    adminTotal.value = data.total
  } catch (err) {
    toast.error('加载项目列表失败，请稍后重试')
  }
}

function goToPage(p) {
  if (p < 1 || p > totalPages.value || p === adminPage.value) return
  adminPage.value = p
  loadProjects()
}

async function loadCategories() {
  try {
    const res = await categoryApi.list()
    categories.value = res.data
  } catch (err) {
    toast.error('加载分类列表失败，请稍后重试')
  }
}

const modalOpen = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const deleteModalOpen = ref(false)
const projectToDelete = ref(null)

const emptyForm = {
  title: '',
  description: '',
  price: 0,
  category_id: null,
  video_url: '',
  pan_link: '',
  contact_info: '',
  cover_image: '',
  is_hot: false,
  is_published: true,
}

const editForm = ref({ ...emptyForm })
const editingId = ref(null)

function openCreateModal() {
  editForm.value = { ...emptyForm }
  isEditing.value = false
  editingId.value = null
  modalOpen.value = true
}

function openEditModal(project) {
  editForm.value = { ...project }
  isEditing.value = true
  editingId.value = project.id
  modalOpen.value = true
}

function confirmDelete(project) {
  projectToDelete.value = project
  deleteModalOpen.value = true
}

async function doDelete() {
  if (!projectToDelete.value) return
  try {
    await projectApi.delete(projectToDelete.value.id)
    await loadProjects()
    toast.success(`项目「${projectToDelete.value.title}」已成功删除`)
    deleteModalOpen.value = false
    projectToDelete.value = null
  } catch (err) {
    const msg = err.response?.data?.detail || '删除失败，请稍后重试'
    toast.error(msg)
  }
}

async function saveProject() {
  if (!editForm.value.title) {
    toast.warning('请填写项目标题')
    return
  }
  if (!editForm.value.pan_link) {
    toast.warning('请填写百度网盘链接')
    return
  }
  if (!editForm.value.category_id) {
    toast.warning('请选择项目分类')
    return
  }

  saving.value = true
  try {
    if (isEditing.value) {
      await projectApi.update(editingId.value, editForm.value)
      toast.success('项目更新成功！')
    } else {
      await projectApi.create(editForm.value)
      toast.success('项目创建成功！')
    }
    await loadProjects()
    modalOpen.value = false
  } catch (err) {
    const msg = err.response?.data?.detail || '保存失败，请稍后重试'
    toast.error(msg)
  } finally {
    saving.value = false
  }
}

// Categories
const categoryModalOpen = ref(false)
const editingCategory = ref(null)
const categoryForm = ref({ name: '' })
const categorySaving = ref(false)
const deleteCategoryModalOpen = ref(false)
const categoryToDelete = ref(null)

function openCategoryModal(category) {
  if (category) {
    editingCategory.value = category
    categoryForm.value = { name: category.name }
  } else {
    editingCategory.value = null
    categoryForm.value = { name: '' }
  }
  categoryModalOpen.value = true
}

async function saveCategory() {
  if (!categoryForm.value.name.trim()) {
    toast.warning('请输入分类名称')
    return
  }

  categorySaving.value = true
  try {
    if (editingCategory.value) {
      await categoryApi.update(editingCategory.value.id, { name: categoryForm.value.name.trim() })
      toast.success('分类更新成功！')
    } else {
      await categoryApi.create({ name: categoryForm.value.name.trim() })
      toast.success('分类创建成功！')
    }
    await loadCategories()
    categoryModalOpen.value = false
  } catch (err) {
    const msg = err.response?.data?.detail || '保存失败，请稍后重试'
    toast.error(msg)
  } finally {
    categorySaving.value = false
  }
}

function confirmDeleteCategory(category) {
  categoryToDelete.value = category
  deleteCategoryModalOpen.value = true
}

async function doDeleteCategory() {
  if (!categoryToDelete.value) return
  try {
    await categoryApi.delete(categoryToDelete.value.id)
    await loadCategories()
    toast.success(`分类「${categoryToDelete.value.name}」已成功删除`)
    deleteCategoryModalOpen.value = false
    categoryToDelete.value = null
  } catch (err) {
    const msg = err.response?.data?.detail || '删除失败，该分类下可能有关联项目'
    toast.error(msg)
  }
}

// Settings
const siteSettings = ref({
  name: '及时雨源码',
  description: '汇聚各类精品项目源代码，学生作业、创业项目、学习案例应有尽有',
  wechat: 'jishiyu_code',
})

function saveSettings() {
  toast.success('首页设置已保存！')
}

onMounted(() => {
  if (isLoggedIn.value) {
    Promise.all([loadProjects(), loadCategories()])
  }
})
</script>

<style>
/* Force light color scheme for admin page - warm gray with good contrast */
/* Target :root globally to fix teleported modals outside .admin-page */
:root {
  --surface: #f1f5f9 !important;
  --surface-elevated: #ffffff !important;
  --text: #0f172a !important;
  --text-muted: #64748b !important;
  --border: #cbd5e1 !important;
  color-scheme: light !important;
}

.admin-page {
  background: var(--surface) !important;
  color: var(--text) !important;
}
</style>