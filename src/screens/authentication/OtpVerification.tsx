import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/RouteStack';
import KSafeAreaView from '../../shared/SafeAreaView';
import KStatusBar from '../../shared/StatusBar';
import {useColorScheme} from 'nativewind';
import {SizedBox} from '../../shared/SizedBox';
import {OtpInput} from 'react-native-otp-entry';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store/store';
import {loginUser} from '../../redux/slice/authSlice';

type OtpVerificationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'OtpVerificationScreen'
>;

const OtpVerification = ({route}: OtpVerificationScreenProps) => {
  const {colorScheme} = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();
  const handleOtpVerify = (otp: string) => {
    dispatch(loginUser({otp, phone: route.params.phone}));
  };
  return (
    <KSafeAreaView>
      <KStatusBar />
      <ScrollView className="my-2 " keyboardShouldPersistTaps="handled">
        <SizedBox height={90} width={0} />
        <Text className="text-5xl font-extrabold text-black dark:text-white">
          Kaam
        </Text>
        <View className="w-[15%] h-1.5 rounded-full bg-black dark:bg-white" />
        <SizedBox height={50} width={0} />
        <Text className="text-3xl font-extrabold text-black dark:text-white">
          Verify OTP
        </Text>
        <View className="w-[25%] h-1 rounded-full bg-black dark:bg-white" />
        <SizedBox height={30} width={0} />
        <View className="flex flex-row justify-center">
          <OtpInput
            numberOfDigits={4}
            focusColor="green"
            focusStickBlinkingDuration={500}
            onFilled={text => handleOtpVerify(text)}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              containerStyle: {width: 320},
              pinCodeContainerStyle: {width: 70, height: 70},
              filledPinCodeContainerStyle: {
                backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#e2e8f0',
                borderColor: '#6ee7b7',
              },
              pinCodeTextStyle: {
                color: colorScheme === 'dark' ? '#e2e8f0' : '#0f172a',
              },
              // focusStickStyle: styles.focusStick,
              // focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            }}
          />
        </View>
      </ScrollView>
    </KSafeAreaView>
  );
};

export default OtpVerification;
