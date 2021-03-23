const router = require('express').Router();
const loginController = require('../controllers/login.controller')
const bodyParser = require("body-parser");
const check = require("express-validator").check;



router.post("/signup", 
bodyParser.urlencoded({ extended: true }),
check("username")
    .not()
    .isEmpty()
    .withMessage("username is required"),
check("emailAddress")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid format"),
check("password")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 charachters"),
check("passwordCon")   
    .not()
    .isEmpty()
    .withMessage("confirm password is required")
    .isLength({ min: 8 })
    .withMessage("confirmed password must be at least 8 charachters")
    .custom((value,{req, loc, path}) => {
        if (value !== req.body.password) {      
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    })
,loginController.postSignup);

router.post("/auth", 
bodyParser.urlencoded({ extended: true }),
check("loginemail")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid format"),
check("loginPassword")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 charachters")
,loginController.authLogin);

router.get("/profile", loginController.handleAuth);

router.all("/logout", loginController.logout);

module.exports = router