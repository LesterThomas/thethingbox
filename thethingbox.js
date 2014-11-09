var http = require('http');
var express = require("express");
var RED = require("node-red");


// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));
app.use(express.favicon(__dirname + '/node_modules/node-red/public/bee.png')); 

// Create a server
var server = http.createServer(app);

// Create the settings object
var settings = {
    httpAdminRoot:"/",
    httpNodeRoot: "/api/",
    flowFile: __dirname+"/node_modules/node-red/flows/local/flows.json",
    verbose: true,
	flowFilePretty: true,
	functionGlobalContext: {wpi: require('node-red/node_modules/wiring-pi')},
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(1880);

// Start the runtime
RED.start();