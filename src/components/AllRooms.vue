<!-- AllRooms.vue -->
<template>
  <div>
    <v-container>
      <v-row class="text-center"><h1>"ยินดีต้อนรับสู่ ชมรม SMC"</h1></v-row>
      <v-row class="text-center"><h3>ภาพห้องซ้อมดนตรีทั้งหมด</h3></v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-card
            min-height="300px"
            min-weight="300px"
            class="text-center align-center"
            style="display: flex; flex-direction: column; align-items: center;"
          >
            <v-img
              src="..\src\assets\picture\ห้องซ้อมดนตรี1.jpg"
              alt=" "
            ></v-img>
            <v-card-title class="text-center">ห้องซ้อมดนตรี 1</v-card-title>
            <v-btn color="primary" @click="openBookingPopup('ห้องซ้อมดนตรี 1', 'room_id_1')"> จอง </v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card
            min-height="300px"
            min-weight="300px"
            class="text-center align-center"
            style="display: flex; flex-direction: column; align-items: center;"
            >
            <v-img
              src="..\src\assets\picture\GM-Studio.jpg"
              alt=" "
            ></v-img>
            <v-card-title>ห้องซ้อมดนตรี 2</v-card-title>
            <v-btn color="primary" @click="openBookingPopup('ห้องซ้อมดนตรี 2', 'room_id_2')"> จอง </v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card
            min-height="300px"
            min-weight="300px"
            class="text-center align-center"
            style="display: flex; flex-direction: column; align-items: center;"
          >
            <v-img
              src="..\src\assets\picture\ห้องซ้อมดนตรี3.jpg"
              alt=" "
            ></v-img>
            <v-card-title>ห้องซ้อมดนตรี 3</v-card-title>
            <v-btn color="primary" @click="openBookingPopup('ห้องซ้อมดนตรี 3', 'room_id_3')"> จอง </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
     <!-- ป๊อปอัพการจอง -->
     <v-dialog v-model="isBookingPopupVisible">
      <v-card>
        <v-card-title>{{bookingData.roomName}}</v-card-title>
        <v-card-text>
          <v-form ref="bookingForm">
            <v-date-picker
              v-model="bookingData.bookingDate"
              label="วันที่"
              required
              :min="minDate"
            ></v-date-picker>
            <v-select
              v-model="bookingData.bookingTime"
              :items="timeSlots"
              label="ช่วงเวลา"
              required
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="bookRoom"> จอง </v-btn>
          <v-btn color="red" @click="isBookingPopupVisible = false"> ยกเลิก </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import EventBus from './EventBus'
export default {
  name: 'AllRooms',

  data () {
    return {
      isBookingPopupVisible: false,
      isBookingSuccess: false,
      bookingData: {
        roomName: '',
        roomID: '',
        bookingDate: null,
        bookingTime: null
      },
      minDate: new Date().toISOString().substr(0, 10),
      timeSlots: [
        '00:00 - 01:20',
        '01:20 - 02:40',
        '02:40 - 04:00',
        '04:00 - 05:20',
        '05:20 - 06:40',
        '06:40 - 08:00',
        '08:00 - 09:20',
        '09:20 - 10:40',
        '10:40 - 12:00',
        '12:00 - 13:20',
        '13.20 - 14.40',
        '14:40 - 16:00',
        '16.00 - 17.20',
        '17:20 - 18:40',
        '18.40 - 20.00',
        '20:00 - 21:20',
        '21.20 - 22.40',
        '22:40 - 00:00'
      ]
    }
  },

  methods: {
    openBookingPopup (roomName, roomID) {
      this.isBookingPopupVisible = true
      this.bookingData.roomName = roomName
      this.bookingData.roomID = roomID
    },

    bookRoom () {
      // ตรวจสอบข้อมูลการจอง
      if (this.isFormValid) {
        // ถ้าข้อมูลถูกต้อง ให้ตั้งค่า isBookingSuccess เป็น true
        this.isBookingSuccess = true
        // Moved POST request code here
        const sendReservationRequest = async () => {
          try {
            const dataResponse = await this.axios.post('http://localhost:9000/reserveroom', {
              roomId: this.bookingData.roomID, // Set the appropriate value
              userId: null, // Set the appropriate value
              reserveDate: this.bookingData.bookingDate,
              reserveTime: this.bookingData.bookingTime
            })
            console.log('dataResponse ====>', dataResponse)
            // Handle the response as needed
          } catch (error) {
            console.log(error.message)
            // Handle errors
          }
        }

        sendReservationRequest() // Call the async function
        alert('จองห้องสำเร็จ')
        this.isBookingPopupVisible = false
        // ตรวจสอบข้อมูลแล้วล้างค่าในฟอร์มและปิดป๊อปอัพ
        EventBus.$emit('booking-made', this.bookingData)
        this.clearBookingData()
      } else {
        // หากข้อมูลไม่ถูกต้องตามกฎ แสดงข้อความเตือน
        alert('กรุณากรอกข้อมูลให้ถูกต้องตามกฎและครบถ้วน')
      }
    },

    clearBookingData () {
      this.bookingData.bookingDate = null
      this.bookingData.bookingTime = null
      this.isBookingPopupVisible = false
    }
  },

  computed: {
    isFormValid () {
      return (
        this.$refs.bookingForm.validate()
      )
    }
  }
}
</script>
