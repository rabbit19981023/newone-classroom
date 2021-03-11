import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'
import dotenv from 'dotenv'
import db from './db.js'
import homeRoutes from './routes/home.routes.js'

/** Configurations **/
dotenv.config()
db.connect()

const app = express() // create a express application instance

// setting the views dir of MVC
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.set('views', path.resolve(__dirname, 'views'))

/** Middlewares **/
app.use(morgan('dev')) // checking all the user requests in terminal
app.use(express.json()) // fetch JSON Data from received POST Requests
app.use(express.urlencoded({ extended: true })) // fetch Form Data from received POST Requests

/** Routes **/
app.use('/home/', homeRoutes)

/** Activating the Server **/
const PORT = process.env.PORT

app.listen(PORT, () => { console.log(`The Server is Running at PORT:${PORT}......`) })
