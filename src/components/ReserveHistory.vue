<!-- //ReserveHistory.vue -->
<template>
    <div>
    <v-data-table
        :headers="headers"
        :items="reserveroomItem"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>หน้าจัดการข้อมูลห้องซ้อม</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>

          </v-toolbar>
        </template>
        <template v-slot:[`item.role`]= "{ item }">
          {{ item.role === null ? '' : item.role.name }}
        </template>
        <template v-slot:[`item.actions`] = "{ item }">
          <v-btn small outlined @click="openDialog('edit', item)" color="blue">
          <v-icon>
            mdi-pencil
          </v-icon>
          </v-btn>
          <v-btn small outlined @click="deleteItem(item)" color="red" class="ml-2">
          <v-icon>
            mdi-delete
          </v-icon>
          </v-btn>
        </template>
        <template v-slot:no-data>
          ไม่มีรายการ การจอง
        </template>
      </v-data-table>
      <v-dialog
              v-model="dialogCreate"
              max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="reserve_room"
                          label="ห้องที่ทำการจอง"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="reserve_date"
                          label="วันที่จอง"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="reserve_time"
                          label="เวลาที่จอง"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    ยกเลิก
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save(formTitle)"
                  >
                    บันทึกข้อมูล
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">ตุณต้องการลบข้อมูลนี้ในตารางใช่ หรือ ไม่?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">ยกเลิก</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">ตกลง</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
    </div>
    </template>

<script>
import EventBus from './EventBus'
/* eslint-disable */ 
export default {
  data: () => ({
    reserveroomId: '',
    roomId: '',
    userId: '',
    reserveDate: '',
    reserveTime: '',
    dialogCreate: false,
    dialogDelete: false,
    headers: [
      {
        text: 'ลำดับการจอง',
        align: 'start',
        sortable: false,
        value: 'reserveroomId'
      },
      { text: 'ห้องที่ทำการจอง', value: 'reserveroomId' },
      { text: 'วันที่จอง', value: 'reserveDate' },
      { text: 'เวลาที่จอง', value: 'reserveTime' },
      { text: 'จัดการ', value: 'actions', sortable: false }
    ],
    reserveroomItem: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    formTitle: '',
    idreserveroom: '',
    idforDelete: ''
  }),

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.initialize()
    EventBus.$on('booking-made', (bookingData) => {
      console.log('Booking made:', bookingData);
      // คุณสามารถเพิ่มโค้ดเพื่อบันทึกข้อมูลการจองลงใน reserveroomItem หรือทำการจัดเก็บข้อมูลตามที่คุณต้องการ
    })
  },

methods: {
    async initialize () {
      this.reserveroomItem = []
      try {
        const data = await this.axios.get('http://localhost:9000/reservehistory')
        console.log('data reserveroom ====>', data)
        this.reserveroomItem = data.data
      } catch (error) {

      }
    },
    openDialog (Action, item) {
      this.formTitle = ''
      if (Action === 'add') {
        this.dialogCreate = true
        this.formTitle = 'เพิ่มข้อมูล'
        this.editedItem = item
      } else {
        this.formTitle = 'แก้ไขข้อมูล'
        this.dialogCreate = true
        this.reserveroomId = item.reserveroomId
        this.roomId = item.roomId
        this.userId = item.userId
        this.reserveDate = item.reserveDate
        this.reserveTime = item.reserveTime
        this.idreserveroom = item.reserveroomId
      }
    },

    editItem (item) {
      console.log('item select', item)
      this.editedIndex = this.reserveroomItem.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.idforDelete = item.id
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      try {
        const response = await this.axios.delete('http://localhost:9000/reserveroom/' + this.idforDelete)
        this.initialize()
      } catch (error) {
        console.log(error.message)
      }
      this.closeDelete()
    },

    close () {
      this.dialogCreate = false
      this.editedItem = []
      this.editedIndex = -1
      this.defaultItem = {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save (action) {
      const data = {
        reserveroomId: this.reserveroomId,
        roomId: this.roomId,
        userId: this.userId,
        reserveDate: this.reserveDate,
        reserveTime: this.reserveTime,
        
      }
      if (action === 'เพิ่มข้อมูล') {
        try {
          var dataResponse = await this.axios.post('http://localhost:9000/reserveroom', data)
          console.log('dataResponse ====>', dataResponse)
          this.close()
          this.initialize()
        } catch (error) {
          console.log(error.message)
        }
      } else {
        try {
          var dataResponse = await this.axios.put('http://localhost:9000/reserveroom/' + this.idreserveroom, data)
          console.log('dataResponse ====>', dataResponse)
          this.close()
          this.initialize()
        } catch (error) {
          console.log(error.message)
        }
      }
    }
  }
}
</script>

    <style>

    </style>
