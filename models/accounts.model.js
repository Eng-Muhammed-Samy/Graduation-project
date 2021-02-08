const connection = require("../models/init_database").connection;
const bcrypt = require("bcrypt");


exports.createAccount = function(username, useremail, password) {
    return new Promise((resolve, reject) => {
        // check unique email address
        var sql = "SELECT * FROM accounts WHERE Email =?";
        connection.query(sql, [useremail], function(err, data, fields) {
            if (err) reject(err)
            if (data.length >= 1) {
                var msg = useremail + " was already exist";
                reject(msg)
            } else {
                // encryption to passwprd when register before saving it in dtabase
                bcrypt.hash(password, 10, function(err, hash) {
                    if (err) console.log(err);
                    password = hash;
                    // insert the record into accounts table if the email doesnot excist
                    connection.query(
                        "INSERT INTO accounts (username,Email,password) VALUES (?,?,?)", [username, useremail, password],
                        function(err, result) {
                            if (err) reject(err)
                            resolve()
                        }
                    );
                });
            }
        });
    })
}

exports.authAccount = function(email, pass) {
    return new Promise((res, rej) => {
        if (email && pass) {
            connection.query(
                "SELECT * FROM accounts WHERE Email = ?", [email],
                function(error, results, fields) {
                    if (results.length > 0) {
                        // compare the input password when login to the saved hased password in database
                        const hashedpassword = results[0]["password"];
                        bcrypt.compare(pass, hashedpassword, function(err, response) {
                            if(response) {
                                res(
                                    {"id":results[0].id ,
                                    "username":results[0]['username'],
                                    "userEmail":results[0]['Email'] ,
                                    "profileimg":results[0]['img_url']  
                                    });
                            } else {
                                rej('incorrect pass')
                            } 
                          });
                    } else {
                        rej("Incorrect UserEmail and/or Password!");
                    }
                }
            );
        } else {
            rej("Please enter your Email and Password!");
        }
    })

}



exports.saveImageUrl=(logedinemail,namefile)=>{
    return new Promise((res, rej) => {
       var query = 'UPDATE accounts SET img_url = ? WHERE Email = ?';
      
       connection.query(query,[namefile,logedinemail], function(err,result){
                       if (err) console.log(err);
                            res();
                       } 
                   
               );
       
       })
   }