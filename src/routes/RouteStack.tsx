import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Registration from '../screens/authentication/Registration';
import Login from '../screens/authentication/Login';
import OtpVerification from '../screens/authentication/OtpVerification';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store/store';
import {setAccessToken, setFirstLogin, setUser} from '../redux/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contact from '../features/dashboard/Contact';
import JobPreferences from '../screens/additional-info/JobPreferences';

export type RootStackParamList = {
  RegistrationScreen: undefined;
  LoginScreen: undefined;
  OtpVerificationScreen: {
    phone: string;
    countryCode: {dialcode: string; flag: string};
  };
  JobPreferenceScreen: undefined;
  ContactScreen: undefined;
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

  return !accessToken ? (
    <Stack.Navigator initialRouteName="RegistrationScreen">
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
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      {isFirstLogin ? (
        <Stack.Screen
          name="ContactScreen"
          component={Contact}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="JobPreferenceScreen"
          component={JobPreferences}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
}

export default RouteStack;
