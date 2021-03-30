const { Pool } = require('pg');


const connection = new Pool({
	host: 'ec2-18-204-101-137.compute-1.amazonaws.com',
		user: 'fmgspodjysewsi',
		password:
			'd0436c0f8bbdd18805b687560aaf258debea02bed65cd9b2f668655feb1bf27a',
		port: '5432',
		database: 'dauble9af7n334',
	ssl: {
		rejectUnauthorized: false,
	},
});




module.exports.connection = connection