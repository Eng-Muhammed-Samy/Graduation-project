const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/vote-system', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true 
})

console.log('mongoDB connected  🔥');