<template>
   <v-form class="custom-form">
      <h1
         class="title mb-3"
         style="text-align:center;"
         v-if="addOption == 'product'"
      >
         Imágenes del producto ({{ passImg.length }}/5)
      </h1>
      <h1 class="title mb-3" style="text-align:center;" v-else>
         Imágenes del servicio ({{ passImg.length }}/5)
      </h1>
      <VueUploadMultipleImage
         class="centered-component"
         @upload-success="uploadImageSuccess"
         @before-remove="beforeRemove"
         @edit-image="editImage"
         @data-change="dataChange"
         @limit-exceeded="limitExceeded"
         @mark-is-primary="markPrimary"
         :data-images="images"
      >
      </VueUploadMultipleImage>
   </v-form>
</template>

<script>
import VueUploadMultipleImage from "@/components/VueUploadMultipleImage.vue";
import * as productRegisterDA from "../dataAccess/productRegisterDA";
import { cloneDeep } from "lodash";

export default {
   name: "Step2AddProduct",
   components: {
      VueUploadMultipleImage
   },
   props: ["addOption", "passImg", "passParentId"],
   data() {
      return {
         numImages: 0,
         images: []
      };
   },
   created() {
      var imgsUrl = [];
      productRegisterDA.getItemById(this.passParentId).then(response => {
         if (response !== {}) {
            imgsUrl = response.body.productService.images;
            for (var i = 0; i < imgsUrl.length; i++) {
               if (i === 0) {
                  let json = {
                     default: 1,
                     highlight: 1,
                     name: "",
                     path: "data:image/jpeg;base64," + imgsUrl[i]
                  };
                  this.images.push(json);
               } else {
                  let json = {
                     default: 0,
                     highlight: 0,
                     name: "",
                     path: "data:image/jpeg;base64," + imgsUrl[i]
                  };
                  this.images.push(json);
               }
            }
         }
      });
   },
   mounted() {
      this.numImages = this.passImg.length;
   },
   methods: {
      uploadImageSuccess(formData, index, fileList) {
         this.numImages = fileList.length;
         this.$emit("pass-images", fileList); //ESTO ME FALTA
      },
      beforeRemove(index, done, fileList) {
         console.log("index", index, fileList);
         //var r = confirm("remove image");
         var r = true;
         if (r == true) {
            done();
            this.numImages = fileList.length;
            this.$emit("pass-images", fileList);
         } else {
            console.log("r es false");
         }
      },
      editImage(formData, index, fileList) {
         console.log("edit data", formData, index, fileList);
         this.images = fileList; //cloneDeep(fileList);
         this.$emit("pass-images", fileList);
      },
      dataChange(data) {
         console.log(data);
      },
      limitExceeded(amount) {
         console.log(amount);
      },
      markPrimary(currIndex, fileList) {
         this.images = cloneDeep(fileList);
         this.$emit("pass-images", fileList);
      }
      /*loadImages(images) {
         this.$emit("pass-images", images);
      },
      markPrimary(currIndex, images){
         this.$emit("pass-images",)

      }*/
   }
};
</script>

<style scoped src="../styles/Step2AddProduct.css"></style>
