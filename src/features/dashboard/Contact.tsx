import React, {useEffect} from 'react';
import {Text} from 'react-native';
import KStatusBar from '../../shared/StatusBar';
import KSafeAreaView from '../../shared/SafeAreaView';
import {requestUserPermissionAndFcmToken} from '../../notifications/notification-helper';
import {registerFcmDeviceToken} from '../../redux/slice/userSlice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store/store';

const Contact = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log('Contact::useEffect');
    (async () => {
      const fcmObject = await requestUserPermissionAndFcmToken();
      if (fcmObject && fcmObject.new) {
        dispatch(registerFcmDeviceToken(fcmObject));
      }
    })();
    return () => {
      console.log('Contact::useEffect::return');
    };
  }, [dispatch]);
  return (
    <KSafeAreaView>
      <KStatusBar />
      <Text className="dark:text-red-400">Contact</Text>
    </KSafeAreaView>
  );
};

export default Contact;
