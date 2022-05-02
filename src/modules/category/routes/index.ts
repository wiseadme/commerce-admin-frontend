import CategoryLayout from '@modules/category/layouts/CategoryLayout.vue'

export const categoryRoutes = [
  {
    path: '/category',
    component: CategoryLayout,
    name: 'category',
    children: [
      {
        path: '',
        component: () => import('@modules/category/pages/CategoryPage.vue'),
        name: 'category',
      },
      {
        path: 'create',
        component: () => import('@modules/category/pages/CreateCategory.vue'),
        name: 'create-category',
      },
    ],
  },
]
