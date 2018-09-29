var SerialPort = require("serialport"); 
var port = new SerialPort("COM4", {
	baudRate : 115200
});
/*
var serialPort = new SerialPort("COM4", {
  baudrate: 115200,
  //parser: serialport.parsers.readline("\n")
});
*/

/*
serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log(data);
  });
});

*/

port.open(function(success) {
	if(err) {
		return console.log("Success " , success.message);
	}
});

port.on('data', function (data) {
  console.log(data.toString("utf-8"));
});