import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import KSafeAreaView from '../../shared/SafeAreaView';
import KStatusBar from '../../shared/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {
  JobRole,
  getJobPreference,
  saveUserJobPreference,
} from '../../redux/slice/jobPreferenceSlice';
import {SizedBox} from '../../shared/SizedBox';
import {useColorScheme} from 'nativewind';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import Icon from '../../shared/Icon';
import {CircleArrowRight} from 'lucide-react-native';
import {RootStackParamList} from '../../routes/RouteStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {setFirstLogin} from '../../redux/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

type JobPreferencesProps = NativeStackScreenProps<
  RootStackParamList,
  'JobPreferenceScreen'
>;

const JobPreferences = ({}: JobPreferencesProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const jobRoles: JobRole[] = useSelector<RootState>(
    state => state.jobPreference.jobRoles,
  ) as JobRole[];

  const {colorScheme} = useColorScheme();
  const [allJobRoles, setAllJobRoles] = useState(jobRoles ?? []);
  const [selectedJobs, setSelectedJobs] = useState<JobRole[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const maxSelection = 5;
  const [errorMessage, setErrorMessage] = useState('');

  const shateTranslationX = useSharedValue(0);
  const errorOpacity = useSharedValue(0);

  const shake = useCallback(() => {
    const translationAmount = 10;
    const timingConf = {
      duration: 80,
    };

    errorOpacity.value = withTiming(1);

    shateTranslationX.value = withSequence(
      withTiming(translationAmount, timingConf),
      withRepeat(withTiming(-translationAmount, timingConf), 4, true),
      withTiming(0, timingConf),
    );

    setTimeout(() => {
      errorOpacity.value = withTiming(0, {duration: 300});
      if (errorOpacity.value === 0) {
        setErrorMessage('');
      }
    }, 5000);
  }, [shateTranslationX, errorOpacity]);

  useEffect(() => {
    dispatch(getJobPreference());
  }, [dispatch]);

  const handleToggleJob = (job: JobRole) => {
    if (selectedJobs.some(selectedJob => selectedJob.role === job.role)) {
      setSelectedJobs(
        selectedJobs.filter(selectedJob => selectedJob.role !== job.role),
      );
    } else {
      if (selectedJobs.length < maxSelection) {
        setSelectedJobs([...selectedJobs, job]);
      } else {
        setErrorMessage(`You can only select ${maxSelection} job preferences!`);
        shake();
      }
    }
  };
  const textShakeStyle = useAnimatedStyle(() => {
    return {
      opacity: errorOpacity.value,
      transform: [{translateX: shateTranslationX.value}], // Optional: Slide up animation
    };
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useMemo(() => {
    const filteredJobRoles =
      jobRoles?.filter((job: JobRole) =>
        job.role.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ?? [];
    setAllJobRoles(filteredJobRoles);
  }, [jobRoles, searchQuery]);

  const handleSubmitJobPreference = async () => {
    const payload = selectedJobs.map(job => job._id);
    dispatch(saveUserJobPreference(payload));

    // navigation.navigate('ContactScreen');
    dispatch(setFirstLogin({isFirstLogin: false}));
    await AsyncStorage.setItem('isFirstLogin', 'false');
  };

  const isSaveButtonDisabled = selectedJobs.length < 1;

  return (
    <KSafeAreaView>
      <KStatusBar />
      <SizedBox height={50} />
      <Text className="text-2xl font-extrabold text-black dark:text-white">
        Select Your Job Preferences
      </Text>
      <View className="w-[45%] h-1 rounded-full bg-black dark:bg-white" />
      <SizedBox height={30} />
      <View className="rounded-full bg-white dark:bg-gray-800">
        <TextInput
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
          className="mx-1 px-6 py-2 text-gray-800 dark:text-white"
          placeholderTextColor={colorScheme === 'dark' ? '#cbd5e1' : '#334155'}
        />
      </View>

      <ScrollView
        className="my-2 pt-2"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Animated.View style={[textShakeStyle]} className="mx-5">
          <Text className="text-red-500">{errorMessage}</Text>
        </Animated.View>
        <View className="pb-4 flex-row flex-wrap">
          {allJobRoles?.map((jobRole: JobRole) => (
            <JobChip
              key={jobRole._id}
              item={jobRole}
              isSelected={selectedJobs.some(
                selectedJob => selectedJob.role === jobRole.role,
              )}
              onPress={handleToggleJob}
            />
          ))}
        </View>
      </ScrollView>
      <View className="py-2 flex-row justify-around">
        <TouchableOpacity
          className="bg-slate-50 dark:bg-gray-800 w-32 p-3 rounded-md flex-row items-center justify-center"
          onPress={() => {}}>
          <Text className="text-black dark:text-white">Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isSaveButtonDisabled}
          className={`${
            isSaveButtonDisabled
              ? 'bg-slate-50 dark:bg-gray-800'
              : 'bg-green-500'
          }  w-32 p-3 rounded-md flex-row items-center justify-center`}
          onPress={handleSubmitJobPreference}>
          <Text
            className={`mr-3 ${
              isSaveButtonDisabled ? 'text-slate-300' : 'text-white'
            }`}>
            Save
          </Text>
          <Icon
            IconComponent={CircleArrowRight}
            darkColor={isSaveButtonDisabled ? 'text-slate-300' : 'text-white'}
            lightColor={isSaveButtonDisabled ? 'text-slate-300' : 'text-white'}
            style="rounded-full items-center justify-center"
          />
        </TouchableOpacity>
      </View>
    </KSafeAreaView>
  );
};

export default JobPreferences;

const JobChip = ({
  item,
  isSelected,
  onPress,
}: {
  item: JobRole;
  isSelected: boolean;
  onPress: (item: JobRole) => void;
}) => {
  return (
    <TouchableOpacity
      className={`px-4 py-3 mx-1 flex self-start my-1 rounded-full ${
        isSelected ? 'bg-green-600' : 'bg-white dark:bg-transparent'
      } border border-white`}
      onPress={() => onPress(item)}>
      <Text
        numberOfLines={1}
        className={`${
          isSelected ? 'text-white' : 'text-black dark:text-white'
        }`}>
        {item.role}
      </Text>
    </TouchableOpacity>
  );
};
