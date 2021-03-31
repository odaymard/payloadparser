const { parseScooterPayload } = require('./scooterParser');


// an example of running the function with a given payload
const payloadStream = `

+IN,Error,860861040012977,1,5,NoBattery,2021-01-14T15:06:18,0036$
+IN,Error,860861040012977,4,5,NoBattery,7,ECUFailure,8,Reboot,10,IotError,`;

console.log(parseScooterPayload(payloadStream));
