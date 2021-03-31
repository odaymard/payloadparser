const { parseScooterPayload } = require('./scooterParser');

const mockedPayloadStreamMultiDevice = `+IN,DeviceInfo,123456789012345,86,5600,2021-01-14T15:05:10,0035$AABBAA
+IN,DeviceInfo,123456789012346,34,5612,2021-01-14T18:30:10,0036$CCDDEE`
console.log(
  "parseScooterPayload",
  parseScooterPayload(mockedPayloadStreamMultiDevice)
);
