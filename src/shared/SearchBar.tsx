import {useColorScheme} from 'nativewind';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from './Icon';
import {SlidersHorizontal} from 'lucide-react-native';

type SearchBarTypes = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  advanceFilter: [];
  showBottomSheet: () => void;
};
export const SearchBar = React.forwardRef<View, SearchBarTypes>(
  (props: SearchBarTypes, ref: React.ForwardedRef<View>) => {
    const {colorScheme} = useColorScheme();
    return (
      <View ref={ref} className="my-2 flex-row items-center">
        <View className="flex-1 rounded-2xl bg-white dark:bg-slate-800">
          <TextInput
            placeholder="Search"
            onChangeText={props.setSearchText}
            value={props.searchText}
            className="mx-1 px-3 py-2 text-gray-800 dark:text-white"
            placeholderTextColor={
              colorScheme === 'dark' ? '#cbd5e1' : '#334155'
            }
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            props.showBottomSheet();
          }}
          className="ml-3 w-11 h-11 bg-white dark:bg-slate-800 rounded-2xl items-center justify-center relative">
          <Icon IconComponent={SlidersHorizontal} size="18" />
          {props.advanceFilter.length ? (
            <View className="min-w-[18px] absolute -top-1 -right-1 bg-red-500 px-1 py-0.5 rounded-lg justify-center items-center">
              <Text className="text-white text-[12px]">
                {props.advanceFilter.length}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  },
);
