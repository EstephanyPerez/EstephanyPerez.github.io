import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./model/index";
import store from "@/store/index";

Vue.use(VueRouter);

const router = new VueRouter({
   routes,
   mode: "history"
});

router.beforeEach((to, from, next) => {
   const authenticated = store.state.user.user.session.authenticated;
   const onlyLoggedOut = to.matched.some(record => record.meta.onlyLoggedOut);
   const isPublic = to.matched.some(record => record.meta.public);

   if (!isPublic && !authenticated) {
      next({
         path: "/homepage"
      });
   }

   if (authenticated && onlyLoggedOut) {
      next({
         path: "/home-logged"
      });
   }

   next();
});

export default router;
