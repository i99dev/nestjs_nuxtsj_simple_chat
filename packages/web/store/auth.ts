
export const state = () => ({
    user: null,
    token: null,
    tokenExpiration: null,
    tokenRefresh: null,
    isAuthenticated: localStorage.getItem('token') ? true : false,
  })
