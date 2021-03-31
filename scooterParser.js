const DEVICE_INFO = 'DeviceInfo';
const getDeviceInfoStream = (params) => ({
  imei: params[2],
  batteryLevel: `${params[3]} %`,
  odometer: `${params[4]} km`,
  time: `${params[5]}.000Z`,
});
function parseScooterPayload(payload) {
  const streams = payload.split('\n').filter((line) => line[0] === '+');
  if (!streams.length) return 'invalid input';
  return streams.map((packet) => {
    const packetParams = packet.split(',');
    return getDeviceInfoStream(packetParams);
  });
}

module.exports = {
  parseScooterPayload,
};
