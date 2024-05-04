import clsx from 'clsx';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const KSafeAreaView = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: string;
}) => {
  const styles = clsx(
    'px-5 w-full h-full bg-slate-100 dark:bg-slate-950',
    style,
  );
  return <SafeAreaView className={styles}>{children}</SafeAreaView>;
};

export default KSafeAreaView;
