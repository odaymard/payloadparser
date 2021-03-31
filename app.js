const { parseScooterPayload } = require('./scooterParser');

const PayloadStreamMultiDevice = `+IN,DeviceInfo,123456789012345,86,5600,2021-01-14T15:05:10,0035$AABBAA
+IN,DeviceInfo,123456789012346,34,5612,2021-01-14T18:30:10,0036$CCDDEE
+IN,DeviceInfo,123456789012347,3,5623,2021-01-14T23:59:10,0037$FFGGHH
+IN,Error,860861040012977,2,5,NoBattery,6,noflaw,2021-01-14T15:06:18,0036$
`;
console.log(
  "parseScooterPayload",
  parseScooterPayload(PayloadStreamMultiDevice)
);