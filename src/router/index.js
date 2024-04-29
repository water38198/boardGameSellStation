import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: () => import('../views/FrontLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/front/HomeView.vue'),
        },
        {
          path: 'home',
          component: () => import('../views/front/HomeView.vue'),
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('../views/front/AboutView.vue'),
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('../views/front/CartView.vue'),
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('../views/front/ProductsView.vue'),
        },
        {
          path: 'product/:id',
          name: 'Product',
          component: () => import('../views/front/ProductView.vue'),
        },
        {
          path: 'articles',
          name: 'Articles',
          component: () => import('../views/front/ArticlesView.vue'),
        },
        {
          path: 'article/:id',
          name: 'article',
          component: () => import('../views/front/ArticleView.vue'),
        },
        {
          path: 'login',
          component: () => import('../views/front/LoginView.vue'),
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('../views/DashBoard.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/admin/AdminProducts.vue'),
        },
        {
          path: 'products',
          component: () => import('../views/admin/AdminProducts.vue'),
        },
        {
          path: 'orders',
          component: () => import('../views/admin/AdminOrders.vue'),
        },
        {
          path: 'coupons',
          component: () => import('../views/admin/AdminCoupons.vue'),
        },
        {
          path: 'articles',
          component: () => import('../views/admin/AdminArticles.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
