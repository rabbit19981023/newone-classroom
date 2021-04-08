/** Import npm Modules **/
import express from 'express'
import expressHandlebars from 'express-handlebars'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import flash from 'connect-flash'
import path from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'
import dotenv from 'dotenv'

/** Import Custom Modules (custom middlewares) **/
import db from './db.js'
import handlebarsHelpers from './utils/handlebarsHelpers.js'
import passportAuth from './utils/passportAuth.js'

/** Import Routes Mapping Handler **/
// User
import authUserRoutes from './routes/authUser.routes.js'
import indexRoutes from './routes/index.routes.js'
import roomsReserveRoutes from './routes/roomsReserve.routes.js'

// Admin
import authAdminRoutes from './routes/authAdmin.routes.js'
import roomsAuditRoutes from './routes/roomsAudit.routes.js'
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
app.use(morgan('dev')) // tracking all the user requests in terminal
app.use(express.static('public'))
app.use(express.json()) // fetch JSON Data from received POST Requests
app.use(express.urlencoded({ extended: true })) // fetch Form Data from received POST Requests
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600 * 1000 * 6 * 2 }, // 600miles * 1000 * 6 = 1hr
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}))

// Custom Middlewares for Authentication with Passport.js
app.use(passportAuth.initialize())
app.use(passportAuth.session())
app.use(flash())

/** Routes **/
// User
app.use('/', authUserRoutes)
app.use('/', indexRoutes)
app.use('/rooms/reserve', roomsReserveRoutes)

// Admin
app.use('/admin', authAdminRoutes)
app.use('/admin/rooms/audit', roomsAuditRoutes)
app.use('/admin/rooms/list', roomsListRoutes)
app.use('/admin/rooms/time', roomsTimeRoutes)

// 404 Error Route
app.use('/', (req, res) => { return res.render('404error', { layout: 'error' }) })

/** Activating the Server **/
const PORT = process.env.PORT || 3000

app.listen(PORT, () => { console.log(`The Server is Running at PORT:${PORT}......`) })
