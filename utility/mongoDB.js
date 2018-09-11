const mongoose = require('mongoose');

const dbstr=require('../config/default.json');
mongoose.connect(dbstr.database.url, {   //accountManagement
	useNewUrlParser: true
});

//add some info about database connection
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connect error'));
db.once('open', function () {
	console.log('db connect success');
})
