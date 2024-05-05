import React, {useEffect} from 'react';
import {} from './src/notifications/notification-helper';
import RouteStack from './src/routes/RouteStack';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import {useColorScheme as useColorSchemeTailwind} from 'nativewind';
import {Text, View, useColorScheme} from 'react-native';
import {ColorSchemeSystem} from 'nativewind/dist/style-sheet/color-scheme';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const {setColorScheme} = useColorSchemeTailwind();

  useEffect(() => {
    setColorScheme(colorScheme as ColorSchemeSystem);
  }, [colorScheme, setColorScheme]);

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <RouteStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export const AppWrapper = () => (
  <Provider store={store}>
    <App />
    <Toast config={toastConfig} />
  </Provider>
);

export default AppWrapper;

const toastConfig = {
  errorToast: ({text1}: {text1?: string}) => (
    <View className="mx-auto w-[80%] p-3 bg-red-500 rounded-full justify-center">
      <Text className="text-white">{text1}</Text>
    </View>
  ),
};
