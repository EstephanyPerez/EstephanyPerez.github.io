const routes = [
   {
      path: "/login",
      name: "login",
      component: () => import("../../../views/Login.vue")
   },
   {
      path: "/",
      name: "home",
      component: () => import("../../../views/Home.vue")
   },
   {
      path: "/home",
      name: "home",
      component: () => import("../../../views/Home.vue")
   },
   {
      path: "/register",
      name: "register",
      component: () => import("../../../views/Register.vue")
   },
   {
      path: "/login2flock",
      name: "login2flock",
      component: () => import("../../../views/Login2Flock.vue")
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
      path: "/apply",
      name: "apply",
      component: () => import("../../../views/FormParticipants.vue")
   },
   {
      path: "/myTeam",
      name: "MyTeam",
      children: [
         {
            path: "profile",
            name: "profileMenu",
            component: () => import("@/views/MenuProfileTeam.vue")
         },
         {
            path: "members",
            name: "membersMenu",
            component: () => import("@/views/MenuMembersTeam.vue")
         },
         {
            path: "challenges",
            name: "challengesMenu",
            component: () => import("@/views/MenuChallengesTeam.vue")
         },
         {
            path: "activity/:id",
            name: "activityMenu",
            component: () => import("@/views/MenuActivityTeam.vue")
         }
      ],
      component: () => import("../../../views/MyTeam.vue")
   }
];

export default routes.map(route => {
   const meta = {
      public: true,
      onlyLoggedOut: false
   };

   return {
      ...route,
      meta
   };
});
