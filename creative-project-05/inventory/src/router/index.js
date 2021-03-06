import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Register from '@/components/Register'
import AddItem from '@/components/AddItem'
import AddComputer from '@/components/AddComputer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
    	path: '/register',
    	name: 'Register',
    	component: Register
    },
    {
    	path: '/add-item',
    	name: 'AddItem',
    	component: AddItem
    },
    {
    	path: '/add-computer',
    	name: 'AddComputer',
    	component: AddComputer
    }
  ]
})
