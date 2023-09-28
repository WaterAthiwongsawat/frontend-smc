<template>
  <div>
    <v-container>
      <v-row>
        <h1>" ยินดีต้อนรับสู่ ชมรม SMC "</h1>
      </v-row>
      <v-row>
        <h3>ภาพกิจกรรมของชมรม SMC</h3>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="100" class="centered-container">
          <v-carousel cycle min-height="50vh" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item v-for="(item, i) in items" :key="i">
              <v-img :src="item.src" ></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data () {
    return {
      items: [
        {
          src: require('@/assets/picture/photo1.jpg') // Adjust the path based on your project structure
        },
        {
          src: require('@/assets/picture/photo2.jpg') // Adjust the path based on your project structure
        },
        {
          src: require('@/assets/picture/photo3.jpg') // Adjust the path based on your project structure
        },
        {
          src: require('@/assets/picture/photo4.jpg') // Adjust the path based on your project structure
        }
      ]
    }
  }
}
</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.centered-row {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
