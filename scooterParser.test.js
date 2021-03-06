const { parseScooterPayload, getDeviceInfoStream } = require('./scooterParser');

describe('parseScooterPayload', () => {
  test('it should parse a payload with DeviceInfo packet correctly', () => {
    const mockedPayloadStreamOneDevice = `+IN,DeviceInfo,860861040012977,86,5600,2021-01-14T15:05:10,0035$AABBAA`;
    const mockedExpectedResultOneDevice = [
      {
        imei: '860861040012977',
        batteryLevel: '86 %',
        odometer: '5600 km',
        time: '2021-01-14T15:05:10.000Z',
      },
    ];
    expect(parseScooterPayload(mockedPayloadStreamOneDevice)).toEqual(
      mockedExpectedResultOneDevice
    );
  });
  test('it should parse a payload with multiple DeviceInfo packets correctly', () => {
    const mockedPayloadStreamMultiDevice = `+IN,DeviceInfo,123456789012345,86,5600,2021-01-14T15:05:10,0035$AABBAA
+IN,DeviceInfo,123456789012346,34,5612,2021-01-14T18:30:10,0036$CCDDEE
+IN,DeviceInfo,123456789012347,3,5623,2021-01-14T23:59:10,0037$FFGGHH
`;
    const mockedExpectedResultMultiDevice = [
      {
        imei: '123456789012345',
        batteryLevel: '86 %',
        odometer: '5600 km',
        time: '2021-01-14T15:05:10.000Z',
      },
      {
        imei: '123456789012346',
        batteryLevel: '34 %',
        odometer: '5612 km',
        time: '2021-01-14T18:30:10.000Z',
      },
      {
        imei: '123456789012347',
        batteryLevel: '3 %',
        odometer: '5623 km',
        time: '2021-01-14T23:59:10.000Z',
      },
    ];
    expect(parseScooterPayload(mockedPayloadStreamMultiDevice)).toEqual(
      mockedExpectedResultMultiDevice
    );
  });
  test('it should return invalid input if the payload does not have inputs', () => {
    const invalidInput = `somethingwrong`;
    expect(parseScooterPayload(invalidInput)).toEqual('invalid input');
  });
});

describe('getDeviceInfoStream', () => {
  test('it should return an object with correct values', () => {
    const mockedDeviceInfo = [
      '+IN',
      'DeviceInfo',
      '123456789012345',
      '86',
      '5600',
      '2021-01-14T15:05:10',
      '0035$',
    ];
    const mockedExpectedResult = {
      imei: '123456789012345',
      batteryLevel: '86 %',
      odometer: '5600 km',
      time: '2021-01-14T15:05:10.000Z',
    };
    expect(getDeviceInfoStream(mockedDeviceInfo)).toEqual(mockedExpectedResult);
  });
});
