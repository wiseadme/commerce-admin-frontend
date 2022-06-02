import { createRouter, createWebHistory } from 'vue-router'
import { productRoutes } from '@/modules/product/routes'
import { categoryRoutes } from '@/modules/category/routes'
import { attributeRoutes } from '@/modules/attribute/routes'

export const routes = [
  ...categoryRoutes,
  ...productRoutes,
  ...attributeRoutes
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
