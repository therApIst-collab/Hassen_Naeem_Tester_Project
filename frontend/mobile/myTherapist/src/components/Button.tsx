import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, family, wp, DEVICE_WIDTH } from "../utils";

const Button = ({
  title = "button",
  buttonStyle = {},
  buttonTextStyle = {},
  mode = "solid",
  onPress = () => {},
  disabled = false,
}) => {
  const containerStyle = [
    styles.container,
    buttonStyle,
    {
      borderWidth: mode !== "solid" ? 2 : 0,
      borderColor: colors.BLACK,
      backgroundColor: mode !== "solid" ? colors.YELLOW_COLOR : colors.BLACK,
    },
  ];

  const textStyle = [
    styles.buttonText,
    buttonTextStyle,
    {
      color: mode !== "solid" ? colors.BLACK : colors.WHITE,
    },
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH - 48,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.BLACK,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: wp(16),
    fontFamily: family.Poppins_Semi_Bold,
    color: colors.WHITE,
  },
});
