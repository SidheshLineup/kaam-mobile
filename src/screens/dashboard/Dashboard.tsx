import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import KStatusBar from '../../shared/StatusBar';
import KSafeAreaView from '../../shared/SafeAreaView';
import {requestUserPermissionAndFcmToken} from '../../notifications/notification-helper';
import {registerFcmDeviceToken} from '../../redux/slice/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import Avatar from '../../shared/Avatar';
import Icon from '../../shared/Icon';
import {
  Bell,
  ChevronsLeft,
  ChevronsRight,
  LucideIcon,
  Menu,
  Search,
} from 'lucide-react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  LightSpeedInLeft,
  LightSpeedOutLeft,
  LightSpeedOutRight,
  LightSpeedInRight,
} from 'react-native-reanimated';
import {User} from '../../redux/slice/authSlice';
import {SearchBar} from '../../shared/SearchBar';
import {DefaultFilters, FilterItemType} from './DefaultFilters';
import {
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {useColorScheme} from 'nativewind';

const profileAnimationValue = {
  INITIAL_VALUE: 150,
  HIDDEN_VALUE: 56,
};
const navigationMenuAnimationValue = {
  INITIAL_VALUE: 205,
  EXPANDED_VALUE: 290,
};

const AnimatedSearchBar = Animated.createAnimatedComponent(SearchBar);
const AnimatedDefaultFilters = Animated.createAnimatedComponent(DefaultFilters);

const defaultFilterList = [
  {
    id: '1',
    name: 'Nearby',
    isSelected: false,
  },
  {
    id: '2',
    name: 'Pune',
    isSelected: false,
  },
  {
    id: '3',
    name: 'Car',
    isSelected: false,
  },
  {
    id: '4',
    name: 'Bike',
    isSelected: false,
  },
  {
    id: '5',
    name: 'Himalayan 450',
    isSelected: false,
  },
  {
    id: '6',
    name: 'SP 125',
    isSelected: false,
  },
];

const Dashboard = () => {
  const {colorScheme} = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();
  const user: User = useSelector<RootState>(state => state.auth.user) as User;
  const [showDetails, setShowDetails] = useState(true);
  const [searchBar, toggleSearchBar] = useState(false);
  const [role, setRole] = useState<'Employee' | 'Employer'>('Employee');
  const [searchText, setSearchText] = useState<string>('');
  const [expandNavigatioMenu, setExpandNavigatioMenu] = useState(false);
  const [filterList, setSelectFilter] = useState<FilterItemType[]>([
    {name: 'All', isSelected: false, id: '0'},
    ...defaultFilterList,
  ]);

  const [advanceFilter, setAdvanceFilters] = useState<[]>([]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '75%'], []);

  const profileWidth = useSharedValue(profileAnimationValue.INITIAL_VALUE);
  const profileTextOpacity = useSharedValue(1);

  const navigationMenuWidth = useSharedValue(
    navigationMenuAnimationValue.INITIAL_VALUE,
  );

  useEffect(() => {
    (async () => {
      const fcmObject = await requestUserPermissionAndFcmToken();
      if (fcmObject && fcmObject.new) {
        dispatch(registerFcmDeviceToken(fcmObject));
      }
    })();
    return () => {};
  }, [dispatch]);

  const hideProfileDetails = () => {
    profileWidth.value = withSpring(profileAnimationValue.HIDDEN_VALUE, {
      duration: 2000,
      dampingRatio: 0.8,
    });
    profileTextOpacity.value = withTiming(0, {duration: 400});
    setShowDetails(!showDetails);
  };
  const showProfileDetails = () => {
    profileWidth.value = withSpring(profileAnimationValue.INITIAL_VALUE, {
      duration: 2000,
      dampingRatio: 0.8,
    });
    profileTextOpacity.value = withTiming(1, {duration: 400});
    setTimeout(() => {
      setShowDetails(!showDetails);
    }, 500);
  };
  const expandNavigationMenu = () => {
    navigationMenuWidth.value = withSpring(
      navigationMenuAnimationValue.EXPANDED_VALUE,
      {
        duration: 2000,
        dampingRatio: 0.8,
      },
    );
    setExpandNavigatioMenu(true);
  };
  const contractNavigationMenu = () => {
    navigationMenuWidth.value = withSpring(
      navigationMenuAnimationValue.INITIAL_VALUE,
      {
        duration: 2000,
        dampingRatio: 0.8,
      },
    );

    setExpandNavigatioMenu(false);
  };

  const animatedProfileWidthStyle = useAnimatedStyle(() => {
    return {
      width: profileWidth.value,
    };
  });
  const animatedProfileTextStyle = useAnimatedStyle(() => {
    return {
      opacity: profileTextOpacity.value,
    };
  });

  const animatedNavigationMenuAnimationWidthStyle = useAnimatedStyle(() => {
    return {
      width: navigationMenuWidth.value,
    };
  });

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
  return (
    <KSafeAreaView>
      <KStatusBar />

      <View className="mt-2 flex-row justify-between">
        <Animated.View
          className="p-2 pr-5 rounded-full bg-white dark:bg-slate-800 flex-row items-center"
          style={[animatedProfileWidthStyle]}>
          <Avatar />

          {showDetails && (
            <View className="ml-2">
              <Animated.Text
                style={[animatedProfileTextStyle]}
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-black dark:text-white font-semibold">
                {user?.firstname ?? ''} {user?.lastname ?? ''}
              </Animated.Text>
              <Animated.Text
                style={[animatedProfileTextStyle]}
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-black dark:text-white">
                Pune
              </Animated.Text>
            </View>
          )}
        </Animated.View>

        <Animated.View
          style={[animatedNavigationMenuAnimationWidthStyle]}
          className="p-2 rounded-full mx-0.5 bg-white dark:bg-slate-800 flex-row items-center justify-between">
          {expandNavigatioMenu && <Role setRole={setRole} role={role} />}
          <NaviagationMenuItem
            onPress={() => {
              if (showDetails && !expandNavigatioMenu) {
                hideProfileDetails();
                expandNavigationMenu();
              } else {
                showProfileDetails();
                contractNavigationMenu();
              }
            }}
            iconComponent={expandNavigatioMenu ? ChevronsRight : ChevronsLeft}
          />
          <NaviagationMenuItem
            onPress={() => {
              toggleSearchBar(prev => !prev);
            }}
            iconComponent={Search}
          />
          <NaviagationMenuItem onPress={() => {}} iconComponent={Bell} />
          <NaviagationMenuItem onPress={() => {}} iconComponent={Menu} />
        </Animated.View>
      </View>

      {searchBar ? (
        <BottomSheetModalProvider>
          <AnimatedSearchBar
            entering={LightSpeedInRight}
            exiting={LightSpeedOutRight}
            searchText={searchText}
            setSearchText={setSearchText}
            advanceFilter={advanceFilter}
            showBottomSheet={handlePresentModalPress}
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            style={styles(colorScheme).sheetStyle}
            backgroundStyle={styles(colorScheme).bottomSheetStyle}
            enablePanDownToClose
            animateOnMount
            backdropComponent={renderBackdrop}>
            <BottomSheetView style={styles(colorScheme).bottomSheetViewStyle}>
              <Text className="text-black dark:text-white">
                Advance filters
              </Text>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      ) : (
        <AnimatedDefaultFilters
          filterList={filterList}
          setSelectFilter={setSelectFilter}
          entering={LightSpeedInLeft}
          exiting={LightSpeedOutLeft}
        />
      )}
    </KSafeAreaView>
  );
};

export default Dashboard;

export const NaviagationMenuItem = ({
  onPress,
  iconComponent,
}: {
  onPress: () => void;
  iconComponent: LucideIcon;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-900 justify-center items-center">
      <Icon
        IconComponent={iconComponent}
        darkColor="text-white"
        lightColor="text-black"
        size={'24'}
        style="rounded-full items-center justify-center"
      />
    </TouchableOpacity>
  );
};

export const Role = ({
  role,
  setRole,
}: {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<'Employee' | 'Employer'>>;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setRole(prev => {
          if (prev === 'Employee') {
            return 'Employer';
          } else {
            return 'Employee';
          }
        });
      }}
      className={`w-24 px-3 ml-0.5 h-10 rounded-full ${
        role === 'Employer' ? 'bg-green-500' : 'bg-cyan-500'
      }  justify-center items-center`}>
      <Text className="text-white">{role}</Text>
    </TouchableOpacity>
  );
};

const styles = (colorScheme: string) =>
  StyleSheet.create({
    sheetStyle: {
      shadowColor: colorScheme === 'dark' ? 'black' : 'rgb(3 7 18)',
    },
    bottomSheetStyle: {
      backgroundColor: colorScheme === 'dark' ? 'rgb(31 41 55)' : 'white',
    },
    bottomSheetViewStyle: {
      flex: 1,
      paddingHorizontal: 25,
    },
  });
