import {View} from 'react-native';
import React from 'react';
import clsx from 'clsx';

const Box = ({
  style,
  children,
}: {
  style: string;
  children?: React.ReactNode;
}) => {
  const styles = clsx(
    'w-20 h-[45px] bg-slate-50 dark:bg-slate-800 rounded-[30px]',
    style,
  );
  return <View className={styles}>{children}</View>;
};

export default Box;
