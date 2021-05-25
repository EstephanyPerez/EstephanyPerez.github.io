
import Layout from '@/layout'

const routerClientes = {
  path: '/clientes',
  component: Layout,
  redirect: '/clientes/clientes-regulares',
  name: 'Clientes',
  meta: {
    title: 'Clientes',
    icon: 'peoples',
    roles: ['admin']
  },
  children: [
    {
      path: 'clientes-regulares',
      component: () => import('@/views/ch-clientes/clientes-regulares'),
      name: 'Clientes regulares',
      meta: { title: 'Clientes regulares', roles: ['admin'], icon: 'star' }
    },
    {
      path: 'clientes-especiales',
      component: () => import('@/views/ch-clientes/clientes-especiales'),
      name: 'Clientes especiales',
      meta: { title: 'Clientes especiales', roles: ['admin'], icon: 'bug' }
    },
    {
      path: 'clientes-potenciales',
      component: () => import('@/views/ch-clientes/clientes-potenciales'),
      name: 'Clientes potenciales',
      meta: { title: 'Clientes potenciales', roles: ['admin'], icon: 'wechat' }
    },
    {
      path: 'agregar-cliente',
      component: () => import('@/views/ch-clientes/agregar-cliente'),
      name: 'Agregar cliente',
      meta: { title: 'Agregar cliente', roles: ['admin'] },
      hidden: true
    },
    {
      path: 'ver-cliente',
      component: () => import('@/views/ch-clientes/ver-cliente'),
      name: 'ver-cliente',
      props: true,
      meta: { title: 'ver-cliente', roles: ['admin'] },
      hidden: true
    },
    {
      path: 'editar-cliente',
      component: () => import('@/views/ch-clientes/editar-cliente'),
      name: 'editar-cliente',
      props: true,
      meta: { title: 'Editar cliente', roles: ['admin'] },
      hidden: true
    }
  ]
}
export default routerClientes
