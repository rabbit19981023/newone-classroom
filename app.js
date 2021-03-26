/** Import npm modules **/
import express from 'express'
import expressHandlebars from 'express-handlebars'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import flash from 'connect-flash'
import path from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'
import dotenv from 'dotenv'

/** Import custom modules (custom middlewares) **/
import db from './db.js'
import handlebarsHelpers from './lib/handlebarsHelpers.js'
import passport from './lib/auth.js'

/** Import routes mapping handler **/
import authUserRoutes from './routes/authUser.routes.js'
import authAdminRoutes from './routes/authAdmin.routes.js'

import indexRoutes from './routes/index.routes.js'
import roomsListRoutes from './routes/roomsList.routes.js'
import roomsTimeRoutes from './routes/roomsTime.routes.js'

/** Configurations **/
dotenv.config()
db.connect()
handlebarsHelpers.activate()

const app = express() // create a express application instance

// Setting the views dir of MVC
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
app.use(session({
  secret: "New One Church",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600 * 1000 * 6 * 2 },
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

/** Routes **/
app.use('/', authUserRoutes)
app.use('/admin', authAdminRoutes)

app.use('/', indexRoutes)
app.use('/admin/rooms/list', roomsListRoutes)
app.use('/admin/rooms/time', roomsTimeRoutes)

/** Activating the Server **/
const PORT = process.env.PORT || 3000

app.listen(PORT, () => { console.log(`The Server is Running at PORT:${PORT}......`) })
