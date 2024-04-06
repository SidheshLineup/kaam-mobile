import React, {useEffect} from 'react';

import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {requestUserPermissionAndFcmToken} from './src/notifications/notification-helper';
import {API_BASE_URL, API_KEY} from './config';

function App(): React.JSX.Element {
  useEffect(() => {
    (async () => await requestUserPermissionAndFcmToken())();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View className="border-2 bg-red-400">
          <Text>
            HAHA API_BASE_URL:{API_BASE_URL}, API_KEY:{API_KEY}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
