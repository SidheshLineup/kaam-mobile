import React, {useEffect} from 'react';
import {requestUserPermissionAndFcmToken} from './src/notifications/notification-helper';
import RouteStack from './src/routes/RouteStack';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import {useColorScheme as useColorSchemeTailwind} from 'nativewind';
import {useColorScheme} from 'react-native';
import {ColorSchemeSystem} from 'nativewind/dist/style-sheet/color-scheme';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const {setColorScheme} = useColorSchemeTailwind();

  useEffect(() => {
    setColorScheme(colorScheme as ColorSchemeSystem);

    // (async () => await requestUserPermissionAndFcmToken())();
  }, [colorScheme, setColorScheme]);

  return (
    <NavigationContainer>
      <RouteStack />
    </NavigationContainer>
  );
}

export const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;
