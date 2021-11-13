import { createRouter, createWebHashHistory } from 'vue-router'
import Board from './Board'
import Login from './Login'
import Register from './Register'
import Post from './Post'
import Product from './Product'
import Search from './Search'
import NotFound from './NotFound'
import CreatePost from './CreatePost'
import UpdatePost from '~/components/UpdatePost'

export default createRouter({
  history: createWebHashHistory(),
	scrollBehavior() {
		return { top: 0 }
	},
  routes: [
    {
      path: '/',
			name: 'Home',
      component: Product
    },
		{
      path: '/board',
			name: 'Board',
      component: Board
    },
		{
			path: '/login',
<<<<<<< HEAD
			name: 'Pologinst',
=======
			name: 'Login',
>>>>>>> ebf88c9e66e24badd65ba16f26c58ec582b8dfd2
			component: Login
		},
		{
			path: '/Register',
			name: 'Register',
			component: Register
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
		},
		{
			path: '/create',
			name: 'CreatePost',
			component: CreatePost
		},
		{
			path: '/update/:id',
			name: 'UpdatePost',
			component: UpdatePost
		}
  ]
})
