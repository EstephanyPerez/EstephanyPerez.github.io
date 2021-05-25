<template>
   <div class="carrouselPayment">
      <v-carousel
         hide-delimiters
         :show-arrows="false"
         height="auto"
         v-model="model"
      >
         <v-carousel-item
            height="auto"
            v-for="informacion in information"
            :key="informacion.color"
         >
            <v-sheet :color="informacion.color" height="auto" tile class="pb-4">
               <v-row justify="space-between">
                  <div class="ml-10 pt-2">
                     <img
                        @click="model--"
                        class="mr-3 cursor"
                        width="20px"
                        src="@/assets/img/payment/flecha-izquierda.png"
                        alt="Flecha Izquierda | Wachi MarketPlace"
                     />
                     <img
                        @click="model++"
                        class="cursor"
                        width="20px"
                        src="@/assets/img/payment/flecha-derecha.png"
                        alt="Flecha Derecha | Wachi MarketPlace"
                     />
                  </div>
                  <img class="mt-2 pr-7" :src="informacion.logo" alt="" />
               </v-row>
               <p class="ml-7 mt-3 mb-2 font-weight-bold black--text">
                  {{ informacion.titulo }}
               </p>
               <p class="ml-7 black--text">{{ informacion.texto }}</p>
            </v-sheet>
         </v-carousel-item>
      </v-carousel>
   </div>
</template>

<script>
import logo1 from "@/assets/img/payment/logo1.png";
import logo2 from "@/assets/img/payment/logo2.png";
import logo3 from "@/assets/img/payment/logo3.png";

export default {
   data: () => ({
      model: 0,
      information: [
         {
            color: "#eef6fd",
            logo: logo1,
            titulo: "Su información está protegida",
            texto:
               "Este sitio cumple con los estándares de seguridad de la industria de medios de pago, PCI DSS para proteger su información personal y la de su tarjeta.SSL Revise al pie el certificado que garantiza la autenticidad de nuestro servicio de pago."
         },
         {
            color: "#fbfbdc",
            logo: logo2,
            titulo:
               "Este comercio está afiliado al programa de protección de tarjetas MasterCard SecureCode",
            texto:
               "Si usted aún no está afiliado, su banco podría invitarlo a realizar la afiliación en línea.Conozca más acerca del programa MasterCard Secure Code haciendo click aquí."
         },
         {
            color: "#fbfbdd",
            logo: logo3,
            titulo:
               "Este comercio está afiliado al programa de protección de tarjetas Verified by Visa.",
            texto:
               "Si usted aún no está afiliado, su banco podría invitarlo a realizar la afiliación en línea.Conozca más acerca del programa Verified by Visa haciendo click aquí."
         }
      ]
   })
};
</script>

<style scoped>
.carrouselPayment {
   font-size: 13px;
}
</style>
