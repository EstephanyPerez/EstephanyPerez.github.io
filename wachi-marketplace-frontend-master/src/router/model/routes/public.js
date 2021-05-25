import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
   {
      path: "*",
      component: () => import("../../../views/Home.vue")
   },
   {
      path: "/home",
      name: "home",
      component: () => import("../../../views/Home.vue")
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
   },
   {
      path: "/Marketplace",
      name: "HomeMarketplace",
      component: () => import("../../../views/HomeMarketplace.vue"),
      children: [
         {
            path: "/ProductServicePrincipalDetail/:pid",
            name: "ProductServicePrincipalDetail",
            component: () =>
               import("../../../views/ProductServicePrincipalDetail.vue")
         },

         {
            path: "/ListProduct",
            name: "ListProduct",
            component: () => import("../../../views/ListProduct.vue"),
            props: route => ({
               ...route.params
            })
         }
      ]
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
