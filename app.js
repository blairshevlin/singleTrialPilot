// --- LOADING MODULES
const express = require('express');
const body_parser = require('body-parser');
const fetch = require("node-fetch");
//    mongoose = require('mongoose');
const Dropbox = require("dropbox").Dropbox;


// --- INSTANTIATE THE APP
var app = express();
const subjects = {};
const starttime = Date.now();

// --- Database SETUP
const dbx = new Dropbox({
    accessToken: '8c0D8eGcBXIAAAAAAAAAAZ3gffPTRT8AAlcdCv_n24igGD0V7JYsSL0DCNM9pIet',
    fetch
});

saveDropbox = function (content, filename) {
    return dbx.filesUpload({
        path: "/" + filename,
        contents: content,
        autorename: false,
        mode:  'overwrite'
   });
};

//mongoose.connect(process.env.CONNECTION || 'mongodb://localhost/jspsychDemo'); 
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error'));
//db.once('open', function callback() {
//    console.log('database opened');
//});

//var emptySchema = new mongoose.Schema({}, { strict: false });
//var Entry = mongoose.model('Entry', emptySchema);

// --- STATIC MIDDLEWARE 
app.use(express.static(__dirname + '/public'));
app.use('/jsPsych', express.static(__dirname + "/jsPsych"));

// --- BODY PARSING MIDDLEWARE
app.use(body_parser.json()); // to support JSON-encoded bodies

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('views', __dirname + '/public/views');
app.set('img', __dirname + '/public/img');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// --- ROUTING
app.get('/', function(request, response) {
    response.render('index.html');
});

app.get('/Pilot_Lot_Lex', function(request, response) {
    //response.render('speed_accuracy_tradeoff.html');
    // response.render('Lott.html');
    response.render('Lott_SAT.html');
});

app.get('/finish', function(request, response) {
    response.render('finish.html');
})

app.post("/experiment-data", function (request, response) {
    data = request.body;
    subject_id = data[0].subject;
    subject_id = subject_id.replace(/'/g, "");
    saveDropbox(JSON.stringify(data), `subject_data_${subject_id}.json`).catch(err => console.log(err));
});

// --- START THE SERVER 
var server = app.listen(process.env.PORT || 3000, function(){
    console.log("Listening on port %d", server.address().port);
});
