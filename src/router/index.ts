import MainView from '@/views/MainView.vue'
import StartView from '@/views/StartView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:dl?',
      name: 'start',
      component: StartView,
    },
    {
      path: '/main/:job/:current_file/:original_name',
      name: 'main',
      component: MainView,
    },
  ],
})

export default router
