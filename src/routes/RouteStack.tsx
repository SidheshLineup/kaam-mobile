import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Registration from '../screens/authentication/Registration';
import SplashScreen from '../screens/splash-screen/SplashScreen';
import Login from '../screens/authentication/Login';
import OtpVerification from '../screens/authentication/OtpVerification';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store/store';
import {setAccessToken, setFirstLogin, setUser} from '../redux/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dashboard from '../screens/dashboard/Dashboard';
import JobPreferences from '../screens/additional-info/JobPreferences';
import messaging from '@react-native-firebase/messaging';

export type RootStackParamList = {
  SplashScreen: undefined;
  RegistrationScreen: undefined;
  LoginScreen: undefined;
  OtpVerificationScreen: {
    phone: string;
    countryCode: {dialcode: string; flag: string};
  };
  JobPreferenceScreen: undefined;
  DashboardScreen: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

function RouteStack() {
  const accessToken = useSelector<RootState>(state => state.auth.accessToken);
  const isFirstLogin = useSelector<RootState>(state => state.auth.isFirstLogin);
  const dispatch = useDispatch<AppDispatch>();
  const naviagtion = useNavigation();
  useEffect(() => {
    async function retrieveAccessTokenFromAsyncStorage() {
      const accessTokenFromAsyncStorage = await AsyncStorage.getItem(
        'accessToken',
      );
      if (accessTokenFromAsyncStorage) {
        dispatch(setAccessToken({accessToken: accessTokenFromAsyncStorage}));
      }
    }
    async function retrieveUserFromAsyncStorage() {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        dispatch(setUser({user: JSON.parse(user)}));
      }
    }
    async function retrieveFirstLoginStatusAsyncStorage() {
      const isFirstLoginFromAsyncStorage = await AsyncStorage.getItem(
        'isFirstLogin',
      );
      if (isFirstLoginFromAsyncStorage === 'true') {
        console.log(
          'isFirstLoginFromAsyncStorage',
          isFirstLoginFromAsyncStorage,
        );
        dispatch(setFirstLogin({isFirstLogin: true}));
        await AsyncStorage.setItem('isFirstLogin', 'false');
      }
    }
    retrieveAccessTokenFromAsyncStorage();
    retrieveFirstLoginStatusAsyncStorage();
    retrieveUserFromAsyncStorage();
  }, [dispatch, naviagtion]);

  useEffect(() => {
    /**
     * handles Foreground state notifications
     */
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('ForeGround Notification handler', remoteMessage);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    /**
     * handles Background state notifications
     */
    const unsubscribe = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        console.log('Background Notification handler', remoteMessage);
      },
    );
    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      {!accessToken ? (
        <>
          <Stack.Screen
            name="RegistrationScreen"
            component={Registration}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OtpVerificationScreen"
            component={OtpVerification}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          {isFirstLogin ? (
            <>
              <Stack.Screen
                name="JobPreferenceScreen"
                component={JobPreferences}
                options={{headerShown: false}}
              />
              {/* <Stack.Screen
                name="DashboardScreen"
                component={Dashboard}
                options={{headerShown: false}}
              /> */}
            </>
          ) : (
            <Stack.Screen
              name="DashboardScreen"
              component={Dashboard}
              options={{headerShown: false}}
            />
          )}
        </>
      )}
    </Stack.Navigator>
  );
}

export default RouteStack;
