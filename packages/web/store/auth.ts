
export const state = () => ({
    user: {ssss:'sssss'},
    token: null,
    tokenExpiration: null,
    tokenRefresh: null,
    isAuthenticated: localStorage.getItem('token') ? true : false,
  })

  export const mutations = {
    setUser(state:any, user:any) {
      state.user = user
    }
  }

  export const actions = {}

  export const getters = {
    isAuthenticated(state:any) {
      return state.isAuthenticated
    },
  }
