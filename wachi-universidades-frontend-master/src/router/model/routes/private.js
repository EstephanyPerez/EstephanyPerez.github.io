const routes = [
   {
      path: "/home-logged",
      name: "home-logged",
      component: () => import("../../../views/HomeLogged.vue")
   },
   {
      path: "/home-logged2",
      name: "home-logged2",
      component: () => import("../../../views/Home.vue")
   },
   {
      path: "/profile",
      name: "profile",
      component: () => import("../../../views/Profile.vue")
   },
   {
      path: "/my-profile",
      name: "my-profile",
      component: () => import("../../../views/MyProfile.vue")
   },
   {
      path: "/profile/:other",
      name: "otherProfile",
      component: () => import("../../../views/Profile.vue")
   },
   {
      path: "/members",
      name: "members",
      component: () => import("../../../views/member/Members.vue")
   },
   {
      path: "/group",
      name: "group",
      component: () => import("../../../views/group/Group.vue")
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
   },
   {
      path: "/activities",
      name: "Activities",
      component: () => import("../../../views/Activities.vue")
   },
   {
      path: "/campusCoordinators",
      name: "CampusCoordinators",
      component: () => import("../../../views/CampusCoordinators.vue")
   },
   {
      path: "/challenges",
      name: "Challenges",
      component: () => import("../../../views/Challenges.vue")
   },
   {
      path: "/hei",
      name: "Hei",
      component: () => import("../../../views/Hei.vue")
   },
   {
      path: "/inscribides",
      name: "Inscribides",
      component: () => import("../../../views/Inscribides.vue")
   },
   {
      path: "/mentors",
      name: "Mentors",
      component: () => import("../../../views/Mentors.vue")
   },
   {
      path: "/organizationalKit",
      name: "OrganizationalKit",
      component: () => import("../../../views/OrganizationalKit.vue")
   },
   {
      path: "/teams",
      name: "Teams",
      component: () => import("../../../views/Teams.vue")
   },
   {
      path: "/eventHistory",
      name: "EventHistory",
      component: () => import("../../../views/EventHistory.vue")
   },
   {
      path: "/newEvent",
      name: "NewEvent",
      component: () => import("../../../views/NewEvent.vue")
   },
   {
      path: "/editEventGeneralInformation",
      name: "EditEventGeneralInformation",
      component: () => import("../../../views/EditEventGeneralInformation.vue")
   },
   {
      path: "/eventHistoryDetail",
      name: "EventHistoryDetail",
      component: () => import("../../../views/EventHistoryDetail.vue")
   },
   {
      path: "/phases",
      name: "Phases",
      component: () => import("../../../views/Phases.vue")
   },
   {
      path: "/feedback",
      name: "Feedback",
      component: () => import("../../../views/Feedback.vue")
   },
   {
      path: "/feedbackGroup",
      name: "FeedbackGroup",
      component: () => import("../../../views/FeedbackGroup.vue")
   },
   {
      path: "/feedbackGroupDetail",
      name: "FeedbackGroupDetail",
      component: () => import("../../../views/FeedbackGroupDetail.vue")
   },
   {
      path: "/homeParticipantLogged",
      name: "homeParticipantLogged",
      component: () => import("../../../views/HomeParticipantLogged.vue")
   },
   {
      path: "/organizationalKitHeiSelected",
      name: "OrganizationalKitHeiSelected",
      component: () => import("../../../views/OrganizationalKitHeiSelected.vue")
   },
   {
      path: "/organizationalKitHeiFiles",
      name: "OrganizationalKitHeiFiles",
      component: () => import("../../../views/OrganizationalKitHeiFiles.vue")
   }
];

export default routes.map(route => {
   const meta = {
      public: true
   };

   return {
      ...route,
      meta
   };
});
