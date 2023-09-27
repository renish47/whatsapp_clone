const getPrismaInstance = require("../prisma/prismaClient");


exports.checkUser = async (req, res, next) => {
    try {
        const email = req.params.email
        if (!email) {
            return res.status(400).json({ message: "Email is required", status: false })
        }
        const prisma = getPrismaInstance()
        const user = await prisma.user.findUnique({
            where: { email }, select: {
                id: true,
                email: true,
                name: true,
                image: true,
                about: true,
                newUser: true
            }
        })
        return res.json({ message: "User found", user })
    } catch (error) {
        next(error)
    }
}

exports.addNewUser = async (req, res, next) => {
    try {
        const { email, name, about, image } = req.body
        if (!email || !name || !image)
            return res.status(400).json({ message: "Email , Name & Image are required" })
        const prisma = getPrismaInstance()
        const oldUser = await prisma.user.findUnique({ where: { email } })
        if (oldUser) {
            return res.status(200).json({ message: "User already exists", oldUser })
        }
        const user = await prisma.user.create(
            {
                data: {
                    email, name, about: "", image, newUser: true
                }
            })
        return res.status(201).json({ message: "User successfully Added" })
    } catch (error) {
        console.log(error)
    }
}


exports.updateUser = async (req, res, next) => {
    try {
        const { email, name, about, image } = req.body
        if (!email || !name || !image)
            return res.status(400).json({ message: "Email, Name, About & Image are required" })
        const prisma = getPrismaInstance()
        const user = await prisma.user.update(
            {
                where: { email },
                data: {
                    name, about, image, newUser: false
                }
            })
        return res.status(201).json({ message: "User successfully updated", user })
    } catch (error) {
        console.log(error.message)
    }
}

exports.getAllUser = async (req, res, next) => {
    try {
        const email = req.params.email
        const prisma = getPrismaInstance()
        const users = await prisma.user.findMany({
            where: {
                NOT: {
                    email
                }
            },
            orderBy: { name: "asc" },
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                about: true
            }
        })
        const usersGroupedByInitialLetters = {}
        users.forEach(user => {
            const initialLetter = user.name.charAt(0).toUpperCase()
            if (!usersGroupedByInitialLetters[initialLetter]) {
                usersGroupedByInitialLetters[initialLetter] = []
            }
            usersGroupedByInitialLetters[initialLetter].push(user)
        });
        return res.status(200).json({ usersGroupedByInitialLetters, users, message: "Users Fetched Successfully" })
    } catch (error) {
        next(error)
    }
}