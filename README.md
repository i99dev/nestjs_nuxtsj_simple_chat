# Nestjs & Nuxtjs $ socket.io
this very simple example of using socket.io with nestjs and nuxtjs
![github](./assets/nestjs.gif)

### Backend

- POST 🔒 `v1/api/chat/:receiverId/sendMessage` - send message to receiver
- GET  🔒 `v1/api/chat/:receiverId/messages` private chat messages
- GET  🔒 `v1/api/chat/messages` all messages
- GET  🔒 `v1/api/users` all users
- POST 🔓 `v1/api/auth/signup` - signup
- POST 🔓 `v1/api/auth/signin` - login
  
- for stream I use [socket.io](https://socket.io/) frontend listening on `conversation`


```js
 @WebSocketGateway({
    namespace: 'chat',
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
      allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept',
    },
  })
```

I add this to my API to make it work with socket.io on frontend

### Frontend
I use [nuxtjs](https://nuxtjs.org/) and [vuejs](https://vuejs.org/) and [tailwindcss](https://tailwindcss.com/) for styling
- `/chat` - chat page 🔒.
- `/login` - login page 🔓.
- `/register` - register page 🔓.
- `/` - home page 🔓.