import CategoryLayout from '@modules/category/layouts/CategoryLayout.vue'

export const categoryRoutes = [
  {
    path: '/categories',
    component: CategoryLayout,
    name: 'categories',
    children: [
      {
        path: '',
        component: () => import('@modules/category/pages/CategoryPage.vue'),
        name: 'categories-table',
      },
    ],
  },
]
