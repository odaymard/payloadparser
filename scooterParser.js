/*
* The function accepts a STRING `payloadStream` as parameter.
*
* The function is expected to RETURN an ARRAY of Objects. Please refer to
Example for additional informations.
*/
function parseScooterPayload(payLoadStream) {
  const payloadStreamSplit = payLoadStream.split('\n').filter((line) => line[0] === '+');
  const deviceInformations = [];
  payloadStreamSplit.forEach((packet) => {
    const packetParams = packet.split(',');
    if (packetParams[1] === 'DeviceInfo') {
      deviceInformations.push({
        imei: packetParams[2],
        batteryLevel: `${packetParams[3]} %`,
        odometer: `${packetParams[4]} km`,
        time: `${packetParams[5]}.000Z`,
      });
    } else if (packetParams[1] === 'Error') {
      const errorData = {};
      for (let i = 4; i < 4 + packetParams[3] * 2; i = i + 2) {
        errorData[`${packetParams[i + 1]}`] = packetParams[i];
      }
      deviceInformations.push({
        imei: packetParams[2],
        ...errorData,
        time: `${packetParams[5]}.000Z`,
      });
    }
  });
  return deviceInformations;
}
module.exports = {
  parseScooterPayload
};
