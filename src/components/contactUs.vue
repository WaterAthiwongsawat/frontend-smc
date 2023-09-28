<template>
  <v-app>
    <v-main>
            <v-card class="text-center">
              <h1 style="padding-top: 16px;">ติดต่อสอบถาม</h1>
              <v-form @submit.prevent="handleSubmit">
                <v-text-field
                  v-model="name"
                  label="ชื่อ"
                  required
                  autofocus
                ></v-text-field>
                <v-text-field
                  v-model="surname"
                  label="นามสกุล"
                  required
                  autofocus
                ></v-text-field>
                <v-text-field
                  v-model="phone"
                  label="เบอร์โทร"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  label="Email Address"
                  required
                ></v-text-field>
                <v-textarea
                  v-model="message"
                  label="เรื่องที่ต้องการติดต่อ"
                  required
                  rows="3"
                ></v-textarea>
                <v-btn type="submit" color="primary" class="mt-4">
                  Submit
                </v-btn>
              </v-form>
            </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      surname: '',
      phone: '',
      email: '',
      message: ''
    }
  },
  methods: {
    handleSubmit () {
      if (window.confirm('Are you sure you want to submit the form?')) {
        // You can use axios to make an HTTP POST request here
        console.log('Form submitted successfully')
        // After a successful submission, you can navigate to another route
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>
/* Add your custom CSS styles here */
</style>
