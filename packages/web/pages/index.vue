<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-row w-full justify-center">
      <button
        v-if="!$store.state.auth.isAuthenticated"
        @click="$router.push('/login')"
        class="mx-2 my-2 bg-white transition w-30 duration-150 ease-in-out focus:outline-none rounded text-gray-800 border border-gray-300 px-16 py-4 text-xl"
      >
        login
      </button>
      <button
        v-if="$store.state.auth.isAuthenticated"
        @click="logout"
        class="mx-2 my-2 bg-white transition w-30 duration-150 ease-in-out focus:outline-none rounded text-gray-800 border border-gray-300 px-16 py-4 text-xl"
      >
        log out
      </button>
      <button
        @click="$router.push('/register')"
        class="mx-2 my-2 bg-white transition w-30 duration-150 ease-in-out focus:outline-none rounded text-gray-800 border border-gray-300 px-16 py-4 text-xl"
      >
        register
      </button>
    </div>
    <div
      v-if="$store.state.auth.isAuthenticated"
      class="flex flex-row text-center justify-center"
    >
      <div>
        You'r login now you can go to chat by<a
          class="text-blue-600 font-bold underline"
          >press Link</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.reload()
    },
  },
})
</script>

<style></style>
