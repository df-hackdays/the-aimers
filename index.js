var SerialPort = require("serialport"); 
var port = new SerialPort("COM4", {
	baudRate : 115200
});

const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
port.pipe(parser);
parser.on('data', console.log);