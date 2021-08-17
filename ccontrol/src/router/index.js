import { createRouter, createWebHistory } from 'vue-router'
import Invoices from '../views/Invoices.vue';
const routes = [
  {
    path: '/',
    name: 'Invoices',
    component: Invoices
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
