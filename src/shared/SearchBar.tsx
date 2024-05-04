import {useColorScheme} from 'nativewind';
import {TextInput, View} from 'react-native';
import React from 'react';

type SearchBarTypes = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};
export const SearchBar = React.forwardRef<View, SearchBarTypes>(
  (props: SearchBarTypes, ref: React.ForwardedRef<View>) => {
    const {colorScheme} = useColorScheme();
    return (
      <View ref={ref} className="my-2 rounded-full bg-white dark:bg-slate-800">
        <TextInput
          placeholder="Search"
          onChangeText={props.setSearchText}
          value={props.searchText}
          className="mx-1 px-3 py-2 text-gray-800 dark:text-white"
          placeholderTextColor={colorScheme === 'dark' ? '#cbd5e1' : '#334155'}
        />
      </View>
    );
  },
);
