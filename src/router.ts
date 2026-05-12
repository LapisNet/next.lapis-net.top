import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

export const pages: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/Home.vue'),
		meta: {
			title: '首页',
		}
	},
	{
		path: '/project',
		name: 'project',
		component: () => import('@/views/Project.vue'),
		meta: {
			title: '项目',
		}
	},
	{
		path: '/member',
		name: 'member',
		component: () => import('@/views/Member.vue'),
		meta: {
			title: '成员',
		}
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('@/views/About.vue'),
		meta: {
			title: '关于',
		}
	}
];

export const secretPages: RouteRecordRaw[] = [
	{
		path: '/legacy-project',
		name: 'legacy-project',
		component: () => import('@/views/LegacyProject.vue'),
		meta: {
			title: '旧项目',
		}
	}
];

const routes: RouteRecordRaw[] = [
	...pages,
	...secretPages,
	{
		path: '/redirect',
		name: 'redirect',
		component: () => import('@/views/Redirect.vue')
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/404.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		redirect: '/404',
	}
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
