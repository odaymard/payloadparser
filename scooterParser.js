const DEVICE_INFO = 'DeviceInfo';
const ERROR = 'Error';
const getDeviceInfoStream = (params) => ({
  imei: params[2],
  batteryLevel: `${params[3]} %`,
  odometer: `${params[4]} km`,
  time: `${params[5]}.000Z`,
});
const getErrorStream = (params) => {
  const errorData = {};
  for (let i = 4; i < 4 + params[3] * 2; i = i + 2) {
    errorData[`${params[i + 1]}`] = params[i];
  }
  return {
    imei: params[2],
    ...errorData,
    time: `${params[5]}.000Z`,
  };
};
function parseScooterPayload(payload) {
  const streams = payload.split('\n').filter((line) => line[0] === '+');
  if (!streams.length) return 'invalid input';
  return streams.map((packet) => {
    const packetParams = packet.split(',');
    const instruction = packetParams[1];
    if (instruction === DEVICE_INFO) {
      return getDeviceInfoStream(packetParams);
    } else if (instruction === ERROR) {
      return getErrorStream(packetParams);
    }
  });
}

module.exports = {
  parseScooterPayload,
};
