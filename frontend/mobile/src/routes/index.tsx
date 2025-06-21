import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Orientation from 'react-native-orientation-locker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import NavService from '../helpers/NavService';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const MainNavigation = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2500);
  }, []);
  return (
    <NavigationContainer
      ref={(ref: any) => NavService.setTopLevelNavigator(ref)}
    >
      <View style={styles.container}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            headerTransparent: true,
            headerTitleAllowFontScaling: true,
            gestureDirection: 'horizontal',
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight() * 1.2,
  },
});

export default MainNavigation;
