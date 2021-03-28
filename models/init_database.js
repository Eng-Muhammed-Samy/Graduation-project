const { Pool } = require('pg');


const connection = new Pool({
	host: 'ec2-23-21-229-200.compute-1.amazonaws.com',
	user: 'pqaltkpihgddst',
	password:
		'490fee745650b2d072bdcf56e09a917857415c9922df77a68c838e46e002206f',
	port: '5432',
	database: 'dfvf76on7los5',
	ssl: {
		rejectUnauthorized: false,
	},
});




module.exports.connection = connection