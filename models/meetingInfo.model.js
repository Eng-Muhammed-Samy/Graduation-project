const connection = require("../models/init_database").connection;




exports.SaveMeetingInfo=(meetingId,hostname,password, meeting_url)=>{
     return new Promise((resolve, reject) => {        
        connection.query(
            "INSERT INTO meetinginfo (meeting_id,hostname,meetingpassword,URL,validity) VALUES (?,?,?,?,?)", [meetingId, hostname, password,meeting_url,true],
            function(err, result) {
                if (err) reject(err)
                resolve()
            }   
        )
     });  

}
exports.checkMeetingId=(meetingid)=>{
    return new Promise((res, rej) => {
        if (meetingid) {
            connection.query(
                "select * FROM meetingInfo WHERE meeting_id = ?",[meetingid],
                 function(error, results, fields) {
                    if(error) console.log(error);
                    if (results.length > 0) {

                        if(results[0].validity==true){
                            res(); 
                        }else{
                            rej('invalid meeting')
                        }
                    }else{
                         rej('no meeting with this id')
                    } 
                }
            );
        } else {
            rej("Please enter meetingid");
        }
    })
}
exports.clearvalidity=(meetingid)=>{
   console.log(meetingid)
    return new Promise((res, rej) => {
        if (meetingid) {
            connection.query(
                "select * FROM meetingInfo WHERE meeting_id = ?", [meetingid],
                function(error, results, fields) {
                  if(error) console.log(error)
                    if (results.length > 0) {
                     connection.query("UPDATE meetingInfo SET validity=false WHERE meeting_id =?",[meetingid],function(err,result){
                         if (err) console.log(err);
                           res();
                     })
                  
                    } 
                }
            );
        }
    })
}

exports.checkId=(meetingid)=>{ 
    return new Promise((res, rej) => {
            connection.query(
                "SELECT * FROM meetingInfo WHERE meeting_id = ?", [meetingid],
                function(error, results, fields) {
                    if (error) console.log(error);
                    if (results.length >0 && results[0].validity==true) {
                      res({
                          "meetingid":results[0].meeting_id,
                          "hostname":results[0].hostname,
                          "password":results[0].meetingpassword,
                          "meetingurl":results[0].URL
                      })
                    }else{
                        rej("invalid meetingid")
                    } 
                }
            );    
    })
}