
const MeetingInfoModel = require('../models/meetingInfo.model');
exports.destroyMeeting=(req,res,next)=>{
  const meetingid=req.session.meetingid;
    if(req.session.meetingcreater){
      MeetingInfoModel.clearvalidity(meetingid).then(()=>{
        req.session.meetingcreater=false;
        res.redirect("/profile");
      })
  }else{
    res.redirect("/profile");
  }
};





const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');
exports.uploadFile = (req, res) => {
    const busboy = new Busboy({ headers: req.headers });
    req.pipe(busboy);
    busboy.on('file', (fieldname, file, filename) => {
        const ext = path.extname(filename);
        const newFilename = `${Date.now()}${ext}`;
        req.newFilename = newFilename;
        req.originalFilename = filename;
        const saveTo = path.join('uploads', newFilename);
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', () => {
        res.json({
            originalFilename: req.originalFilename,
            newFilename: req.newFilename
        });
    });
}