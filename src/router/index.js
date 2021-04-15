import { createRouter, createWebHistory } from 'vue-router'
import Announcements from '../views/Announcements.vue'
import Events from '../views/Events.vue'

const routes = [
    {
        path: '/',
        name: 'Announcements',
        component: Announcements
    },
    {
        path: '/events',
        name: 'Events',
        component: Events 
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
