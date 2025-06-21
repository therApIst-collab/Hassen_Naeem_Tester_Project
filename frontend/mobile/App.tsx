import React, { ReactNode, useEffect } from "react";
import {
  KeyboardAvoidingView,
  View,
  StatusBar,
  Platform,
  LogBox,
  StyleSheet,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Provider } from "react-redux";
import store from "./src/store";
import Loader from "./src/components/Loader";
import MainNavigation from "./src/routes";
import ErrorBoundary from "./src/components/ErrorBoundary";
import { colors } from "./src/utils";

// ignore warnings
LogBox.ignoreAllLogs();

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      text1NumberOfLines={5}
      style={{
        borderLeftColor: colors.YELLOW_COLOR,
        maxHeight: 120,
        height: "100%",
        paddingVertical: 20,
      }}
      text1Style={{
        fontSize: 14,
        color: colors.BLACK,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={5}
      style={{
        borderLeftColor: colors.ALERT,
        maxHeight: 120,
        height: "100%",
        paddingVertical: 20,
      }}
      text1Style={{
        fontSize: 14,
        color: colors.BLACK,
      }}
    />
  ),
};

const App = () => {
  return (
    <Wrapper>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Provider store={store}>
          <Loader />
          <ErrorBoundary>
            <MainNavigation />
          </ErrorBoundary>
          <Toast config={toastConfig} />
        </Provider>
      </GestureHandlerRootView>
    </Wrapper>
  );
};

export default App;

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  if (Platform.OS === "ios")
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={[styles.container, styles.containerWhiteBackground]}>
          {children}
        </View>
      </KeyboardAvoidingView>
    );
  return (
    <View style={[styles.container, styles.containerWhiteBackground]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerWhiteBackground: {
    backgroundColor: colors.YELLOW_COLOR,
  },
});
