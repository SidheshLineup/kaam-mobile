import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import KSafeAreaView from '../../shared/SafeAreaView';
import KStatusBar from '../../shared/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {JobRole, getJobPreference} from '../../redux/slice/jobPreferenceSlice';
import {SizedBox} from '../../shared/SizedBox';
import {useColorScheme} from 'nativewind';

const JobPreferences = () => {
  const dispatch = useDispatch<AppDispatch>();
  const jobRoles: JobRole[] = useSelector<RootState>(
    state => state.jobPreference.jobRoles,
  ) as JobRole[];

  const {colorScheme} = useColorScheme();
  const [allJobRoles, setAllJobRoles] = useState(jobRoles ?? []);
  const [selectedJobs, setSelectedJobs] = useState<JobRole[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const maxSelection = 10;

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
        // Handle max selection limit reached
        console.log(`Max selection limit of ${maxSelection} reached`);
      }
    }
  };

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
        className="my-2"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View className="py-4 flex-row flex-wrap">
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
