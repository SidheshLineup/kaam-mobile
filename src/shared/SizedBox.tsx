import {View} from 'react-native';
import React from 'react';

export const SizedBox = ({
  height,
  width,
}: {
  height?: number;
  width?: number;
}) => {
  return <View style={{width, height}} />;
};
