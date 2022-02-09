const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = "370888287328-9k2mss1tvriqvoregdm2m45u9pbmrj3u.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback"
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser( function(user, done) {
  done(null, user)
})

passport.deserializeUser( function(user, done) {
  done(null, user)
})