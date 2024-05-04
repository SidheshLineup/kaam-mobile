import clsx from 'clsx';
import {LucideIcon} from 'lucide-react-native';
import {useColorScheme} from 'nativewind';
import React from 'react';

const Icon = ({
  IconComponent,
  darkColor,
  lightColor,
  size,
  style,
  onPress,
}: {
  IconComponent: LucideIcon;
  darkColor?: string;
  lightColor?: string;
  size?: string;
  style?: string;
  onPress?: () => void;
}) => {
  const {colorScheme} = useColorScheme();
  const darkThemeIconColor = colorScheme === 'dark' && darkColor;
  const lightThemeIconColor = colorScheme === 'light' && lightColor;

  const styles = clsx(
    style,
    `${colorScheme === 'light' ? 'text-black ' : 'text-white'}`,
    darkThemeIconColor,
    lightThemeIconColor,
  );

  return (
    <IconComponent className={styles} size={size ?? 30} onPress={onPress} />
  );
};

export default Icon;
