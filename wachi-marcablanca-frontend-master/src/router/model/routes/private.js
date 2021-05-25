const routes = [
   {
      path: "/home-logged",
      name: "home-logged",
      component: () => import("../../../views/Homepage.vue")
   },
   {
      path: "/profile",
      name: "profile",
      component: () => import("../../../views/Profile.vue")
   },
   {
      path: "/profile/:other",
      name: "otherProfile",
      component: () => import("../../../views/Profile.vue")
   },
   {
      path: "/members",
      name: "members",
      component: () => import("../../../views/members/Members.vue")
   },
   {
      path: "/group",
      name: "group",
      component: () => import("../../../views/groups/Group.vue")
   },
   {
      path: "/edit-community",
      name: "edit-community",
      component: () => import("../../../views/EditCommunity.vue")
   },
   {
      path: "/change-password/:returnAddress",
      name: "change-password",
      component: () => import("../../../views/ChangePassword.vue")
   }
];

export default routes.map(route => {
   const meta = {
      public: false
   };

   return {
      ...route,
      meta
   };
});
