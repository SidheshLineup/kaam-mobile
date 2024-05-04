import {Platform, PermissionsAndroid} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const enum Platforms {
  ANDROID = 'android',
  iOS = 'ios',
  WINDOWS = 'windows',
  MACOS = 'macos',
  WEB = 'web',
}

export async function requestUserPermissionAndFcmToken() {
  switch (Platform.OS) {
    case Platforms.iOS:
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
      return await getFCMToken();

    case Platforms.ANDROID:
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return await getFCMToken();

    default:
      return false;
  }
}

export async function getFCMToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');

  if (!fcmToken) {
    try {
      const newFcmToken = await messaging().getToken();
      if (newFcmToken) {
        await AsyncStorage.setItem('fcmToken', newFcmToken);
        return {fcmToken: newFcmToken, new: true};
      }
    } catch (error) {
      console.log(
        'error in storing fcm token in async storage or generating one',
        error,
      );
      return {fcmToken: '', new: false};
    }
  } else {
    return {fcmToken, new: false};
  }
}
