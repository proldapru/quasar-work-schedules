const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/Index.vue')
      },

      {
        path: '/schedule',
        name: 'schedule',
        redirect: (to) => ({ name: 'main' }),
        component: () => import('pages/PageSchedule.vue'),
        props: true,
        children: [
          {
            path: '/schedule/:id',
            name: 'curSchedule',
            component: () => import('pages/PageSchedule.vue'),
            props: true,
          },
        ],

      },

      {
        path: '/about',
        name: 'about',
        component: () => import('pages/PageAbout.vue'),
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
