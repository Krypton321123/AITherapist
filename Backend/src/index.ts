import app from './app.js'
import dotenv from 'dotenv'

dotenv.config()

const start = async () => {
    const displayURL = `http://localhost:${process.env.PORT}`; 
 
    app.listen(process.env.PORT, () => {
        console.log("App listening on: ", displayURL)
    })
}

start().catch((err) => {
    console.log("Error in starting the app: ", err)
}); 