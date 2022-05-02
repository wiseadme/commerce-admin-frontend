import { createRouter, createWebHistory } from 'vue-router'
import { productRoutes } from '@modules/product/routes'
import { categoryRoutes } from '@modules/category/routes'

export const routes = [
  ...categoryRoutes,
  ...productRoutes
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
