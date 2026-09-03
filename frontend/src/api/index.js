/**
 * Static API module - reads from local JSON files
 * No backend server required, works on GitHub Pages.
 */

let projectsCache = null
let categoriesCache = null

async function loadJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load ${url}`)
  return res.json()
}

function mockResponse(data) {
  return { data, status: 200, statusText: 'OK', headers: {}, config: {} }
}

function filterProjects(projects, params) {
  let result = [...projects]

  if (params.category_id) {
    result = result.filter((p) => p.category_id === Number(params.category_id))
  }
  if (params.price_min != null) {
    result = result.filter((p) => p.price >= Number(params.price_min))
  }
  if (params.price_max != null) {
    result = result.filter((p) => p.price <= Number(params.price_max))
  }
  if (params.search) {
    const q = params.search.toLowerCase()
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
    )
  }

  // Sort: hot first, then sort_order, then newest
  result.sort((a, b) => {
    if (a.is_hot !== b.is_hot) return a.is_hot ? -1 : 1
    if (a.sort_order !== b.sort_order) return b.sort_order - a.sort_order
    return new Date(b.created_at) - new Date(a.created_at)
  })

  return result
}

export const projectApi = {
  async list(params = {}) {
    if (!projectsCache) {
      projectsCache = await loadJson('./data/projects.json')
    }
    const filtered = filterProjects(projectsCache, params)

    const page = params.page || 1
    const pageSize = params.page_size || 20
    const start = (page - 1) * pageSize
    const items = filtered.slice(start, start + pageSize)

    return mockResponse({ items, total: filtered.length })
  },

  async get(id) {
    if (!projectsCache) {
      projectsCache = await loadJson('./data/projects.json')
    }
    const project = projectsCache.find((p) => p.id === Number(id))
    if (!project) {
      const err = new Error('Project not found')
      err.response = { status: 404, data: { detail: '项目不存在或已下架' } }
      throw err
    }
    return mockResponse(project)
  },

  create() {
    return Promise.reject(
      new Error('静态模式下不支持创建项目，请启动后端服务后操作')
    )
  },
  update() {
    return Promise.reject(
      new Error('静态模式下不支持编辑项目，请启动后端服务后操作')
    )
  },
  delete() {
    return Promise.reject(
      new Error('静态模式下不支持删除项目，请启动后端服务后操作')
    )
  },
}

export const categoryApi = {
  async list() {
    if (!categoriesCache) {
      categoriesCache = await loadJson('./data/categories.json')
    }
    return mockResponse(categoriesCache)
  },
  create() {
    return Promise.reject(
      new Error('静态模式下不支持此操作')
    )
  },
  update() {
    return Promise.reject(
      new Error('静态模式下不支持此操作')
    )
  },
  delete() {
    return Promise.reject(
      new Error('静态模式下不支持此操作')
    )
  },
}

export const authApi = {
  login() {
    return Promise.reject(
      new Error('静态模式下无需登录，请启动后端服务后操作')
    )
  },
}

export const adminApi = {
  listProjects() {
    return Promise.reject(
      new Error('静态模式下不支持后台管理，请启动后端服务后操作')
    )
  },
  getProject() {
    return Promise.reject(
      new Error('静态模式下不支持后台管理，请启动后端服务后操作')
    )
  },
}

export default { projectApi, categoryApi, authApi, adminApi }