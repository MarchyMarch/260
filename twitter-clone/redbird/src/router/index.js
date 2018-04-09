import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import SearchResults from '@/components/SearchResults'
import Hashtag from '@/components/Hashtag'
import UserPage from '@/components/UserPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
    	path: '/search',
    	name: 'SearchResults',
    	component: SearchResults
    },
    {
    	path: '/hashtag/:hashtag',
    	name: 'Hashtag',
    	component: Hashtag
    },
    {
    	path: '/user/:userID',
    	name: 'UserPage',
    	component: UserPage
    },
  ]
})