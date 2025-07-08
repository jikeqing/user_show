import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/Main.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LoginView },
    { path: '/main', component: MainView }
  ]
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('userRole')
  if(token){
    if(to.path === '/'){
      next('/main')
    }else{
      next()

    }
  }else{
    if(to.path === '/'){
      next()
    }else{
      next('/')
    }

  }
})

export default router
