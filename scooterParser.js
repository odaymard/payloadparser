/*
* The function accepts a STRING `payloadStream` as parameter.
*
*
* The function is expected to RETURN an ARRAY in the following format:
*
* [{ imei: STRING, batteryLevel: STRING, odometer: STRING, time: DATE },
... ]
*
*/
function parseScooterPayload(payLoadStream) {
  const payloadStreamSplit = payLoadStream.split('\n');
  const deviceInformations = [];
  payloadStreamSplit.forEach((packet) => {
    if (packet[0] === '+') {
      const deviceInfo = packet.split(',');
      deviceInformations.push({
        imei: deviceInfo[2],
        batteryLevel: `${deviceInfo[3]} %`,
        odometer: `${deviceInfo[4]} km`,
        time: `${deviceInfo[5]}.000Z`,
      });
    }
  });
  return deviceInformations;
}

module.exports = {
  parseScooterPayload,
};
