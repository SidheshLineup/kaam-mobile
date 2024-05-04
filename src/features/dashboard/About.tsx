import React from 'react';
import {Text} from 'react-native';
import KStatusBar from '../../shared/StatusBar';
import KSafeAreaView from '../../shared/SafeAreaView';

const About = () => {
  return (
    <KSafeAreaView>
      <KStatusBar />
      <Text className="dark:text-red-400">About</Text>
    </KSafeAreaView>
  );
};

export default About;
