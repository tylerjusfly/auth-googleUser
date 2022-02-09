const express = require('express')
const passport = require('passport')
const session = require('express-session')
require('./auth')

function isLoggedIn(req, res ,next){
  req.user ? next() : res.sendStatus(401)
}

const app = express()
app.use(session( { secret : 'cats' } ))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('<a href ="auth/google"> Login with Google </a>')
})

app.get('/auth/google', passport.authenticate('google', { scope : ['email', 'profile'] }))

app.get('/google/callback',
    passport.authenticate('google', {
      successRedirect : '/protected',
      failureRedirect : '/auth/failure'
    })
)

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`welcome ${req.user.displayName}`)
  console.log(req.user)
})

app.get('/auth/failure', (req, res) => {
  res.send('<h1> something went wrong.... </h1>')
})

app.get('/logout', (req, res) => {
  req.logOut();
  req.session.destroy()
  res.send('goodbye')
})

app.listen('5000', () => {
  console.log('app is listening on port :5000')
})