<template>
  <div class="container mx-auto">
    <div class="lg:flex">
      <div class="w-full pl-16 mt-6 hidden lg:block">
      <button
        v-if="$store.state.auth.isAuthenticated"
        @click="logout"
        class="mx-2 my-2 bg-white transition w-30 duration-150 ease-in-out focus:outline-none rounded text-gray-800 border border-gray-300 px-16 py-4 text-xl"
      >
        log out
      </button>
        <div class="border  flex flex-col justify-between">
          <!-- CHAT -->
          <div>
            <div class="overflow-y-scroll" id="search">
              <div class="p-8 flex flex-col">
                <!-- massages -->
                <div v-for="(m, i) in _all_messages" :key="i" class="w-full pr-36">
                  <p class="shadow p-1 rounded">
                    {{m.message}}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- CHAT -->
          <div class="h-16 border-t">
            <div class="flex h-full">
              <div class="w-16 h-full flex items-center justify-center"></div>
              <input
              v-model="message"
                class="w-full focus:outline-none text-gray-700"
                placeholder="Type Something here"
              />
              <div class="flex">
                <div
                @click="sendMessage"
                  class="w-16 h-full flex items-center justify-center bg-indigo-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-send"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#FFFFFF"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                    <path
                      d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import socket from '../../plugins/socket.io.js'
interface Message {
  message: string
  senderId: string
  receiverId: string
} // interface Message

export default Vue.extend({
  name: 'Classified',
  middleware: 'auth',
    data() {
        return {
        all_messages: [] as Message[],
        message: '',
        senderId: '',
        receiverId: '',
        }
    },
  beforeMount() {
    socket.on('conversation', (message: Message) => {
      this.all_messages.push(message)
    })
  },
  computed:{
    _all_messages(): Message[] {
      return this.all_messages
    },
    _get_user_id(): any {
      //@ts-ignore
      return this.$store.getters['auth/user']
    }
  },

  methods: {
   async sendMessage(): Promise<void> {
    const userId =localStorage.getItem('user')
    let token = localStorage.getItem('token')
      await this.$axios.post(`/chat/${JSON.parse(userId).id}/sendMessage`, {
        message: this.message,
      },{

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then((r) => {
        console.log(r)
      }).catch((err) => {
        console.log('error',err)
      })
      this.message = ''
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.reload()
    },
  },

})
</script>
