var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://theaimers:winners@cluster0-c02uj.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("we're connected!");
	// we're connected!
});

var SerialPort = require("serialport"); 
var port = new SerialPort("COM10", {
	baudRate : 115200
});



const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
port.pipe(parser);

var classKeyData = "";
var paceData = ""; 
parser.on('data', (data) => {
	console.log("Sid");
	if(data.includes("Timestamp")){
		classKeyData = data.substring(data.indexOf(" ")+1);
		console.log("thisis times: " + classKeyData);
	}
	if(data.includes("Pace")){
		paceData = data.substring(data.indexOf(" ")+1);
		console.log("thisis pace: " + paceData);
		if(paceData != ""){
			var paceObject = new Pace({ classKey: classKeyData, pace: paceData, paceTime: (new Date()).toISOString() });
			paceObject.save(function(error) {
				console.log("object created");
				if(error){
					console.error(error);
				}
			});
			pace = "";
		}
	}
	console.log(data);
});

var paceSchema = new mongoose.Schema({
	classKey: String,
	pace: String,
	paceTime: String
});

var Pace = mongoose.model('Pace', paceSchema);



