const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


const userRoute = require('./routes/userRoute')
const messageRoute = require('./routes/messageRoute');
const cloudinaryRoute = require('./routes/cloudinaryRoute');
const { Server } = require('socket.io');

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/user', userRoute)
app.use('/api/messages', messageRoute)
app.use('/api/cloudinary', cloudinaryRoute)
app.use((error) => { console.log(error) });

const server = app.listen(port, () => {
    console.log("Server is listening to port ", port)
})
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
})

global.onlineUsers = new Map();
global.inChatUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
        socket.broadcast.emit('online-users', {
            onlineUsers: Array.from(onlineUsers.keys())
        })
    })

    socket.on("signout", (id) => {
        onlineUsers.delete(id);
        socket.broadcast.emit('online-users', {
            onlineUsers: Array.from(onlineUsers.keys())
        })
    })
    socket.on('send-msg', data => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", {
                from: data.from,
                message: data.message
            })
        }
    })
    socket.on('in-chat', data => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            const temp = inChatUsers.get(data.to)
            if (temp) {
                const alreadyExists = temp.includes(data.from)
                if (!alreadyExists) {
                    inChatUsers.set(data.to, [...temp, data.from])
                }
            } else {
                inChatUsers.set(data.to, [data.from])
            }
            socket.to(sendUserSocket).emit("in-chat", {
                userId: data.from
            })
        }
    })
    socket.on('out-chat', data => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            const temp = inChatUsers.get(data.to)
            if (temp) {
                const temp2 = temp.filter(x => x !== data.from)
                inChatUsers.set(data.to, [...temp2])
                socket.to(sendUserSocket).emit("out-chat", {
                    arr: inChatUsers.get(data.to)
                })
            }
        }
    })
})
