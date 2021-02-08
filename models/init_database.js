const mysql = require("mysql");
/**
 *   host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE,
 */
let connection = mysql.createConnection({
    host: "brfnusfs3krubuwao6wf-mysql.services.clever-cloud.com",
    user: "unqwdfiqxbgdwnlt",
    password: "w6wTTj2A9fnRvk0Lkv85",
    port: "3306",
    database: "brfnusfs3krubuwao6wf",
});




module.exports.connection = connection