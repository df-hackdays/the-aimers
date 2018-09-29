var SerialPort = require("serialport"); 
var port = new SerialPort("COM10", {
	baudRate : 115200
});

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://theaimers:winners@cluster0-c02uj.mongodb.net/test?retryWrites=true');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("we're connected!");
	// we're connected!
});

const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
port.pipe(parser);
parser.on('data', (data) => {
	
	console.log(data);
});

var paceSchema = new mongoose.Schema({
	classKey: String,
	pace: String,
	paceTime: String
});

var Pace = mongoose.model('Pace', paceSchema);

var paceObject = new Pace({ classKey: "classkey", pace: "0", paceTime: "pacekey" });

paceObject.save(function(error) {
	console.log("object created");
	if(error){
		console.error(error);
	}
});