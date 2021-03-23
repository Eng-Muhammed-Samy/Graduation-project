/** @format */

const MeetingInfoModel = require('../models/meetingInfo.model');
const validationResult = require('express-validator').validationResult;

exports.getRoom = (req, res) => {
	const clientid = req.body.meetingid;
	if (validationResult(req).isEmpty()) {
		MeetingInfoModel.checkMeetingId(clientid)
			.then(() => {
				if (!req.session.loggedinuser) {
					req.session.loggedinuser = req.body.clientname;
				}
				res.redirect(`/meeting/${clientid}`);
			})
			.catch((err) => {
				req.flash('authError', err);
				res.redirect('/joinmeeting?meetingid=' + clientid);
			});
	} else {
		req.flash('validationErrors', validationResult(req).array());
		res.redirect('/joinmeeting?meetingid=' + clientid);
	}
};
// exports.geVideoRoom=(req,res,next)=>{
//     if(req.session.validity){
//         res.render("room", { roomid:req.session.clientmeetingid ,clientflag: req.session.clientflag,clientname:req.body.clientname});
//     }
// }
exports.getBackToMeeting = (req, res, next) => {
	res.redirect('/');
};
