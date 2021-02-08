const router = require('express').Router()
const welcomeController = require('../controllers/welcome.controller')


// show welcome page
router.get('/',welcomeController.getWelcome)

// when press sign in go to sign in page
router.get('/signin', welcomeController.getSignIn)

// when press join meeting redirect me to meeting page
router.get('/joinmeeting',
welcomeController.getMeeting)



module.exports=router