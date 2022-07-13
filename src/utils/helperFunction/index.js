import analytics from '@react-native-firebase/analytics';
import moment from 'moment';
import { launchImageLibrary } from 'react-native-image-picker';
import { showError } from '../showMessage';

export const onLogScreenView = async (screenName) => {
  try {
    await analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenName,
    });
  } catch (err) {
    // err
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

export const getImage = (setFieldValue, setPhoto) => {
  launchImageLibrary(
    {
      quality: 1,
      maxWidth: 1000,
      maxHeight: 1000,
      includeBase64: true,
    },
    (response) => {
      if (response.didCancel || response.error) {
        showError('Sepertinya anda tidak memilih fotonya');
      } else {
        const source = response?.assets[0];
        const Uri = source.uri;
        if (setPhoto !== '') {
          setPhoto(Uri);
        }
        setFieldValue('image', source, true);
      }
    },
  );
};

export const formatRupiah = (harga) => `Rp. ${parseFloat(harga).toLocaleString('id-ID')}`;

export const dateConvert = (date) => moment(date).format('DD MMM, HH:mm');

export const sortDate = (a, b) => {
  const dateA = new Date(a.createdAt);
  const dateB = new Date(b.createdAt);
  return dateB - dateA;
};
