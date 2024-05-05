import React, {useEffect} from 'react';
import KSafeAreaView from '../../shared/SafeAreaView';
import LottieView from 'lottie-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/RouteStack';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;
const SplashScreen = ({navigation}: SplashScreenProps) => {
  const accessToken = useSelector<RootState>(state => state.auth.accessToken);
  const isFirstLogin = useSelector<RootState>(state => state.auth.isFirstLogin);
  useEffect(() => {
    const navigateAfterDelay = () => {
      if (!accessToken) {
        navigation.navigate('RegistrationScreen');
      } else if (accessToken && isFirstLogin) {
        navigation.navigate('JobPreferenceScreen');
      } else {
        navigation.navigate('ContactScreen');
      }
    };
    const delay = !accessToken ? 4000 : 2000;
    const timer = setTimeout(navigateAfterDelay, delay);
    return () => clearTimeout(timer);
  }, [accessToken, isFirstLogin, navigation]);

  return (
    <KSafeAreaView style={'h-screen w-full flex justify-center items-center'}>
      <LottieView
        style={{width: 700, height: 700}}
        source={require('../../assets/animations/splash.json')}
        autoPlay
        loop={false}
      />
    </KSafeAreaView>
  );
};

export default SplashScreen;
