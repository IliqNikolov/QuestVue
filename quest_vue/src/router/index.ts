import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HighScores from '../components/quest/highScores.vue'
import Login from '../components/user/login.vue'
import Register from '../components/user/register.vue'
import ChangePassword from '../components/user/changePassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/highscores',
    component:HighScores
  },
  {
    path: '/login',
    component:Login
  },
  {
    path: '/register',
    component:Register
  },
  {
    path: '/changepassword',
    component:ChangePassword
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
