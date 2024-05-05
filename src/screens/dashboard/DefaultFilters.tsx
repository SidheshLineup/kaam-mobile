import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';

export type FilterItemType = {id: string; name: string; isSelected: boolean};

export type DefaultFiltersTypes = {
  filterList: FilterItemType[];
  setSelectFilter: React.Dispatch<React.SetStateAction<FilterItemType[]>>;
};

export const DefaultFilters = React.forwardRef<FlatList, DefaultFiltersTypes>(
  (props: DefaultFiltersTypes, ref: React.ForwardedRef<FlatList>) => {
    return (
      <FlatList
        ref={ref}
        contentContainerStyle={[styles.flatListStyle]}
        className="my-2 max-h-10"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={props.filterList}
        renderItem={({item}) => (
          <FilterItem item={item} setSelectFilter={props.setSelectFilter} />
        )}
        keyExtractor={item => item.id}
      />
    );
  },
);

export const FilterItem = ({
  item,
  setSelectFilter,
}: {
  item: FilterItemType;
  setSelectFilter: React.Dispatch<React.SetStateAction<FilterItemType[]>>;
}) => {
  return (
    <TouchableOpacity
      className={`h-6 mx-1 px-4 rounded-full justify-center  ${
        item.isSelected
          ? 'bg-gray-800 dark:bg-white'
          : 'bg-gray-200 dark:bg-slate-800'
      }`}
      onPress={() => {
        setSelectFilter(prev =>
          prev.map(i => {
            if (i.id === item.id) {
              i.isSelected = !item.isSelected;
            }
            return i;
          }),
        );
      }}>
      <Text
        className={
          item.isSelected
            ? 'text-white dark:text-black'
            : 'text-black dark:text-white'
        }>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flatListStyle: {
    alignItems: 'center',
  },
});
