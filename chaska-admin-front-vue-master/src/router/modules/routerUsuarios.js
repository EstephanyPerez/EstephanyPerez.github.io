
import Layout from '@/layout'

const rolesRouter = {
  path: '/usuarios',
  component: Layout,
  redirect: '/usuarios/roles',
  alwaysShow: true, // will always show the root menu
  name: 'Usuarios',
  meta: {
    title: 'Usuarios',
    icon: 'user_role',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [
    {
      path: 'roles',
      component: () => import('@/views/ch-roles/roles'),
      name: 'Roles y permisos',
      meta: {
        title: 'Roles y permisos',
        roles: ['admin']
      }
    }
  ]
}
export default rolesRouter
