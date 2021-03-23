
exports.getWelcome = (req,res,next)=>{
    if (req.session.loggedin) {
        res.redirect('/profile')
    } else {
        res.render('welcome');
    }
}
exports.getSignIn = (req,res,next)=>{
    res.render('login', {
        authError: req.flash("authError")[0],
        authErrorType:req.flash("authErrorType")[0],
        validationErrors: req.flash('validationErrors')
    });
}
exports.getMeeting = (req,res,next)=>{
    res.render('meeting', {
        authError: req.flash("authError")[0],
        validationErrors: req.flash('validationErrors'),
        meetingid: req.query.meetingid || ""
    });
}
