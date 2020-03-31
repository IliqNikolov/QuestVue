import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/home.vue'
import HighScores from '../components/quest/highScores.vue'
import Create from '../components/quest/create.vue'
import Login from '../components/user/login.vue'
import Register from '../components/user/register.vue'
import ChangePassword from '../components/user/changePassword.vue'

Vue.use(VueRouter)
function loginGuard(to: any, from: any, next: any)
{
 let isAuthenticated= false;
if(localStorage.getItem('user'))
  isAuthenticated = true;
 else
  isAuthenticated= false;
 if(isAuthenticated) 
 {
  next();
 } 
 else
 {
  next('/login');
 }
}

function logoutGuard(to: any, from: any, next: any)
{
 let isAuthenticated= false;
if(!localStorage.getItem('user'))
  isAuthenticated = true;
 else
  isAuthenticated= false;
 if(isAuthenticated) 
 {
  next();
 } 
 else
 {
  next('/');
 }
}

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
    component:Login,
    beforeEnter :logoutGuard
  },
  {
    path: '/register',
    component:Register,
    beforeEnter :logoutGuard
  },
  {
    path: '/changepassword',
    component:ChangePassword,
    beforeEnter :loginGuard
  },
  {
    path: '/create',
    component:Create,
    beforeEnter :loginGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
