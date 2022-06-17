import io from 'socket.io-client'
const socket = io("http://localhost:4000/chat",{
  withCredentials: true,
  extraHeaders: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
export default socket
