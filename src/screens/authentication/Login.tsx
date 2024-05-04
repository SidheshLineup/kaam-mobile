import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import KSafeAreaView from '../../shared/SafeAreaView';
import KStatusBar from '../../shared/StatusBar';
import {SizedBox} from '../../shared/SizedBox';
import {CountryPicker, CountryItem} from 'react-native-country-codes-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/RouteStack';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store/store';
import {getOtp} from '../../redux/slice/authSlice';

type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginScreen'
>;

const validationSchema = yup.object().shape({
  phone: yup
    .string()
    .min(10, 'Phone number must be of 10 characters.')
    .max(10, 'Phone number must be of 10 characters.')
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Invalid mobile number')
    .trim(),
});

const Login = ({navigation}: LoginScreenProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  const [isFormButtonDisabled, setFormButtonDisabled] = useState(false);
  const [countryCode, setCountryCode] = useState({dialcode: '+91', flag: '🇮🇳'});
  const [show, setShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: any) => {
    setFormButtonDisabled(true);
    data.dialcode = countryCode.dialcode;

    try {
      await dispatch(getOtp(data)).unwrap();
      navigation.navigate('OtpVerificationScreen', {
        phone: data.phone,
        countryCode,
      });
    } catch (error) {
      console.log('error', error);
    }
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
          Login
        </Text>
        <View className="w-[10%] mt-1 h-1 rounded-full bg-black dark:bg-white" />
        <SizedBox height={30} width={0} />
        <View className="w-full flex flex-col gap-y-3">
          <View className="flex-row w-full justify-between">
            <View className="w-[20%]">
              <TouchableOpacity
                className="h-[50px] justify-center items-center border border-black dark:border-white rounded-xl"
                onPress={() => setShow(true)}
                disabled={isFormButtonDisabled}>
                <Text className="text-black dark:text-white">
                  {`${countryCode.flag} ${countryCode.dialcode}`}
                </Text>
              </TouchableOpacity>
              <CountryPicker
                lang="en"
                show={show}
                initialState={'+91'}
                inputPlaceholder="Select your country"
                onBackdropPress={() => setShow(false)}
                style={{
                  modal: {
                    height: '70%',
                  },
                }}
                // when picker button press you will get the country object with dial code
                pickerButtonOnPress={(item: CountryItem) => {
                  setCountryCode({
                    flag: item.flag,
                    dialcode: item.dial_code,
                  });
                  setShow(false);
                }}
              />
            </View>

            <View
              className={`${
                errors && errors.phone
                  ? 'border border-red-500'
                  : 'border border-black dark:border-white'
              } rounded-xl w-[78%] relative`}>
              <Controller
                control={control}
                name="phone"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="phone-pad"
                    className="w-full text-sm font-medium text-black dark:text-white px-4"
                    placeholder="Mobile number"
                    placeholderTextColor="gray"
                  />
                )}
              />
              {errors?.phone && (
                <Text className="px-1 absolute -bottom-1.5 right-0 text-[10px] bg-slate-100 dark:bg-slate-950 text-red-500 text-right mr-2">
                  {errors?.phone?.message}.
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            disabled={isSubmitting}
            className="h-[50px] bg-[#418c4d] justify-center items-center rounded-xl"
            onPress={handleSubmit(onSubmit)}>
            <Text className="text-white">Login</Text>
          </TouchableOpacity>

          <View className="flex-row gap-x-2">
            <Text className="text-gray-500">Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegistrationScreen')}>
              <Text className="text-[#4A9D58] font-medium">
                Register yourself
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KSafeAreaView>
  );
};

export default Login;
