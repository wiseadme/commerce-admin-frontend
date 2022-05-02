import ProductLayout from '@modules/product/layouts/ProductLayout.vue'

export const productRoutes = [
  {
    path: '/product',
    component: ProductLayout,
    name: 'dashboard',
    children: [
      {
        path: 'create',
        component: () => import('@modules/product/pages/CreateProduct.vue'),
        name: 'create-product',
      },
    ],
  },
]
