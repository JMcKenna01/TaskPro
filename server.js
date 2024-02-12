// Import necessary modules and files
import express from 'express'
import session from 'express-session'
import SequelizeStoreConstructor from 'connect-session-sequelize'
import exphbs from 'express-handlebars'
import path from 'path'
import { routes } from './controllers/index.js'
import { sequelize } from './config/connection.js'
import { helpers } from './utils/helpers.js'
import './scheduledTasks/index.js'; // Imported scheduledTasks for executing tasks at scheduled times

import { fileURLToPath } from 'url';

const SequelizeStore = SequelizeStoreConstructor(session.Store)
const app = express()
const PORT = process.env.PORT || 3001 // Set the port to a default value or use the environment variable if available
const hbs = exphbs.create({ helpers })

// using the import.meta.url property that contains the URL of the current module.
//The fileURLToPath function is used to convert the URL to a file system path
//__filename will contain the absolute path to the current file
const __filename = fileURLToPath(import.meta.url);

// The path module is used to extract the directory name from the absolute path stored in __filename
// the path.dirname function takes a file path as an argument and returns the directory portion of the path
// This would give __dirname the absolute path to the directory containing the current file
const __dirname = path.dirname(__filename);

const sess = {
  secret: 'Super secret secret', // Secret for signing the session ID cookie
  cookie: {
    maxAge: 600000, // Cookie expiration time in milliseconds
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: false, // Should be set to true in production for HTTPS
    sameSite: 'strict', // Strictly enforce same site cookie policy
  },
  resave: false, // Prevents session being saved back to the session store unless it was modified
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  store: new SequelizeStore({
    db: sequelize // Connects session store to Sequelize database
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine); // Set handlebars as the view engine
app.set('view engine', 'handlebars');

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies
app.use('/public', express.static(process.cwd() + '/public')); // Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files, ensuring the path compatibility

app.use(routes); // Use the routes defined in controllers

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`)); // Start the server and listen on the specified port
});
