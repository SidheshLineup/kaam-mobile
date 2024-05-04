import {Image, View} from 'react-native';
import React from 'react';

const Avatar = () => {
  return (
    <View className="w-10 h-10 rounded-full overflow-hidden">
      <Image
        className="w-full h-full"
        source={{
          uri: 'https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg',
        }}
      />
    </View>
  );
};

export default Avatar;
