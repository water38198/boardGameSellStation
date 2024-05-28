import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'FrontLayout',
      component: () => import('@/views/FrontLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/front/HomeView.vue'),
        },
        {
          path: 'home',
          component: () => import('@/views/front/HomeView.vue'),
        },
        {
          path: 'products',
          component: () => import('@/views/front/ProductsView.vue'),
        },
        {
          path: 'product/:id',
          component: () => import('@/views/front/ProductView.vue')
        },
        {
          path: 'articles',
          component: () => import('@/views/front/ArticlesView.vue'),
        },
        {
          path: 'article/:id',
          component: () => import('@/views/front/ArticleView.vue'),
        },
        {
          path: 'cart',
          component: () => import('@/views/front/CartView.vue'),
        },
        {
          path: 'about',
          component: () => import('@/views/front/AboutView.vue'),
        },
        {
          path: 'login',
          component: () => import('@/views/front/LoginView.vue'),
        }
      ]
    },
    {
      path: '/dashboard',
      component: () => import('@/views/DashboardLayout.vue'),
      children: [
        {
          path: '',
          component:() => import('@/views/dashboard/DashboardProducts.vue') 
        },
        {
          path: 'products',
          component:() => import('@/views/dashboard/DashboardProducts.vue') 
        },
        {
          path: 'orders',
          component:() => import('@/views/dashboard/DashboardOrders.vue') 
        },
        {
          path: 'coupons',
          component:() => import('@/views/dashboard/DashboardCoupons.vue') 
        },
        {
          path: 'articles',
          component:() => import('@/views/dashboard/DashboardArticles.vue') 
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFound.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  },
})

export default router
