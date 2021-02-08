const router = require('express').Router();
const check = require("express-validator").check;
const path = require('path');
const profileController = require('../controllers/profile.controller');


router.get("/newmeeting",  profileController.createNewMeeting);


router.get("/meeting/:room", profileController.geVideoRoom);

router.post("/imageprofile",
check("uploaded_image")   
    .custom((value,{req}) => {
      if(!req.files){
        throw  new Error('no file is uploaded!');
      }
      var file = req.files.uploaded_image;
      var img_name=file.name; 
      var extension = (path.extname(img_name)).toLowerCase();
    
      if(extension=='.jpeg'||extension=='.jpg'||extension=='.png'||extension=='.gif') {
              return true;     
      }else{
          throw new Error('Only image files are allowed!');
      }
      })
    ,profileController.getProfileImage)
module.exports = router;