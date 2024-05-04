import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorageItem = (key: string, value: string) => async () => {
  console.log('setAsyncStorageItem key', key);
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('setAsyncStorageItem error', error);
  }
};
export const getAsyncStorageItem = (key: string) => async () => {
  const value = await AsyncStorage.getItem(key);
  console.log('getAsyncStorageItem');
  return value;
};
