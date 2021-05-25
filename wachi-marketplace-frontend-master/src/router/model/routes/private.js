const routes = [
   {
      path: "/home-logged",
      name: "home-logged",
      component: () => import("../../../views/Home.vue")
   },
   {
      path: "/profile",
      name: "profile",
      component: () => import("../../../views/Profile.vue")
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
      path: "/Marketplace",
      name: "HomeMarketplace",
      component: () => import("../../../views/HomeMarketplace.vue"),
      children: [
         {
            path: "/ProductServicePrincipalDetail-logged/:pid",
            name: "ProductServicePrincipalDetail-loggued",
            component: () =>
               import("../../../views/ProductServicePrincipalDetail.vue")
         },
         {
            path: "/myShoppingCart/:userid",
            name: "shoppingCart",
            component: () => import("../../../components/ShoppingCart.vue")
         },
         {
            path: "/myPurchaseSummary",
            name: "PurchaseSummary",
            component: () => import("../../../views/PurchaseSummary.vue")
         },
         {
            path: "/ListProduct-loggued",
            name: "ListProduct-loggued",
            component: () => import("../../../views/ListProduct.vue"),
            props: route => ({
               ...route.params
            })
         },

         {
            path: "/payment",
            name: "Payment",
            component: () => import("@/views/Payment.vue")
         },
         {
            path: "/Home2",
            name: "HomeSidebar",
            component: () => import("../../../views/HomeSideBar.vue"),
            children: [
               {
                  path: "/productRegistration",
                  name: "productRegistration",
                  component: () =>
                     import("../../../views/ProductRegistration.vue")
               },
               {
                  path: "/myPublications",
                  name: "SellerPublications",
                  component: () =>
                     import("../../../views/SellerPublications.vue")
               },
               {
                  path: "/myShoppingHistory",
                  name: "ShoppingHistory",
                  component: () => import("../../../views/ShoppingHistory.vue")
               },
               {
                  path: "/myShoppingHistory/:orderid",
                  name: "ShoppingOrderDetail",
                  component: () =>
                     import("../../../views/ShoppingOrderDetail.vue")
               },
               {
                  path: "/orders",
                  name: "SellerOrders",
                  component: () => import("../../../views/SellerOrders.vue")
               },
               {
                  path: "/QuestionsCustomer",
                  name: "QuestionsCustomer",
                  component: () =>
                     import("../../../components/QuestionsCustomer.vue")
               },
               {
                  path: "/questions",
                  name: "SellerQuestions",
                  component: () => import("../../../views/SellerQuestions.vue")
               },
               {
                  path: "/salesReports",
                  name: "SalesReports",
                  component: () => import("../../../views/SalesReports.vue")
               }
            ]
         }
      ]
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
