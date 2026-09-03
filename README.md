# 及时雨源码 - 源代码商城网站

基于 Vue 3 + FastAPI + MySQL 构建的源代码展示商城网站。遵循 Pinterest 瀑布流设计风格。

## 功能特点

### 前台用户
- **项目展示**：Pinterest 风格瀑布流布局（Masonry Grid）
- **分类筛选**：按编程语言分类，支持价格区间筛选
- **关键词搜索**：支持项目标题和描述搜索
- **热门置顶**：热门项目优先展示
- **项目详情页**：项目介绍 + 外部视频嵌入
- **一键获取**：点击购买弹窗展示百度网盘链接 + 联系方式，引流到私域
- **不需要用户注册**：完全开放浏览

### 后台管理
- 管理员登录（JWT认证）
- 项目增删改查
- 热门置顶开关
- 分类管理

## 技术栈

### 后端
- **Python + FastAPI** - 高性能Web框架
- **SQLAlchemy** - ORM数据库操作
- **PyMySQL** - MySQL驱动
- **python-jose + passlib** - JWT认证与密码哈希

### 前端
- **Vue 3 + Vite** - 现代前端框架
- **Tailwind CSS 4** - 工具类CSS
- **Vue Router** - 路由管理
- **Axios** - HTTP请求客户端

## 快速开始

### 1. 环境要求
- Python 3.9+
- Node.js 18+
- MySQL 5.7+

### 2. 安装依赖

```powershell
# 后端
cd backend
pip install -r requirements.txt

# 前端
cd frontend
npm install
```

### 3. 配置数据库

修改 `backend/.env` 文件中的数据库连接信息：

```
DATABASE_URL=mysql+pymysql://你的用户名:你的密码@localhost:3306/source_code_market
```

先创建数据库：
```sql
CREATE DATABASE source_code_market DEFAULT CHARACTER SET utf8mb4;
```

### 4. 初始化数据

```powershell
cd backend
python init_db.py
```
这会创建初始分类表和示例项目数据。

### 5. 启动服务

方法一：使用一键启动脚本（Windows）：
```powershell
start.bat
```

方法二：手动启动：
```powershell
# 后端
cd backend
python main.py
# 后端运行在 http://localhost:8000

# 前端 (另开终端)
cd frontend
npm run dev
# 前端运行在 http://localhost:3000
```

### 6. 访问

- 前台首页：http://localhost:3000
- 后台管理：http://localhost:3000/admin
- 默认账号：`admin` / `admin123`

## 项目结构

```
├── backend/
│   ├── app/
│   │   ├── api/           # API路由
│   │   │   ├── auth.py    # 认证接口
│   │   │   ├── categories.py  # 分类接口
│   │   │   ├── projects.py    # 项目接口
│   │   │   └── admin.py  # 后台接口
│   │   ├── core/         # 核心配置
│   │   │   ├── config.py # 配置
│   │   │   ├── database.py  # 数据库连接
│   │   │   └── security.py  # 安全认证
│   │   ├── models/       # 数据库模型
│   │   ├── schemas/      # Pydantic schemas
│   │   └── services/     # 业务逻辑
│   ├── .env              # 环境配置
│   ├── init_db.py        # 初始化数据库
│   ├── requirements.txt  # Python依赖
│   └── main.py           # 启动入口
├── frontend/
│   ├── src/
│   │   ├── api/          # API封装
│   │   ├── components/   # Vue组件
│   │   │   ├── ProjectCard.vue
│   │   │   └── PurchaseModal.vue
│   │   ├── router/       # 路由配置
│   │   ├── views/        # 页面组件
│   │   │   ├── Home.vue  # 首页
│   │   │   ├── ProjectDetail.vue  # 详情页
│   │   │   └── Admin.vue # 后台管理
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── public/
│   │   └── images/       # 静态图片（商标、名片）
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── images/               # 源文件目录
├── start.bat             # Windows一键启动
└── README.md
```

## 部署

### 生产环境构建

```powershell
cd frontend
npm run build
```

构建产物在 `frontend/dist`，可以用 Nginx 静态托管。后端用 uvicorn + gunicorn 部署。

## 自定义

- 修改 `backend/.env` 更改管理员密码和JWT密钥
- 修改 `frontend/tailwind.config.js` 更改配色方案
- 添加/修改分类在后台管理页面直接操作

## 设计风格

- Pinterest 风格瀑布流布局
- 不对称网格设计
- 圆角卡片 + 柔和阴影
- 支持浅色/深色模式（跟随系统）
- 响应式设计：移动端 → 桌面端全适配
