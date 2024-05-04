import React from 'react';
import {useColorScheme} from 'nativewind';
import {StatusBar} from 'react-native';

const KStatusBar = ({}: {color?: string}) => {
  const {colorScheme} = useColorScheme();

  return (
    <StatusBar
      barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      backgroundColor={colorScheme === 'dark' ? 'rgb(2 6 23)' : '#f1f5f9'}
    />
  );
};

export default KStatusBar;
