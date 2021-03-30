const { Pool } = require('pg');


const connection = new Pool({
	host: 'ec2-54-166-242-77.compute-1.amazonaws.com',
	user: 'qtejlwvicxvdmh',
	password:
		'c59fbd39aa2a102ddb2134322bbc959b5d951945ed4e54674369c1f8c2fda77a',
	port: '5432',
	database: 'd6hvuldrtd9gal',
	ssl: {
		rejectUnauthorized: false,
	},
});




module.exports.connection = connection