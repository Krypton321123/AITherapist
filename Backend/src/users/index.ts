import express, { Request, Response } from 'express'
import prisma from '../utils';

const userRouter = express.Router(); 

userRouter.route('/signup').post(async (req: Request, res: Response) => {
    console.log("came to backend")

    const { username, email, password, confirmPassword } = req.body; 
    console.log(req.body)

    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ status: false, message: "No data found" })
    }

    try {

        if (password !== confirmPassword) {
            return res.status(400).json({ status: false, message: 'password did not matched' }); 
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                username, email
            }
        })

        if (existingUser) {
            return res.status(403).json({status: false, message: 'user already exists'}); 
        }

        const user = await prisma.user.create({
            data: {
                username, email, password
            }
        })
        console.log(user)

        return res.status(200).json({ status: true, user, message: 'user successfully created' }); 

    } catch (err) {
        console.log('signup error: ', err)
        return res.status(500).json({status: false, message: "Internal server error"})
    }
})

userRouter.route("/login").post(async (req: Request, res: Response) => {
    const { username, password } = req.body; 

    try {

        const user = await prisma.user.findFirst({
            where: {
                username
            }
        })

        if (!user) {
            return res.status(403).json({ status: false, message: "user doesn't exist with this username" })
        }

        if (user.password !== password) {
            return res.status(403).json({ status: false, message: 'Password not matching, try again' })
        }

        return res.status(200).json({status: true, message: "user logged in successfully", userId: user.user_id})

    } catch(err) {
        console.log('login error: ', err)
    }
})

export default userRouter; 