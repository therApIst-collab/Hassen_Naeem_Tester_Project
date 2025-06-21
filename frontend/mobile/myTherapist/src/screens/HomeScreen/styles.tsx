import { StyleSheet } from "react-native";
import { colors, family, wp, hp } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.YELLOW_COLOR,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.YELLOW_COLOR, // or your app's background color
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(24),
    marginTop: hp(16),
  },
  cityText: {
    flex: 1,
    marginHorizontal: wp(12),
    fontSize: wp(18),
    fontFamily: family.Poppins_Bold,
    color: colors.BLACK,
    textAlign: "center",
    alignSelf: "center",
  },
  tempText: {
    fontSize: wp(110),
    fontFamily: family.Poppins_Regular,
    color: colors.BLACK,
    textAlign: "center",
  },
  conditionText: {
    fontSize: wp(18),
    fontFamily: family.Poppins_Regular,
    color: colors.BLACK,
    textAlign: "center",
  },
  dateContainer: {
    paddingVertical: hp(6),
    paddingHorizontal: wp(12),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.BLACK,
    borderRadius: 60,
    marginVertical: hp(14),
    alignSelf: "center",
  },
  dateText: {
    fontSize: wp(14),
    fontFamily: family.Poppins_Regular,
    color: colors.WHITE,
  },
  summaryContainer: {
    alignItems: "flex-start",
    marginHorizontal: wp(24),
  },
  summaryTitle: {
    fontSize: wp(16),
    fontFamily: family.Poppins_Bold,
    color: colors.BLACK,
  },
  summaryText: {
    fontSize: wp(12),
    fontFamily: family.Poppins_Semi_Bold,
    color: colors.BLACK,
    marginTop: hp(6),
  },
  infoContainer: {
    marginHorizontal: wp(24),
    marginVertical: hp(24),
    borderColor: colors.BLACK,
    borderWidth: 3,
    borderRadius: 12,
    paddingHorizontal: wp(20),
    paddingVertical: hp(16),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  infoMainText: {
    fontSize: wp(16),
    fontFamily: family.Poppins_Bold,
    color: colors.BLACK,
    marginTop: hp(10),
  },
  infoText: {
    fontSize: wp(14),
    fontFamily: family.Poppins_Regular,
    color: colors.BLACK,
  },
  foreCastContainer: {
    paddingVertical: hp(12),
    paddingHorizontal: wp(8),
    borderWidth: 2,
    borderColor: colors.BLACK,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: wp(72),
  },
  foreCastTemp: {
    fontSize: wp(12),
    fontFamily: family.Poppins_Semi_Bold,
    color: colors.BLACK,
  },
  foreCastDate: {
    fontSize: wp(10),
    fontFamily: family.Poppins_Regular,
    color: colors.BLACK,
    textAlign: "center",
  },
  forecastIconStyle: {
    height: wp(30),
    width: wp(30),
    tintColor: colors.BLACK,
  },
  alertContainer: {
    marginHorizontal: wp(24),
    paddingVertical: hp(12),
  },
  alertInnerContainer: {
    flex: 1,
    borderColor: colors.ALERT,
    borderWidth: 3,
    borderRadius: 12,
    padding: wp(8),
    marginVertical: 8,
    // minHeight: hp(150)
  },
  alertHeadline: {
    fontSize: wp(14),
    fontFamily: family.Poppins_Semi_Bold,
    color: colors.BLACK,
    width: "95%",
  },
  alertDesc: {
    fontSize: wp(12),
    fontFamily: family.Poppins_Regular,
    color: colors.BLACK,
    marginTop: hp(4),
    width: "95%",
  },
  pagingContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(8),
    paddingVertical: hp(4),
    borderRadius: 20,
  },
  pagingText: {
    fontSize: wp(12),
    fontFamily: family.Poppins_Regular,
    color: colors.WHITE,
  },
  errorText: {
    fontSize: wp(12),
    fontFamily: family.Poppins_Regular,
    color: colors.ALERT,
  },
});

export default styles;
