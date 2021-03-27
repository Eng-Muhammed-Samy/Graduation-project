const mongoose = require('mongoose')

mongoose.connect(
	'mongodb+srv://mine:mine@cluster0.rjjdk.mongodb.net/vote-system?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
	},
);

console.log('mongoDB connected  🔥');