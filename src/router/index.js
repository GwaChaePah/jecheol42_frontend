import { createRouter, createWebHashHistory } from 'vue-router'
import Board from './Board'
import Login from './Login'
import Post from './Post'

export default createRouter({
  history: createWebHashHistory(),
	scrollBehavior() {
		return { top: 0 }
	},
  routes: [
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
		}
  ]
})
