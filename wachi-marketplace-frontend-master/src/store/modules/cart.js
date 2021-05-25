import * as listProductDA from "../../dataAccess/listProductDA";

const state = () => ({
   cart: [],
   total: 0
});

const getters = {
   cart: state => {
      return state.cart;
   }
};

const mutations = {
   setCartItems(state, { cart }) {
      state.cart = cart;
   },

   setCartTotal(state, { total }) {
      state.total = total;
   }
};

const actions = {
   getCart({ commit }, idUser) {
      commit("setCartItems", { cart: [] });
      listProductDA.getCart(idUser).then(res => {
         console.log("--- Get cart ", res[0], " ", res[1]);
         commit("setCartItems", { cart: res[0] });
         commit("setCartTotal", { total: res[1] });
      });
   },

   updateProductToCart({ dispatch }, { idUser, idItem, count }) {
      listProductDA.isInCart(idUser, idItem).then(res => {
         if (res != null) {
            let itemQuantity = res.quantity;
            // console.log("--- Quantity in cart ", itemQuantity);
            if (itemQuantity === 0) {
               listProductDA
                  .addToCart(idUser, idItem, count)
                  .then(() => {
                     // console.log("--- (get 0) AddToCart ", res);
                     dispatch("getCart", idUser);
                  })
                  .catch(err => console.log(err));
            } else if (itemQuantity > 0) {
               listProductDA
                  .updateCart(idUser, idItem, count)
                  .then(() => {
                     // console.log("--- (get number) UpdateCart ", res);
                     dispatch("getCart", idUser);
                  })
                  .catch(err => console.log(err));
            }
         } else {
            listProductDA
               .addToCart(idUser, idItem, count)
               .then(() => {
                  // console.log("--- (get null) AddToCart ", res);
                  dispatch("getCart", idUser);
               })
               .catch(err => console.log(err));
         }
      });
   }
};

export default {
   state,
   getters,
   mutations,
   actions
};
