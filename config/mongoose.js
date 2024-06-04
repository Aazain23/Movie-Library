const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Aazain:aazain2003@aazain.farumhg.mongodb.net/?retryWrites=true&w=majority&appName=Aazain', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function() {
    console.log("Connected to Database :: MongoDB");
});

module.exports = db;
