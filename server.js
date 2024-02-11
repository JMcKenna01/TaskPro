import express from 'express'
import session from 'express-session'
import SequelizeStoreConstructor from 'connect-session-sequelize'
import exphbs from 'express-handlebars'
import path from 'path'
import { routes } from './controllers/index.js'
import { sequelize } from './config/connection.js'
import { helpers } from './utils/helpers.js'
import './models/Index.js'

import { fileURLToPath } from 'url';

const SequelizeStore = SequelizeStoreConstructor(session.Store)
const app = express()
const PORT = process.env.PORT || 3001
const hbs = exphbs.create({ helpers })

// using the import.meta.url property that contains the URL of the current module.
//The fileURLToPath function is used to convert the URL to a file system path
//__filename will contain the absolute path to the current file
const __filename = fileURLToPath(import.meta.url);

//The path module is used to extract the directory name from the absolute path stored in __filename
//the path.dirname function takes a file path as an argument and returns the directory porttion of the path
//This would give __dirname the absolute path to the directory containing the current file
const __dirname = path.dirname(__filename);

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 600000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}

app.use(session(sess))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(express.static(path.join(toString(process.cwd), 'public')))
// app.use('/css',express.static(path.join(toString(process.cwd),'public/css')))
// app.use('/js',express.static(path.join(toString(process.cwd),'public/js')))
app.use('/public', express.static(process.cwd() + '/public'));
app.get('/test', (req, res) => res.sendFile(path.join(process.cwd(), '/public/test.html')));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes)

sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log('Now listening on localhost:3001'))
})

