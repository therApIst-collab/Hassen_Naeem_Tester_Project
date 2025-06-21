import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  NativeModules,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import LottieView from "lottie-react-native";
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { fetchWeather, fetchForecast } from "../../store/slices/weatherSlice";
import { RootState, AppDispatch } from "../../store";
import { wp, hp } from "../../utils";
import { sendWeatherNotification } from "../../utils/notification";
import Utils from "../../utils/Utils";
import GeoCodeServices from "../../services/geocodeService";
import Header from "../../components/Header";
import NavService from "../../helpers/NavService";
import styles from "./styles";

const HomeScreen = ({ route }: { route: any }) => {
  const { latitude, longitude } = route.params || {};
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const weather = useSelector((state: RootState) => state.weather.weather);
  const forecast = useSelector((state: RootState) => state.weather.forecast);
  const error = useSelector((state: RootState) => state.weather.error);
  const [refreshing, setRefreshing] = useState(false);
  const [locationName, setLocationName] = useState<{
    city: string;
    state: string;
  }>({ city: "", state: "" });

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeatherData();
    setRefreshing(false);
  };

  const fetchWeatherData = async () => {
    if (latitude && longitude) {
      dispatch(fetchWeather({ lat: latitude, lon: longitude }));
      dispatch(fetchForecast({ lat: latitude, lon: longitude }));
      const response = await GeoCodeServices.querySearchLatLon(
        `lat=${latitude}&lon=${longitude}&format=json&limit=1`
      );
      const data = response.data;
      if (data) {
        const city =
          data.address.city || data.address.town || data.address.village || "";
        const state = data.address.state || "";
        setLocationName({ city: city || "Unknown", state: state || "Unknown" });
      } else {
        console.warn(
          "Location not found for the given latitude and longitude."
        );
        setLocationName({ city: "Unknown", state: "Unknown" });
      }
    } else {
      // Handle case where latitude and longitude are not available
      console.warn("Latitude and longitude are not available.");
      setLocationName({ city: "Unknown", state: "Unknown" });
    }
  };
  useEffect(() => {
    fetchWeatherData();
    const iosBackgroundLocation = NativeModules?.BackgroundLocationModule;
    iosBackgroundLocation?.fetchDeviceCurrentLiveLocation("dskjcbdjsh");
  }, []);

  useEffect(() => {
    if (weather) {
      if (weather.windspeed > 40) {
        sendWeatherNotification(
          "High Wind Alert!",
          `Wind speed is ${weather.windspeed} Km/h. Stay safe!`
        );
        Toast.show({
          text1: "High Wind Alert!",
          text2: `Wind speed is ${weather.windspeed} Km/h. Stay safe!`,
          type: "success",
          visibilityTime: 3000,
        });
      }
      if (weather.visibility < 2) {
        sendWeatherNotification(
          "Low Visibility Alert!",
          `Visibility is only ${weather.visibility} Km. Drive carefully!`
        );
        Toast.show({
          text1: "Low Visibility Alert!",
          text2: `Visibility is only ${weather.visibility} Km. Drive carefully!`,
          type: "success",
          visibilityTime: 3000,
        });
      }
      if (weather.temperature >= 40) {
        sendWeatherNotification(
          "Extreme Heat Alert!",
          `Temperature is ${(weather.temperature * 1.8 + 32).toFixed(
            1
          )}°F. Stay hydrated!`
        );
        Toast.show({
          text1: "Extreme Heat Alert!",
          text2: `Temperature is ${(weather.temperature * 1.8 + 32).toFixed(
            1
          )}°F. Stay hydrated!`,
          type: "success",
          visibilityTime: 3000,
        });
      }
      if (weather.temperature <= 0) {
        sendWeatherNotification(
          "Freezing Temperature Alert!",
          `Temperature is ${(weather.temperature * 1.8 + 32).toFixed(
            1
          )}°F. Dress warmly!`
        );
        Toast.show({
          text1: "Freezing Temperature Alert!",
          text2: `Temperature is ${(weather.temperature * 1.8 + 32).toFixed(
            1
          )}°F. Dress warmly!`,
          type: "success",
          visibilityTime: 3000,
        });
      }
      if (weather.uvIndex >= 8) {
        sendWeatherNotification(
          "High UV Index!",
          `UV Index is ${weather.uvIndex}. Wear sunscreen and avoid direct sunlight!`
        );
        Toast.show({
          text1: "High UV Index!",
          text2: `UV Index is ${weather.uvIndex}. Wear sunscreen and avoid direct sunlight!`,
          type: "success",
          visibilityTime: 3000,
        });
      }
      if (weather.precipitation > 10) {
        sendWeatherNotification(
          "Heavy Rain Alert!",
          `Precipitation is ${weather.precipitation} mm. Carry an umbrella!`
        );
        Toast.show({
          text1: "Heavy Rain Alert!",
          text2: `Precipitation is ${weather.precipitation} mm. Carry an umbrella!`,
          type: "success",
          visibilityTime: 3000,
        });
      }
      if (
        weather.weathercode === 95 ||
        weather.weathercode === 96 ||
        weather.weathercode === 99
      ) {
        sendWeatherNotification(
          "Storm Warning!",
          "Thunderstorm conditions detected. Stay indoors and stay safe!"
        );
        Toast.show({
          text1: "Storm Warning!",
          text2:
            "Thunderstorm conditions detected. Stay indoors and stay safe!",
          type: "success",
          visibilityTime: 3000,
        });
      }
    }
  }, [weather]);

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  if (!weather || !forecast) return null; // Loader is global

  // Render future forecast
  type ForecastItem = {
    temperature: number | undefined;
    weathercode: number;
    time: string;
    day?: {
      avgtemp_c: number;
      condition: {
        icon: string;
      };
    };
  };

  const _renderForeCastItem = useCallback(
    ({ item, index }: { item: ForecastItem; index: number }) => (
      <View style={styles.foreCastContainer}>
        <Text style={styles.foreCastTemp}>
          {item?.temperature !== undefined
            ? `${(item?.temperature * 1.8 + 32).toFixed(0)}°F`
            : "--"}
          °
        </Text>
        <MaterialCommunityIcons
          name={Utils.getWeatherIconName(item.weathercode)}
          size={32}
          color="#333"
        />
        <Text style={styles.foreCastDate}>
          {moment(item.time).format("hh:mm A")}
        </Text>
      </View>
    ),
    []
  );

  const hourlyData = Utils.getHourlyData(forecast) || []; // Assuming getHourlyData is a utility function to extract hourly data

  return (
    <View style={styles.container}>
      <Header
        {...navigation}
        title="Weather"
        onPressButton={() => NavService.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      >
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {moment().format("dddd, DD MMMM")}
          </Text>
        </View>
        <Text style={styles.conditionText}>
          {locationName !== null
            ? `${locationName?.city}, ${locationName?.state}`
            : "--"}
        </Text>
        <Text
          style={styles.tempText}
          accessibilityLabel={`Current temperature is ${weather?.temperature} degrees Fahrenheit`}
        >
          {weather?.temperature !== undefined
            ? `${(weather.temperature * 1.8 + 32).toFixed(1)}°F`
            : "--"}
        </Text>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Daily Summary</Text>
          <Text style={styles.summaryText}>
            {`Now it feels like ${
              weather?.temperature !== undefined
                ? `${(weather.temperature * 1.8 + 32).toFixed(1)}°F`
                : "--"
            }°`}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <LottieView
              autoPlay
              source={require("../../assets/animation/wind.json")}
              style={{
                height: wp(50),
                width: wp(50),
              }}
            />
            <Text style={styles.infoMainText}>
              {weather.windspeed !== undefined
                ? `${weather.windspeed} Km/h`
                : "--"}
            </Text>
            <Text style={styles.infoText}>Wind</Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <LottieView
              autoPlay
              source={require("../../assets/animation/humidity.json")}
              style={{
                height: wp(50),
                width: wp(50),
              }}
              resizeMode="cover"
            />
            <Text style={styles.infoMainText}>
              {weather.winddirection !== undefined
                ? `${weather.winddirection}`
                : "--"}
            </Text>
            <Text style={styles.infoText}>Pressure</Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <LottieView
              autoPlay
              source={require("../../assets/animation/eye1.json")}
              style={{
                height: wp(50),
                width: wp(50),
              }}
            />
            <Text style={styles.infoMainText}>
              {weather.visibility !== undefined
                ? `${weather.visibility} Km`
                : "--"}
            </Text>
            <Text style={styles.infoText}>Visibility</Text>
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Hourly Forecast</Text>

          <FlatList
            data={hourlyData}
            renderItem={_renderForeCastItem}
            horizontal
            ItemSeparatorComponent={() => {
              return <View style={{ width: 12 }} />;
            }}
            style={{ width: "100%", marginVertical: hp(16) }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            bounces={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
