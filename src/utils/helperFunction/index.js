import analytics from '@react-native-firebase/analytics';

export const onLogScreenView = async (screenName) => {
  try {
    await analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenName,
    });
  } catch (err) {
    console.log(err);
  }
};

export const optionalConfigObject = {
  title: 'Authentication Required',
  imageColor: '#e00606',
  imageErrorColor: '#ff0000',
  sensorDescription: 'Touch sensor',
  sensorErrorDescription: 'Failed',
  cancelText: 'Cancel',
  fallbackLabel: 'Show Passcode',
  unifiedErrors: false,
  passcodeFallback: false,
};
