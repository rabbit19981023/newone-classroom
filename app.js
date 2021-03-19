/** import modules **/
import express from 'express'
import expressHandlebars from 'express-handlebars'
import path from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'
import dotenv from 'dotenv'

/** import custom modules **/
import db from './db.js'
import handlebarsHelpers from './lib/handlebarsHelpers.js'

/** import custom routes **/
import indexRoutes from './routes/index.routes.js'
import roomsListRoutes from './routes/roomsList.routes.js'
import roomsTimeRoutes from './routes/roomsTime.routes.js'

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
app.use('/', indexRoutes)
app.use('/admin/rooms/list', roomsListRoutes)
app.use('/admin/rooms/time', roomsTimeRoutes)

/** Activating the Server **/
const PORT = process.env.PORT || 3000

app.listen(PORT, () => { console.log(`The Server is Running at PORT:${PORT}......`) })
