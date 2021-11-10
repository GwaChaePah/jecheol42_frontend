import { createRouter, createWebHashHistory } from 'vue-router'
import Board from './Board'
import Login from './Login'
import Post from './Post'
import Product from './Product'
import Search from './Search'
import NotFound from './NotFound'

export default createRouter({
  history: createWebHashHistory(),
	scrollBehavior() {
		return { top: 0 }
	},
  routes: [
    {
      path: '/',
      component: Product
    },
		{
      path: '/board',
      component: Board
    },
		{
			path: '/login',
			component: Login
		},
		{
			path: '/post/:id',
			name: 'Post',
			component: Post
		},
		{
			path: '/search',
			name: 'Search',
			component: Search
		},
		{
			path: '/:notFound(.*)',
			name: 'NotFound',
			component: NotFound
		}
  ]
})
