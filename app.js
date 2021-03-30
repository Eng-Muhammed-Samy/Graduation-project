/* 
 * Required External Modules
 */
const RTCMultiConnectionServer = require('rtcmulticonnection-server')
const session = require('express-session');
const express = require('express');
var cors = require('cors');

const bodyParser = require('body-parser');
const path = require('path');
// var mysql = require('mysql');
// const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require("uuid");
dotenv.config({ path: './.env' });
const welcomeRoutes = require('./routes/welcome.route')
const meetingRoutes = require('./routes/meeting.route')
const loginRoutes = require('./routes/login.route')
const profileRoutes = require('./routes/profile.route')
const roomRoutes = require('./routes/room.route')
const googleRoutes = require("./routes/google.route");
const fs = require('fs');
const logger = require('morgan');
const flash = require("connect-flash");
// const sessionPool = require('pg').Pool;
// const pgSession = require('connect-pg-simple')(session);
var busboy = require('connect-busboy');
//...

//...

/**
 * App Variables
 */
const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT || "3000";
const io = require('socket.io')(server);

const passport = require("passport");


/**
 *  App Configuration
 */

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + "public/css"));
app.use('/js', express.static(__dirname + "public/js"));
app.use('/img', express.static(__dirname + "public/img"));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/views'));
app.use('/upload_images', express.static(__dirname + "public/upload_images"));

app.use('/uploads', express.static('uploads'));
app.use(busboy()); 


const KnexSessionStore = require('connect-session-knex')(session);

const Knex = require('knex');

const knex = Knex({
	client: 'pg',
	connection: {
        host: 'ec2-3-91-127-228.compute-1.amazonaws.com',
        user: 'ykpkcybaauradp',
        password:
            '445569c30ab5ca4807c8f3d051a031b8c9dc2ed71709811ed048cda8aa0a03c5',
        port: '5432',
        database: 'd9ou5t95ridkjr',
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

const store = new KnexSessionStore({
  knex,
  tablename: 'sessions', // optional. Defaults to 'sessions'
});

app.use(
  session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000,
     expires: false,// ten seconds, for testing
      resave: false,
              saveUninitialized: true,
    },
    store,
  }),
);


app.use(flash());



app.use('/', welcomeRoutes)
app.use('/', meetingRoutes)
app.use('/', loginRoutes)
app.use('/', profileRoutes)
app.use('/', roomRoutes)


const connection = require('./models/init_database').connection

// connect to database 
connection.connect(async function (err) {
	if (err) throw err;
	console.log('Connected!');
	await connection.query(
		"CREATE TABLE IF NOT EXISTS accounts (id SERIAL PRIMARY KEY,username VARCHAR(255), Email VARCHAR(255), password VARCHAR(255),img_url VARCHAR(255) DEFAULT 'default.png', type VARCHAR(20) DEFAULT 'normal')"
	);
	await connection.query(
		'CREATE TABLE IF NOT EXISTS meetingInfo (id SERIAL  PRIMARY KEY, meeting_id  VARCHAR(255),hostname  VARCHAR(255),meetingpassword VARCHAR(255),URL VARCHAR(255),validity BOOLEAN)'
    );
    await connection.query(
		'CREATE TABLE IF NOT EXISTS events (id  BIGSERIAL unique not null PRIMARY KEY,start_date TIMESTAMP,end_date TIMESTAMP, text VARCHAR(255),event_pid VARCHAR(255),event_length VARCHAR(255), rec_type VARCHAR(255),owner_id INT, CONSTRAINT fk_owner FOREIGN KEY(owner_id) REFERENCES accounts(id))'
    );
    console.log('tables created')
});

const router = require('./routes/router');
// add listeners to basic CRUD requests
const Storage = require('./models/storage.js');
const storage = new Storage(connection);
router.setRoutes(app, '/events', storage);

/* Google authentication routes and configuration  */
require("./passport-setup");

app.use(passport.initialize());
app.use(passport.session());
app.use("/", googleRoutes);

/* End of Google authentication */

/* Schedule route */
app.get("/schedule", (req, res) => res.render("schedule"));

app.use(cors());

// const Vote = mongoose.model(
// 	'myvoteModel',
// 	{
// 		question: {
// 			type: String,
// 			required: true,
// 			trim: true,
// 		},
// 		option1: {
// 			key: {
// 				type: String,
// 				required: true,
// 				trim: true,
// 			},
// 			value: {
// 				type: Number,
// 			},
// 		},
// 		option2: {
// 			key: {
// 				type: String,
// 				required: true,
// 				trim: true,
// 			},
// 			value: {
// 				type: Number,
// 			},
// 		},
// 		option3: {
// 			key: {
// 				type: String,
// 				required: true,
// 				trim: true,
// 			},
// 			value: {
// 				type: Number,
// 			},
// 		},
// 	},
// 	'voteData',
// );
// const newVote = new Vote();

io.on("connection", (socket) => {
    RTCMultiConnectionServer.addSocket(socket)
    socket.on("join-room", (roomid) => {

        socket.join(roomid);

        socket.on("join-meet", (data) => {
            io.to(roomid).emit('participants', data)
        })
        io.to(roomid).emit('update')
        socket.on("message", (message,messagewriter) => {
            io.to(roomid).emit("createMessage", message,messagewriter);
        });
        socket.on('newVote', (question, gender, option1, option2, option3) => {
            newVote.question = question
            newVote.option1.key = option1
            newVote.option2.key = option2
            newVote.option3.key = option3
            newVote.option1.value = 0
            newVote.option2.value = 0
            newVote.option3.value = 0
            newVote.save().then((newVote) => {
                console.log(newVote);
                io.to(roomid).emit('startVoting', question, gender, option1, option2, option3)
            }).catch((e) => {
                console.log(e);
            })

        })
        //FileUploading
        socket.on('file', (f,messagewriter) => {
           console.log(`File by: ${messagewriter}`);
           io.to(roomid).emit('file', f);
        });

        socket.on('votting', (value) => {
            console.log('votting')
            console.log(value)
            for (let i = 0; i < value.length; i++) {
                if (newVote.option1.key === value[i]) {
                    newVote.option1.value += 1

                } else if (newVote.option2.key === value[i]) {
                    newVote.option2.value += 1

                } else if (newVote.option3.key === value[i]) {
                    newVote.option3.value += 1

                }
                newVote.save().then(() => {
                    console.log(newVote);
                }).catch(e => {
                    console.log(e);
                })
            }
            socket.emit('result', newVote.question,
                { key: newVote.option1.key, value: newVote.option1.value },
                { key: newVote.option2.key, value: newVote.option2.value },
                { key: newVote.option3.key, value: newVote.option3.value })
        })
        socket.on("disconnect", () => {
        });
    });
    
});

/**
 * Server running
 */
server.listen(port, () => {
    console.log(`running on port : ${port}`);
});

module.exports.db = connection