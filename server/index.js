require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authControllers')
const treasureCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')

const {CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()
const PORT = 4000

app.use(express.json())


app.post('/auth/register', authCtrl.register)

app.post('/auth.login', authCtrl.login)

app.get('/auth/logut', authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)

app.get('/api/treasure.user', treasureCtrl.getUserTreasure) 

app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  }).then(db => {
    app.set('db', db);
    console.log('db connected');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  });

app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
)
