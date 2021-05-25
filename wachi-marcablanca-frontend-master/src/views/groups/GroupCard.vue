<template>
   <div>
      <v-card
         style="margin-bottom:15px;"
         light
         elevation="10"
         class="hidden-xs-only card"
         min-width="250px"
      >
         <div class="d-flex flex-no-wrap justify-space-between">
            <v-avatar
               class="ma-3"
               tile
               min-width="150px"
               width="100%"
               height="100%"
               max-width="150px"
               max-height="150px"
            >
               <img :src="dataGroup.image" />
            </v-avatar>
            <v-card-text style="padding:10px;" class="font-weight">
               <v-card-title>
                  {{ dataGroup.groupName }}
               </v-card-title>
               <v-card-text class="font-weight">
                  {{ dataGroup.entreName }}
               </v-card-text>
            </v-card-text>
         </div>
      </v-card>

      <v-card
         width="100%"
         style="margin-bottom:15px;"
         light
         elevation="10"
         class="hidden-sm-and-up card"
      >
         <v-img :src="dataGroup.image" height="150px" width="100%" tile>
         </v-img>
         <v-card-text style="padding:10px;">
            <v-app-bar flat color="rgba(0, 0, 0, 0)" height="50px !important;">
               <v-card-title class="font-weight">
                  {{ dataGroup.groupName }}
               </v-card-title>
            </v-app-bar>

            <v-card-text class="font-weight ml-4">
               {{ dataGroup.entreName }}
            </v-card-text>
         </v-card-text>
      </v-card>
   </div>
</template>

<script>
export default {
   name: "GroupCard",
   props: ["dataGroup"],
   data() {
      return {};
   },
   computed: {},
   created() {},
   mounted() {},
   methods: {}
};
</script>
