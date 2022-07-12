import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

export const configure = () => {
  PushNotification.configure({
    requestPermissions: Platform.OS === 'ios',
  });
};

export const buatChannel = (channel) => {
  PushNotification.createChannel(
    {
      channelId: channel, // (required)
      channelName: 'My channel', // (required)
    },
  );
};

export const kirimNotifikasi = (channel, judul, pesan) => {
  PushNotification.localNotification({
    channelId: channel, //
    title: judul, // (optional)
    message: pesan, // (required)
    // bigText: 'hhllllasfdasd',
  });
};

export const cancelAllLocalNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};
