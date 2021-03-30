const router = require('express').Router();
const check = require("express-validator").check;
const path = require('path');
const profileController = require('../controllers/profile.controller');
const multer = require('multer')

const uploader = multer({
  storage: multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, "public/upload_images/");
      },
      filename: (req, file, cb) => {
          cb(null, file.originalname);
      }
  })
})

router.get("/newmeeting",  profileController.createNewMeeting);


router.get("/meeting/:room", profileController.geVideoRoom);

router.post(
	'/imageprofile',
	uploader.single('uploaded_image'),
	check('uploaded_image').custom((value, { req }) => {
		if (!req.file) {
			throw new Error('no file is uploaded!');
		}
		var img_name = req.file.originalname;
		var extension = path.extname(img_name).toLowerCase();

		if (
			extension == '.jpeg' ||
			extension == '.jpg' ||
			extension == '.png' ||
			extension == '.gif'
		) {
			return true;
		} else {
			throw new Error('Only image files are allowed!');
		}
	}),
	profileController.getProfileImage,
);
router.get('/schedule', profileController.getScedule);
module.exports = router;