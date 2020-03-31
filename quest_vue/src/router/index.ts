import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/home.vue'
import HighScores from '../components/quest/highScores.vue'
import Create from '../components/quest/create.vue'
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
    path: '/create',
    component:Create
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
