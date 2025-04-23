import express, { Request, Response } from 'express'
import prisma from '../utils';

const userRouter = express.Router(); 

userRouter.route('/signup').post(async (req: Request, res: Response) => {
    console.log("came to backend")

    const { username, password, phone_no, fullName } = req.body; 
    console.log(req.body)

    if (!username || !phone_no || !password || !fullName ) {
        return res.status(400).json({ status: false, message: "No data found" })
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                username
            }
        })

        if (existingUser) {
            return res.status(403).json({status: false, message: 'user already exists'}); 
        }

        const user = await prisma.user.create({
            data: {
                username, password, fullName, phone_no, dataComplete: false
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

        return res.status(200).json({status: true, message: "user logged in successfully", user})

    } catch(err) {
        console.log('login error: ', err)
    }
})

userRouter.route('/completeData').post(async (req: Request, res: Response) => {
    const { data, username } = req.body; 
    const { goal, gender, age, medication, sleepQuality } = data; 
    console.log(data, username)

    try {

        if (!goal || !gender || !age || !medication || !sleepQuality || !username) {
            return res.status(400).json({ status: false, data: {}, message: "Data missing" })
        }

        const updatedUser = await prisma.user.update({
            where: {
                username
            }, 
            data: {
                goal, age, gender, sleepQuality, medication, dataComplete: true
            }
        })

        return res.status(200).json({ status: false, data: updatedUser, message: "Data updated successfully" })


    } catch (err) {
        console.log("data complete err: ", err)
        return res.status(500).json({ status: false, data: {}, message: 'Internal server error' })
    }
})

userRouter.route('/addMood').post(async (req: Request, res: Response) => {
    const { username, date, mood } = req.body; 

    try {

        if (!username || !date || !mood) {
            return res.status(400).json({ status: false, message: "Data missing" })
        }

        const addedMood = await prisma.moodTrack.create({
            data: {
                username, date, mood
            }
        })

        return res.status(200).json({ status: true, message: "Mood added successfully", data: {mood: addedMood} })

    } catch(err) {
        console.log("Add mood error")
        return res.status(500).json({ status: false, message: "Internal server error" })
    }
})

userRouter.post('/getMoods', async (req: Request, res: Response) => {
    const { username } = req.body; 

    try {
    
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (!user) {
            return res.status(400).json({ status: false, message: "This user doesn't exist" })
        }

        const getMoods = await prisma.moodTrack.findMany({
            where: {
                username
            }, 
            select: {
                id: false, username: false, date: true, mood: true
            }
        })

        return res.status(200).json({ status: false, message: "Moods fetched successfully", moodData: getMoods })

    } catch (err) {
        console.log("getting mood data err: ", err)
        return res.status(500).json({ status: false, message: "Internal server error" })
    }
})

export default userRouter; 