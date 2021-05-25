<template>
   <v-container class="pa-0">
      <v-card>
         <v-row>
            <v-col cols="12">
               <v-tabs icons-and-text centered fixed-tabs>
                  <v-row>
                     <v-col cols="4">
                        <v-tab>
                           Ventas
                           <v-icon>mdi-point-of-sale</v-icon>
                        </v-tab>
                     </v-col>
                     <v-col cols="4">
                        <v-tab>
                           Ingresos
                           <v-icon>mdi-cash-usd</v-icon>
                        </v-tab>
                     </v-col>
                     <v-col cols="4">
                        <v-tab>
                           Valoraciones
                           <v-icon>mdi-star</v-icon>
                        </v-tab>
                     </v-col>
                  </v-row>
                  <v-tab-item>
                     <v-card>
                        <v-row>
                           <v-col>
                              <v-card>
                                 <v-row justify="center">
                                    <v-col lg="1"> </v-col>
                                    <v-col lg="6" cols="12">
                                       <v-row justify="center">
                                          <v-card-title>
                                             {{ this.salesQuantity }}
                                             venta(s) en el año
                                          </v-card-title>
                                       </v-row>
                                    </v-col>
                                    <v-col lg="3" cols="12">
                                       <v-row justify="center">
                                          <v-select
                                             :items="years"
                                             item-text="year"
                                             item-value="year"
                                             class="yearSelection"
                                             v-model="yearSelected1"
                                          >
                                          </v-select>
                                       </v-row>
                                    </v-col>
                                    <v-col lg="2"> </v-col>
                                 </v-row>
                              </v-card>
                           </v-col>
                        </v-row>
                        <v-row justify="center">
                           <v-col>
                              <v-row justify="center">
                                 <apexchart
                                    type="line"
                                    width="800"
                                    :options="options"
                                    :series="series"
                                 ></apexchart>
                              </v-row>
                           </v-col>
                        </v-row>
                     </v-card>
                  </v-tab-item>
                  <v-tab-item>
                     <v-card>
                        <v-row>
                           <v-col>
                              <v-card>
                                 <v-row justify="center">
                                    <v-col lg="1"> </v-col>
                                    <v-col lg="6" cols="12">
                                       <v-row justify="center">
                                          <v-card-title
                                             class="responsive-title"
                                          >
                                             S/
                                             {{
                                                this.incomeWithoutCommissions.toFixed(
                                                   2
                                                )
                                             }}
                                             de ingresos sin comisiones en el
                                             año
                                          </v-card-title>

                                          <v-card-subtitle
                                             class="responsive-subtitle"
                                          >
                                             S/
                                             {{
                                                this.incomeWithCommissions.toFixed(
                                                   2
                                                )
                                             }}
                                             de ingresos con comisiones
                                             aplicadas en el año
                                          </v-card-subtitle>
                                       </v-row>
                                    </v-col>
                                    <v-col lg="3" cols="12">
                                       <v-row justify="center">
                                          <v-select
                                             :items="years"
                                             item-text="year"
                                             item-value="year"
                                             class="yearSelection"
                                             v-model="yearSelected2"
                                          >
                                          </v-select>
                                       </v-row>
                                    </v-col>
                                    <v-col lg="2"> </v-col>
                                 </v-row>
                              </v-card>
                           </v-col>
                        </v-row>
                        <v-row justify="center">
                           <v-col>
                              <v-row justify="center">
                                 <apexchart
                                    width="800"
                                    type="line"
                                    :options="options2"
                                    :series="series2"
                                    :colors="colors"
                                 ></apexchart>
                              </v-row>
                           </v-col>
                        </v-row>
                     </v-card>
                  </v-tab-item>
                  <v-tab-item>
                     <v-card>
                        <v-row>
                           <v-col>
                              <v-card>
                                 <v-row justify="center">
                                    <v-col lg="2"> </v-col>
                                    <v-col lg="5" cols="12">
                                       <v-row justify="center">
                                          <v-card-title
                                             class="responsive-title"
                                          >
                                             {{ this.ratings.toFixed(1) }}
                                             <v-icon>mdi-star</v-icon> en
                                             promedio en el año
                                          </v-card-title>
                                       </v-row>
                                    </v-col>
                                    <v-col lg="3" cols="12">
                                       <v-row justify="center">
                                          <v-select
                                             :items="years"
                                             item-text="year"
                                             item-value="year"
                                             class="yearSelection"
                                             v-model="yearSelected3"
                                          >
                                          </v-select>
                                       </v-row>
                                    </v-col>
                                    <v-col lg="2"> </v-col>
                                 </v-row>
                              </v-card>
                           </v-col>
                        </v-row>
                        <v-row justify="center">
                           <v-col>
                              <v-row justify="center">
                                 <apexchart
                                    width="800"
                                    type="bar"
                                    :options="options3"
                                    :series="series3"
                                 ></apexchart>
                              </v-row>
                           </v-col>
                        </v-row>
                     </v-card>
                  </v-tab-item>
               </v-tabs>
            </v-col>
         </v-row>
      </v-card>
   </v-container>
</template>
<script>
import Vue from "vue";
import * as salesReportsDA from "../dataAccess/salesReportsDA";
import { mapGetters } from "vuex";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);
export default {
   name: "SalesReports",
   data: () => ({
      options: {
         chart: {
            width: "100%"
         },
         xaxis: {
            categories: [
               "Enero",
               "Febrero",
               "Marzo",
               "Abril",
               "Mayo",
               "Junio",
               "Julio",
               "Agosto",
               "Setiembre",
               "Octubre",
               "Noviembre",
               "Diciembre"
            ]
         },
         title: {
            text: "Histórico de ventas por meses",
            align: "center",
            margin: 30,

            style: {
               fontSize: "18px",
               fontWeight: "bold",
               fontFamily: "Roboto"
            }
         },
         responsive: [
            {
               breakpoint: 360,
               options: {
                  chart: {
                     width: 280,
                     height: 400
                  },
                  title: {
                     style: {
                        fontSize: "14px"
                     }
                  }
               }
            },
            {
               breakpoint: 460,
               options: {
                  chart: {
                     width: 310,
                     height: 400
                  }
               }
            },
            {
               breakpoint: 582,
               options: {
                  chart: {
                     width: 410,
                     height: 400
                  }
               }
            },
            {
               breakpoint: 700,
               options: {
                  chart: {
                     width: 480,
                     height: 400
                  }
               }
            },
            {
               breakpoint: 816,
               options: {
                  chart: {
                     width: 540,
                     height: 400
                  }
               }
            }
         ]
      },
      /* series: [
         {
            name: "Ventas",
            data: [30, 40, 45, 50, 49, 60, 70, 91, 80, 55, 90, 100]
         }
      ], */
      series: [],
      options2: {
         chart: {
            width: "100%"
         },
         xaxis: {
            categories: [
               "Enero",
               "Febrero",
               "Marzo",
               "Abril",
               "Mayo",
               "Junio",
               "Julio",
               "Agosto",
               "Setiembre",
               "Octubre",
               "Noviembre",
               "Diciembre"
            ]
         },
         title: {
            text: "Histórico de ingresos por meses",
            align: "center",
            margin: 30,
            style: {
               fontSize: "18px",
               fontWeight: "bold",
               fontFamily: "Roboto"
            }
         },
         responsive: [
            {
               breakpoint: 360,
               options: {
                  chart: {
                     width: 280,
                     height: 400
                  },
                  title: {
                     style: {
                        fontSize: "14px"
                     }
                  }
               }
            },
            {
               breakpoint: 460,
               options: {
                  chart: {
                     width: 310,
                     height: 400
                  }
               }
            },
            {
               breakpoint: 582,
               options: {
                  chart: {
                     width: 410,
                     height: 400
                  }
               }
            },
            {
               breakpoint: 700,
               options: {
                  chart: {
                     width: 480,
                     height: 400
                  }
               }
            },
            {
               breakpoint: 816,
               options: {
                  chart: {
                     width: 540,
                     height: 400
                  }
               }
            }
         ]
      },
      /* series2: [
         {
            name: "Ingresos sin comisiones",
            data: [300, 400, 450, 500, 490, 600, 700, 910, 800, 650, 900, 1000]
         },
         {
            name: "Ingresos con comisiones aplicadas",
            data: [250, 350, 400, 460, 440, 550, 650, 860, 750, 600, 850, 950]
         }
      ], */
      series2: [],
      colors: ["#2E93fA", "#66DA26"],
      options3: {
         chart: {
            width: "100%"
         },
         xaxis: {
            categories: [
               /* "Producto1",
               "Producto2",
               "Producto3",
               "Producto4",
               "Producto5",
               "Producto6",
               "Producto7",
               "Producto8",
               "Producto9",
               "Producto10",
               "Producto11",
               "Producto12",
               "Producto13",
               "Producto14",
               "Producto15" */
            ]
         },
         title: {
            text: "Histórico de productos/servicios mejores valorados",
            align: "center",
            margin: 30,
            style: {
               fontSize: "18px",
               fontWeight: "bold",
               fontFamily: "Roboto"
            }
         },
         plotOptions: {
            bar: {
               horizontal: true
            }
         },
         responsive: [
            {
               breakpoint: 360,
               options: {
                  chart: {
                     width: 280,
                     height: 400
                  },
                  title: {
                     style: {
                        fontSize: "14px"
                     }
                  }
               }
            },
            {
               breakpoint: 460,
               options: {
                  chart: {
                     width: 310,
                     height: 400
                  },
                  plotOptions: {
                     bar: {
                        horizontal: true
                     }
                  }
               }
            },
            {
               breakpoint: 582,
               options: {
                  chart: {
                     width: 410,
                     height: 400
                  },
                  plotOptions: {
                     bar: {
                        horizontal: true
                     }
                  }
               }
            },
            {
               breakpoint: 700,
               options: {
                  chart: {
                     width: 480,
                     height: 400
                  }
               }
            },
            {
               breakpoint: 816,
               options: {
                  chart: {
                     width: 540,
                     height: 400
                  }
               }
            }
         ]
      },
      series3: [],
      /*  series3: [
         {
            name: "Valoraciones",
            data: [
               3,
               4,
               4.5,
               5,
               4.9,
               4,
               3.8,
               3.7,
               3.5,
               4.2,
               4.8,
               4.9,
               3,
               4,
               4.5
            ]
         }
      ], */
      /*  years: [{ year: 2018 }, { year: 2019 }, { year: 2020 }], */
      years: [],
      yearSelected1: null,
      yearSelected2: null,
      yearSelected3: null,
      salesQuantity: 0,
      incomeWithCommissions: 0,
      incomeWithoutCommissions: 0,
      ratings: 0
   }),
   created() {
      this.retrieveReports();
   },

   methods: {
      ...mapGetters("user", ["getUser"]),
      retrieveReports() {
         salesReportsDA.getAvailableYears(this.getUser().data.id).then(res => {
            console.log(res[0]);
            this.years = res[0].years;
            this.yearSelected1 = res[0].years[0].year;
            this.yearSelected2 = res[0].years[0].year;
            this.yearSelected3 = res[0].years[0].year;
            let aux1 = {};
            let aux2 = {};
            salesReportsDA
               .getIncomeReport(this.getUser().data.id, this.yearSelected2)
               .then(res => {
                  console.log(res);
                  this.incomeWithoutCommissions = res[0].total;
                  this.incomeWithCommissions = res[1].total;
                  aux1["name"] = res[0].name;
                  aux1["data"] = res[0].data;
                  for (let i = 0; i < res[0].data.length; i++) {
                     aux1.data[i] = aux1.data[i].toFixed(2);
                  }
                  aux2["name"] = res[1].name;
                  aux2["data"] = res[1].data;
                  for (let i = 0; i < res[1].data.length; i++) {
                     aux2.data[i] = aux2.data[i].toFixed(2);
                  }
                  this.series2.push(aux1);
                  console.log("soy la serie 2", aux1.data);
                  this.series2.push(aux2);
               });
            let aux3 = {};
            salesReportsDA
               .getSalesQuantityReport(
                  this.getUser().data.id,
                  this.yearSelected1
               )
               .then(res => {
                  console.log(res);
                  this.salesQuantity = res[0].total;
                  aux3["name"] = res[0].name;
                  aux3["data"] = res[0].data;
                  this.series.push(aux3);
               });
            let aux4 = {};
            salesReportsDA
               .getTop15Publicationseport(
                  this.getUser().data.id,
                  this.yearSelected3
               )
               .then(res => {
                  console.log(res);
                  this.ratings = res[2].data;
                  this.options3.xaxis.categories = res[0].data;
                  aux4["name"] = res[1].name;
                  aux4["data"] = res[1].data;
                  this.series3.push(aux4);
               });
         });
      }
   }
};
</script>
<style scoped src="../styles/SalesReports.css"></style>
