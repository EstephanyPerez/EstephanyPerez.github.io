const routes = [
   {
      path: "*",
      component: () => import("../../../views/Homepage.vue")
   },
   {
      path: "/homepage",
      name: "homepage",
      component: () => import("../../../views/Homepage.vue")
   },
   {
      path: "/login",
      name: "login",
      component: () => import("../../../views/Login.vue")
   },
   {
      path: "/login2flock",
      name: "login2flock",
      component: () => import("../../../views/Login2Flock.vue")
   },
   {
      path: "/register",
      name: "register",
      component: () => import("../../../views/Register.vue")
   },
   {
      path: "/activation",
      name: "activation",
      component: () => import("../../../views/RegisterInvitation.vue")
   },
   {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("../../../views/ForgotPassword.vue")
   }
];

export default routes.map(route => {
   const meta = {
      public: true,
      onlyLoggedOut: true
   };

   return {
      ...route,
      meta
   };
});
