import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('views/Login')
const Home = () => import('views/Home')
const Welcome = () => import('components/Welcome')
const Users = () => import('components/users/Users')
const Rights = () => import('components/rights/Rights')
const Roles = () => import('components/roles/Roles')
const Category = () => import('components/goods/Category')
const Params = () => import('components/goods/Params')
const GoodsList = () => import('components/goods/GoodsList')
const Add = () => import('components/goods/Add')
const Order = () => import('components/orders/Order')
const Report = () => import('components/report/Report')

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Category },
      { path: '/params', component: Params },
      { path: '/goods', component: GoodsList },
      { path: '/goods/add', component: Add },
      { path: '/orders', component: Order },
      { path: '/reports', component: Report }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    next('/login')
  } else {
    next()
  }
})

export default router
