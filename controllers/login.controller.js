const accountsModel = require('../models/accounts.model')
const bodyParser = require("body-parser");
const validationResult = require("express-validator").validationResult;

exports.postSignup = function(request, response,next) {
    if (validationResult(request).isEmpty()) {  
    accountsModel
        .createAccount(
            request.body.username,
            request.body.emailAddress,
            request.body.password
        )
        .then(() => {
             response.redirect("/signin");
        })
        .catch((err) => {
          
            request.flash("authError", err);
            request.flash("authErrorType", "signup");
            response.redirect("/signin#signup");
        });
    } else {
    
        request.flash("validationErrors", validationResult(request).array());
        response.redirect("/signin#signup");
    }

};

exports.authLogin =  (req, res, next) => {
    var useremail = req.body.loginemail;
    var password = req.body.loginPassword;
    if (validationResult(req).isEmpty()) {
        accountsModel.authAccount(useremail,password )
            .then((obj) => {
                console.log(obj)
                req.session.userId = obj.id;
                req.session.loggedinuser = obj.username;
                req.session.loggedin = true;
                req.session.loggedinEmail=obj.userEmail;
                req.session.profileimg = obj.profileimg;
				req.session.type = obj.type;
                res.redirect('/profile');
                res.end();
            })
            .catch(err => {
                req.flash("authError", err);
                req.flash("authErrorType", "signin");
                res.redirect("/signin");
            });
    } else {
     
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/signin");
    }
};

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
      
};

exports.handleAuth = (request, response) => {
    
    if (request.session.loggedin) {
        response.render('profile', {
			loggedinuser: request.session.loggedinuser,
			validationErrors: request.flash('validationErrors'),
			pro_img: request.session.profileimg,
			acc_type: request.session.type,
		});
    } else {
        response.redirect('/signin');
    }
    response.end();
    
};

