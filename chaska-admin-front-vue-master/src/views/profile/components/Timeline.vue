<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2019/10/26',
          title: 'Editar cliente',
          content: '210.23.4.234 el Sat Oct 26 01:27:36 2019'
        },
        {
          timestamp: '2019/10/25',
          title: 'Agregar préstamo',
          content: '210.23.4.234 el Fri Oct 25 20:11:46 2019'
        },
        {
          timestamp: '2019/10/25',
          title: 'Agregar lead',
          content: '210.23.4.234 el Fri Oct 25 19:40:50 2019'
        },
        {
          timestamp: '2019/10/25',
          title: 'Subir campaña',
          content: '210.23.4.234 el Fri Oct 25 18:24:50 2019'
        }
      ]
    }
  }
}
</script>
