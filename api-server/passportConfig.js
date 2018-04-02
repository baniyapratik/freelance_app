const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'lab2',
  password: 'lab2',
  port: '8889',
  database: 'Projects'
});

module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    console.log('serialize');
    console.log(user);
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((user, done) => {
    console.log('deserialize');
    console.log(user);
    done(null, user.id);
  });
  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        // callback with email and password from our form
        email = req.body.email;
        password = req.body.password;
        connection.query(
          "SELECT * FROM `users` WHERE `email` = '" + email + "'",
          function(err, rows) {
            if (err) return done(err);
            if (!rows.length) {
              return done(
                null,
                false,
                req.flash('loginMessage', 'No user found.')
              ); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (!(rows[0].password == password))
              return done(
                null,
                false,
                req.flash('loginMessage', 'Oops! Wrong password.')
              ); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, rows[0]);
          }
        );
      }
    )
  );
};
