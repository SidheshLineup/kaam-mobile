import React, {useEffect} from 'react';
import {Text} from 'react-native';
import KStatusBar from '../../shared/StatusBar';
import KSafeAreaView from '../../shared/SafeAreaView';

const Contact = () => {
  useEffect(() => {
    console.log('Contact::useEffect');
    return () => {
      console.log('Contact::useEffect::return');
    };
  }, []);
  return (
    <KSafeAreaView>
      <KStatusBar />
      <Text className="dark:text-red-400">Contact</Text>
    </KSafeAreaView>
  );
};

export default Contact;
