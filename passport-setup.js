const passport = require("passport");
const connection = require("./models/init_database").connection;

function createUser(name, email) {
  return new Promise((res, rej) => {
    connection.query(
      "SELECT * FROM accounts WHERE Email = ?",
      [email],
      function (error, results, fields) {
        if (results.length > 0) {
          res({"id":results[0].id,"profileimg":results[0]['img_url']});
        } else {
          connection.query(
            "INSERT INTO accounts (username,Email) VALUES (?,?)",
            [name, email],
            function (err, result) {
              if (err) rej(err);
              res();
            }
          );
        }
      }
    );
  });
}

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {

  // User.findById(id, function (err, user) {
  done(null, user);
  // });
});

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1045211242467-8o7muise14ohj3g76nb699f0tifqe5l1.apps.googleusercontent.com",
      clientSecret: "Vp-s7DWKrqI5x8aBh2z4__h7",
      callbackURL: "http://localhost:3000/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
      const email = profile.emails[0].value;
      const name = profile.displayName;

      createUser(name, email)
        .then((obj) => {
          profile.appId = obj.id;
          profile.profileimg=obj.profileimg;
        })
        .then(() => {
          done(null, profile);
        })
        .catch((e) => {

        });

    }
  )
);
