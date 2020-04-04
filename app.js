// Import express
let express = require('express');
//Import routes
let apiRoutes=require("./api-routes");

//require cookie parser
let cookieParser = require('cookie-parser');
// Import Body parser
let bodyParser = require('body-parser');
var cors = require('cors');

// Initialize the app
let app = express();
app.use(cors());
app.use(cookieParser());
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Setup server port
var port = 3000;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World'));

app.use('/',apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running Rest on port " + port);
});


//  signup //login
// Authorization : session token vs JWT

// form : username dkjahzdka  password : gjhdgazjd 
// session_id : valeur
// 1 : dhkajzhdaz
// 2 : gzjabjza