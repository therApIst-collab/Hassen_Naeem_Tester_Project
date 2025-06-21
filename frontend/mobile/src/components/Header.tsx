import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { colors, family, hp, wp } from "../utils";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Header = ({ title = "Header Title", onPressButton = () => {} }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="keyboard-backspace"
        size={wp(26)}
        color={colors.BLACK}
        onPress={onPressButton}
      />
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: hp(62),
    backgroundColor: colors.YELLOW_COLOR,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(24),
  },
  titleText: {
    fontSize: wp(16),
    fontFamily: family.Poppins_Semi_Bold,
    color: colors.BLACK,
    marginLeft: wp(12),
  },
});
