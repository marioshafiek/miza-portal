const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DashboardPage.vue') },
      { path: 'clients', component: () => import('pages/catalog/ClientsPage.vue') },
      { path: 'categories', component: () => import('pages/catalog/CategoriesPage.vue') },
    ],
  },

  // Auth route (no sidebar layout)
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'signup', component: () => import('pages/SignUpPage.vue') },
    ],
  },

  // Always leave this as the last one
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
