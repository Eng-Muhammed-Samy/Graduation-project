const { Pool } = require('pg');


const connection = new Pool({
	host: 'ec2-3-91-127-228.compute-1.amazonaws.com',
	user: 'ykpkcybaauradp',
	password:
		'445569c30ab5ca4807c8f3d051a031b8c9dc2ed71709811ed048cda8aa0a03c5',
	port: '5432',
	database: 'd9ou5t95ridkjr',
	ssl: {
		rejectUnauthorized: false,
	},
});




module.exports.connection = connection