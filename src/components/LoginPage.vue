<template>
  <v-card>
    <v-card-title style="font-size: 24px; important!;">เข้าสู่ระบบ</v-card-title>
    <v-card-title> PSU passport </v-card-title>
    <v-card-text>
      <v-form ref="LoginForm" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="20"
          :rules="nameRules"
          label="ชื่อผู้ใช้งาน"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :rules="passwordRules"
          label="รหัสผ่าน"
          required
          outlined
          append-icon="mdi-eye"
          @click:append="togglePasswordVisibility"
        ></v-text-field>
        <v-btn :disabled="!valid" color="success" @click="Login" block>
          เข้าสู่ระบบ
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    users: [
      { username: '6310210449@psu.ac.th', password: 'water449.' },
      { username: 'user2', password: 'password2' }
      // เพิ่มผู้ใช้และรหัสผ่านเพิ่มเติมตามต้องการ
    ],
    name: '',
    nameRules: [
      v => !!v || 'กรุณากรอกชื่อผู้ใช้งาน',
      v => (v && v.length <= 20) || 'กรุณากรอกข้อมูลชื่อผู้ใช้งานห้ามเกิน 20 ตัวอักษร'
    ],
    password: '',
    passwordRules: [v => !!v || 'กรุณากรอกรหัสผ่าน'],
    showPassword: false
  }),

  methods: {
    Login () {
      const foundUser = this.users.find(user => user.username === this.name && user.password === this.password)
      if (foundUser) {
        this.$EventBus.$emit('getUsername')
        this.$router.push('/HomeView')
        alert('เข้าสู่ระบบสำเร็จ')
      } else {
        alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
      }
    },
    togglePasswordVisibility () {
      this.showPassword = !this.showPassword
    }
  }
}
</script>

<style>
</style>
