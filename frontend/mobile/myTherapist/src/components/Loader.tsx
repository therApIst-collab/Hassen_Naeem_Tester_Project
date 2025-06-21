import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Text,
  LayoutAnimation,
  Keyboard,
  UIManager,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { size, colors } from "../utils";

const { width, height } = Dimensions.get("screen");

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type LoaderProps = {
  color?: string;
};

const Loader: React.FC<LoaderProps> = ({ color = "white" }) => {
  const loader = useSelector((state: RootState) => state.loader.loading);
  // const loader = false; // Placeholder for loader state, replace with actual state management

  React.useEffect(() => {
    if (loader) {
      Keyboard.dismiss();
      LayoutAnimation?.linear?.();
    }
    // Only run effect when loader changes
  }, [loader]);

  if (!loader) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Please wait</Text>
          <View style={styles.loading}>
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={color} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 99,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 35,
    backgroundColor: "rgba(251,176,64,1)",
    borderRadius: 25,
  },
  title: {
    fontSize: size.large,
    fontWeight: "bold",
    color: colors.WHITE,
    marginBottom: 10,
  },
  loading: {
    flexDirection: "row",
    alignItems: "center",
  },
  loader: {
    flex: 1,
  },
  loadingContent: {
    flex: 3,
    fontSize: size.normal,
    paddingHorizontal: 10,
  },
  loadingText: {
    color: colors.WHITE,
    marginLeft: 5,
  },
});

export default Loader;
