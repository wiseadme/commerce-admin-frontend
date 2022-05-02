import CategoryLayout from '@modules/category/layouts/CategoryLayout.vue'

export const categoryRoutes = [
  {
    path: '/category',
    component: CategoryLayout,
    name: 'category',
    children: [
      {
        path: 'create',
        component: () => import('@modules/category/pages/CreateCategory.vue'),
        name: 'create-category',
      },
    ],
  },
]
