<template>
  <v-app>
      <v-app-bar absolute src="..\src\assets\picture\photo1.jpg" fade-img-on-scroll color="#6A76AB" dark shrink-on-scroll prominent scroll-target="#scrolling-techniques">
          <template v-slot:img="{ props }">
              <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
          </template>
          <v-app-bar-title>
            <v-img>
              <v-img src="..\src\assets\picture\image-removebg-preview.png" alt="Logo" max-height="150px" max-width="150px"></v-img>
            </v-img>
          </v-app-bar-title>

          <v-spacer></v-spacer>

          <!-- <v-btn icon>
              <v-icon>{{ icons.mdiAccount }}</v-icon>
          </v-btn> -->
          <v-btn :to="{ name: 'LoginPage' }" elevation="2" outlined plain raised>Login</v-btn>
          <template v-slot:extension>
              <v-tabs align-with-title>
                  <v-tab :to="{ name: 'HomeView' }">หน้าแรก</v-tab>
                  <v-tab :to="{ name: 'AllRooms' }">ห้องซ้อมดนตรีทั้งหมด</v-tab>
                  <v-tab :to="{ name: 'ReserveHistory' }">ประวัติการจอง</v-tab>
                  <v-tab :to="{ name: 'contactUs' }">ติดต่อชมรม</v-tab>
              </v-tabs>
          </template>
      </v-app-bar>
      <v-sheet id="scrolling-techniques" class="overflow-y-auto" max-height="100vh">
          <v-container style="min-height: calc(100vh - 64px); margin-top: 250px">
              <v-main>
                  <router-view />
              </v-main>
          </v-container>
      </v-sheet>
  </v-app>
  </template>

<script>
import {
  mdiAccount
} from '@mdi/js'
export default {
  name: 'App',

  data: () => ({
    icons: {
      mdiAccount
    }
  }),

  components: {

  }
}
</script>

  <style scoped>
/* Add your custom CSS styles here */
/* ปรับสีพื้นหลังของโลโก้ */
.logo-image {
  background-color: darkblue; /* เปลี่ยนสีพื้นหลังตามที่คุณต้องการ */
}

/* ปรับตำแหน่งของโลโก้ */
.logo-image img {
  margin-top: your-margin-top; /* เปลี่ยนตำแหน่งด้านบนตามที่คุณต้องการ */
  margin-left: your-margin-left; /* เปลี่ยนตำแหน่งด้านซ้ายตามที่คุณต้องการ */
}
</style>
