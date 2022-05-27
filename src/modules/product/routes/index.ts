import ProductLayout from '@modules/product/layouts/ProductLayout.vue'

export const productRoutes = [
  {
    path: '/products',
    component: ProductLayout,
    name: 'products',
    children: [
      {
        path: '',
        component: () => import('@modules/product/pages/ProductPage.vue'),
        name: 'products-table',
      },
    ],
  },
]
