const { Pool } = require('pg');


const connection = new Pool({
	host: 'ec2-54-235-108-217.compute-1.amazonaws.com',
	user: 'erkobenltnpsrr',
	password:
		'ece092e08e542834db62a464493b612f66ea638555853e101367e1440b32783c',
	port: '5432',
	database: 'd8n0sg4bgdtj9e',
	ssl: {
		rejectUnauthorized: false,
	},
});




module.exports.connection = connection