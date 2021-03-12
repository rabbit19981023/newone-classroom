import express from 'express'
import expressHandlebars from 'express-handlebars'
import path from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'
import dotenv from 'dotenv'
import db from './db.js' // custom mudule
import handlebarsHelpers from './lib/handlebarsHelpers.js' // custom module
import indexRoutes from './routes/index.routes.js'
import adminRoutes from './routes/admin.routes.js'

/** Configurations **/
dotenv.config()
db.connect()
handlebarsHelpers.activate()

const app = express() // create a express application instance

// setting the views dir of MVC
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.set('views', path.resolve(__dirname, 'views'))

app.engine('handlebars', expressHandlebars.create().engine)
app.set('view engine', 'handlebars')

/** Middlewares **/
app.use(morgan('dev')) // checking all the user requests in terminal
app.use(express.static('public'))
app.use(express.json()) // fetch JSON Data from received POST Requests
app.use(express.urlencoded({ extended: true })) // fetch Form Data from received POST Requests

/** Routes **/
app.use('/index/', indexRoutes)
app.use('/admin/', adminRoutes)

/** Activating the Server **/
const PORT = process.env.PORT

app.listen(PORT, () => { console.log(`The Server is Running at PORT:${PORT}......`) })
