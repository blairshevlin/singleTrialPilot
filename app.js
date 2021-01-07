// --- LOADING MODULES
const express = require('express');
const body_parser = require('body-parser');
const fetch = require("node-fetch");
const { response } = require('express');
const Dropbox = require("dropbox").Dropbox;


// --- INSTANTIATE THE APP
var app = express();
const subjects = {};
const starttime = Date.now();

// --- Database SETUP
const dbx = new Dropbox({
    accessToken: 'kcPc73cpDtkAAAAAAAAAAUaQqw6etKbz7TUFHj_P8ph0MnT8NgYhK42vgEmytd9I',
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

app.get('/Exp1_Lot_Lex', function(request, response) {
    response.render('Lott_SAT.html');
});

app.get('/finish', function(request, response) {
    response.render('finish.html');
});

app.post("/experiment-data", function (request, response) {
    data = request.body;
    subject_id = data[0].subject;
    subject_id = subject_id.replace(/'/g, "");
    saveDropbox(JSON.stringify(data), `subject_data_${subject_id}.json`).catch(err => console.log(err));
});

// --- START THE SERVER 
var server = app.listen(process.env.PORT || 3021, function(){
    console.log("Listening on port %d", server.address().port);
});
