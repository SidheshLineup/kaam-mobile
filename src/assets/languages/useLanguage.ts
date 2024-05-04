import {useDispatch, useSelector} from 'react-redux';
import {Languages} from './languages';
import {RootState} from '../../redux/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

const useLanguage = () => {
  const dispatch = useDispatch();

  const language = useSelector(
    (state: RootState) => state.language.data,
  ) as keyof typeof Languages;

  useEffect(() => {
    console.log('useLanguage useEffect');
    async function getSavedTheme() {
      return await AsyncStorage.getItem('language');
    }
    getSavedTheme().then(savedLanguage => {
      console.log('savedLanguage', savedLanguage);
      if (savedLanguage) {
        // dispatch(changeLanguage(savedLanguage));
      }
    });
  }, [dispatch]);

  return Languages[language];
};

export default useLanguage;
