const router = require('express').Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;
const meetingController = require('../controllers/meeting.controller');


// when press join redirect me to home page
router.post('/room',   bodyParser.urlencoded({ extended: true }),
check("meetingid")
    .not()
    .isEmpty()
    .withMessage("meetingid is required"),
check("clientname")
    .not()
    .isEmpty()
    .withMessage("your name is required")
    .isLength({ min: 6 })
    .withMessage("your name must be at least 6 charachters")

, meetingController.getRoom);
// router.get("/meeting/:room", meetingController.geVideoRoom);

// when press cancel redirect me to welcome page
router.get('/back', meetingController.getBackToMeeting);


module.exports = router