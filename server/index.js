require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authControllers')

const {CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()
const PORT = 4000

app.use(express.json())


app.post('/auth/register', authCtrl.register)

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
