import Layout from '@/layout'

const reportesRouter = {
  path: '/reportes',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  name: 'Reportes',
  meta: {
    title: 'Reportes',
    icon: 'report',
    roles: ['admin']
  },
  children: [
    {
      path: '/reportes/estado-mensual',
      component: () => import('@/views/ch-reportes/reporte-general'),
      name: 'Estado mensual',
      meta: { title: 'Estado mensual', icon: 'chart', noCache: true, roles: ['admin'] }
    }
  ]
}

export default reportesRouter
