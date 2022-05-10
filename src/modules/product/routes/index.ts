import ProductLayout from '@modules/product/layouts/ProductLayout.vue'

export const productRoutes = [
  {
    path: '/product',
    component: ProductLayout,
    name: 'dashboard',
    children: [
      {
        path: 'create',
        component: () => import('@modules/product/pages/ProductPage.vue'),
        name: 'create-product',
      },
    ],
  },
]
