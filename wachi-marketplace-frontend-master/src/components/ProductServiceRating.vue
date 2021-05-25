<template>
   <v-container>
      <v-list :three-line="true" :avatar="true">
         <v-list-item-group v-model="data" color="primary">
            <v-list-item v-if="data.length === 0">
               <v-list-item-content>
                  <p class="text-center text--disabled">
                     No hay valoraciones que mostrar
                  </p>
               </v-list-item-content>
            </v-list-item>
            <v-list-item
               v-for="(item, i) in visiblePages"
               :key="i"
               :inactive="true"
               style="pointer-events: none;"
            >
               <v-list-item-avatar>
                  <v-img :src="item.profile.avatar"></v-img>
               </v-list-item-avatar>
               <v-list-item-content>
                  <v-rating
                     v-model="item.score"
                     class=""
                     background-color="warning lighten-3"
                     color="warning"
                     dense
                  ></v-rating>
                  <v-list-item-subtitle v-html="subtitle(item)">
                  </v-list-item-subtitle>
               </v-list-item-content>
            </v-list-item>
         </v-list-item-group>
      </v-list>
      <div v-if="data.length !== 0">
         <v-row justify="center">
            <v-col cols="9"> </v-col>
            <v-col cols="2" align-self="center">
               <p class="mb-0 text-end text-caption">
                  Por Página:
               </p>
            </v-col>
            <v-col cols="1" align-self="center">
               <v-select
                  class="text-caption"
                  v-model="perPage"
                  :items="pages"
                  menu-props="auto"
                  single-line
               ></v-select>
            </v-col>
         </v-row>
         <v-pagination
            v-model="page"
            :length="Math.ceil(data.length / perPage)"
         ></v-pagination>
      </div>
   </v-container>
</template>

<script>
export default {
   name: "ProductServiceRating",
   props: ["items"],
   data: () => ({
      page: 1,
      perPage: 3,
      pages: [3, 5, 10, 15],
      data: [],
      lista: []
   }),
   created() {
      this.data = this.items;
   },
   methods: {
      subtitle(item) {
         return (
            "<span class='text--primary'>" +
            item.profile.name +
            "</span> &mdash; " +
            item.comment +
            "\n"
         );
      }
   },
   computed: {
      visiblePages() {
         return this.data.slice(
            (this.page - 1) * this.perPage,
            this.page * this.perPage
         );
      }
   }
};
</script>
