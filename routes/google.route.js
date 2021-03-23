const router = require("express").Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  function (req, res) {
    // Successful authentication, redirect home.
    req.session.userId = req.user.appId;
    req.session.loggedin = true;
    req.session.loggedinuser=req.user.displayName;
    req.session.profileimg=req.user.profileimg;
    req.session.loggedinEmail=req.user.emails[0].value;
    res.redirect("/profile");
  }
);

module.exports = router;
