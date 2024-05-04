import {useColorScheme} from 'nativewind';
import React from 'react';
import {Switch, Text, TouchableOpacity, View} from 'react-native';
import KStatusBar from '../../shared/StatusBar';
import Box from '../../shared/Box';
import KSafeAreaView from '../../shared/SafeAreaView';
import Icon from '../../shared/Icon';
import {ChevronsLeft} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const Dashboard = () => {
  const navigate = useNavigation();
  const {colorScheme, toggleColorScheme} = useColorScheme();
  return (
    <KSafeAreaView>
      <KStatusBar />
      <Text className="text-red-600 dark:text-slate-100 ">jsbhdfsd</Text>
      <Switch value={colorScheme === 'dark'} onChange={toggleColorScheme} />

      <View className="w-full items-center">
        <AnimatedBox style="w-[200px] flex-row items-center px-2">
          <Icon
            IconComponent={ChevronsLeft}
            darkColor="text-purple-500"
            style="rounded-full items-center justify-center"
          />
        </AnimatedBox>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigate.navigate('About' as never);
        }}>
        <Text>Go to About</Text>
      </TouchableOpacity>
    </KSafeAreaView>
  );
};

export default Dashboard;

// withTiming(sv.value, {
//   duration: 830,
//   easing: Easing.bezier(0.21, 0.62, 0.47, 1.17),
//   reduceMotion: ReduceMotion.System,
// });
