const getPrismaInstance = require("../prisma/prismaClient")

exports.addMessage = async (req, res, next) => {
    try {
        const prisma = getPrismaInstance()
        const { id, message, from, to, type } = req.body
        const getUser = onlineUsers.get(to)
        // const getUserInChat = inChatUsers.get(to)?.includes(from)
        if (message && from && to) {
            const newMessage = await prisma.messages.create({
                data: {
                    message,
                    sender: { connect: { id: from } },
                    receiver: { connect: { id: to } },
                    messageStatus: getUser ? "delivered" : "sent",
                    type,
                    id
                },
                include: {
                    sender: true, receiver: true
                }
            })
            return res.status(201).json({ message: newMessage })
        }
        return res.status(400).json({ message: "Need all required payload" })
    } catch (error) {
        next(error)
    }
}


exports.getMessages = async (req, res, next) => {
    try {
        const prisma = getPrismaInstance()
        const { from, to } = req.params
        const messages = await prisma.messages.findMany({
            where: {
                OR: [{
                    senderId: from,
                    receiverId: to
                },
                {
                    senderId: to,
                    receiverId: from
                }],
            },
            orderBy: {
                id: "desc"
            }
        })
        const unreadMessages = []
        messages.forEach((message, index) => {
            if (message.messageStatus !== "read" && message.senderId === to) {
                messages[index].messageStatus = "read"
                unreadMessages.push(message.id)
            }
        })
        await prisma.messages.updateMany({
            where: {
                id: { in: unreadMessages }
            },
            data: {
                messageStatus: "read"
            }
        })
        res.status(200).json({ messages })
    } catch (error) {
        next(error)
    }
}

exports.getMessageList = async (req, res, next) => {
    try {
        const userId = req.params.from
        const prisma = getPrismaInstance()
        const users = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                sentMessage: {
                    include: {
                        receiver: true,
                        sender: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                receivedMessage: {
                    include: {
                        receiver: true,
                        sender: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
            }
        })

        const messages = [...users.sentMessage, ...users.receivedMessage]
        messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        const usersList = new Map()
        const messageStatusChange = []

        messages.forEach(msg => {
            const isSender = msg.senderId === userId
            const calculatedId = isSender ? msg.receiverId : msg.senderId
            if (msg.messageStatus === 'sent') {
                messageStatusChange.push(msg.userId)
            }

            if (!usersList.get(calculatedId)) {
                const { id, type, message, messageStatus, createdAt, senderId, receiverId } = msg
                let user = {
                    messageId: id, type, message, messageStatus, createdAt, senderId, receiverId
                }
                if (isSender) {
                    user = {
                        ...user,
                        ...msg.receiver,
                        totalUnreadMesages: 0
                    }
                }
                else {
                    user = {
                        ...user,
                        ...msg.sender,
                        totalUnreadMesages: messageStatus !== "read" ? 1 : 0
                        // totalUnreadMesages: 0
                    }
                }
                usersList.set(calculatedId, { ...user })
            }
            else if (msg.messageStatus !== "read" && !isSender) {
                const user = usersList.get(calculatedId)
                usersList.set(calculatedId, {
                    ...user,
                    totalUnreadMesages: user.totalUnreadMesages + 1
                })
            }
        })
        if (messageStatusChange.length) {
            await prisma.messages.updateMany({
                where: {
                    id: { in: messageStatusChange }
                },
                data: {
                    messageStatus: "delivered"
                }
            })
        }

        return res.status(200).json({ usersListIds: Array.from(usersList.keys()), usersList: Array.from(usersList.values()), onlineUsers: Array.from(onlineUsers.keys()), inChatUsers: inChatUsers.get(userId) || [] })

    } catch (error) {
        next(error)
    }
}