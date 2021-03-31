const { parseScooterPayload } = require('./scooterParser');

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
});
describe('parseScooterPayload Error packets', () => {
  test('it should parse a payload with Error packet correctly', () => {
    const mockedPayLoadStreamOneError = `+IN,Error,860861040012977,1,5,NoBattery,2021-01-14T15:06:18,0036$`;
    const mockedExpectedResultOneError = [
      { imei: '860861040012977', NoBattery: '5', time: 'NoBattery.000Z' },
    ];
    expect(parseScooterPayload(mockedPayLoadStreamOneError)).toEqual(mockedExpectedResultOneError);
  });
  test('it should parse a payload with multiple Error packets correctly', () => {
    const mockedPayLoadStreamMultiError = `+IN,Error,860861040012977,4,5,NoBattery,7,ECUFailure,8,Reboot,10,IotError,2021-01-14T19:05:10,0039$`;
    const mockedExpectedResultMultiError = [
      {
        imei: '860861040012977',
        NoBattery: '5',
        ECUFailure: '7',
        Reboot: '8',
        IotError: '10',
        time: 'NoBattery.000Z',
      },
    ];
    expect(parseScooterPayload(mockedPayLoadStreamMultiError)).toEqual(
      mockedExpectedResultMultiError
    );
  });
});
