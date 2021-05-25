import Layout from '@/layout'

const routerProductos = {
  path: '/productos',
  component: Layout,
  redirect: '/productos/clientes/clientes-regulares',
  alwaysShow: true,
  name: 'Productos',
  meta: {
    title: 'Productos',
    icon: 'shopping',
    roles: ['admin']
  },
  children: [
    {
      path: '/cuentas',
      component: () => import('@/views/ch-cuentas/cuentas-simples'),
      name: 'Cuentas',
      meta: {
        title: 'Cuentas',
        icon: 'money-bag',
        roles: ['admin', 'cuentas']
      }
    },
    {
      path: '/cuentas/agregar-cuenta',
      component: () => import('@/views/ch-cuentas/agregar-cuenta'),
      name: '/cuentas/agregar-cuenta',
      props: true,
      meta: { title: 'Agregar cuenta', roles: ['admin'] },
      hidden: true
    },
    {
      path: '/cuentas/editar-cuenta',
      component: () => import('@/views/ch-cuentas/editar-cuenta'),
      name: '/cuentas/editar-cuenta',
      props: true,
      meta: { title: 'Editar cuenta', roles: ['admin'] },
      hidden: true
    },
    {
      path: '/campañas/leads',
      component: () => import('@/views/ch-leads/leads'),
      name: '/campañas/leads',
      props: true,
      meta: { title: 'Leads', roles: ['admin'] },
      hidden: true
    },
    {
      path: '/carga-masiva',
      component: () => import('@/views/ch-carga-masiva/carga-masiva'),
      name: '/carga-masiva',
      props: true,
      meta: { title: 'Carga masiva', roles: ['admin'] },
      hidden: true
    },
    {
      path: '/campañas/leads/agregar-lead',
      component: () => import('@/views/ch-leads/agregar-lead'),
      name: '/campañas/leads/agregar-lead',
      props: true,
      meta: { title: 'Agregar lead', roles: ['admin'] },
      hidden: true
    },
    {
      path: '/campañas',
      component: () => import('@/views/ch-campaigns/campaigns'),
      meta: { title: 'Campañas', icon: 'documentation', roles: ['admin'] },
      name: 'Campañas'
    },
    {
      path: '/prestamos',
      component: () => import('@/views/ch-prestamos/prestamos-simples'),
      name: 'Préstamos',
      meta: {
        title: 'Préstamos',
        icon: 'loan',
        roles: ['admin', 'prestamos']
      }
    },
    {
      path: '/prestamos/agregar-prestamo',
      component: () => import('@/views/ch-prestamos/agregar-prestamo'),
      name: '/prestamos/agregar-prestamo',
      props: true,
      meta: { title: 'Agregar préstamo', roles: ['admin'] },
      hidden: true
    },
    {
      path: '/expVenta',
      component: () => import('@/views/ch-expVenta/expVenta'),
      meta: { title: 'Exp. de venta', icon: 'tab', roles: ['admin'] },
      name: 'Exp. de venta'
    },
    {
      path: '/expVenta/agregar-expVenta',
      component: () => import('@/views/ch-expVenta/agregar-expVenta'),
      name: '/expVenta/agregar-expVenta',
      props: true,
      meta: { title: 'Agregar exp. de venta', roles: ['admin'] },
      hidden: true
    }
  ]
}
export default routerProductos
