const passport = require('passport')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook').OAuth2Strategy
const {User} = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackUrl: process.env.FACEBOOK_CALLBACK,
      profileFields: ['id', 'firstName', 'email']
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        {
          facebookId: profile.id,
          firstName: profile.firstName,
          email: profile.email
        },
        function(err, user) {
          return cb(err, user)
        }
      )
    }
  )
)

// passport.use(strategy)

router.get('/', passport.authenticate('facebook'))

router.get(
  '/callback',
  passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/login'
  })
)
