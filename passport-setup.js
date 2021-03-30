/** @format */

const passport = require('passport');
const connection = require('./models/init_database').connection;

function createUser(name, email, profileImg) {
	return new Promise((res, rej) => {
		connection.query(
			'SELECT * FROM accounts WHERE email = $1',
			[email],
			function (error, results, fields) {
				if (results.rows.length > 0) {
					res({
						id: results.rows[0].id,
						profileimg: results.rows[0]['img_url'],
					});
				} else {
					connection.query(
						'INSERT INTO accounts (username,Email, img_url) VALUES ($1,$2,$3) RETURNING id',
						[name, email, profileImg],
						function (err, result) {
							if (err) rej(err);
							res({
								id: result.rows[0].id,
								profileimg:profileImg
							});
						},
					);
				}
			},
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

const GoogleStrategy = require('passport-google-oauth20').Strategy;

// mohammed hassan
passport.use(
	new GoogleStrategy(
		{
			clientID:
				'1045211242467-8o7muise14ohj3g76nb699f0tifqe5l1.apps.googleusercontent.com',
			clientSecret: 'Vp-s7DWKrqI5x8aBh2z4__h7',
			callbackURL: 'https://test-mysql-2021.herokuapp.com/google/callback',
		},
		async function (accessToken, refreshToken, profile, done) {
			/*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
			const email = profile.emails[0].value;
			const name = profile.displayName;
			const profileImg = profile.photos[0].value;

			createUser(name, email, profileImg)
				.then((obj) => {
					profile.appId = obj.id;
					profile.profileimg = obj.profileimg;
				})
				.then(() => {
					done(null, profile);
				})
				.catch((e) => {});
		},
	),
);

