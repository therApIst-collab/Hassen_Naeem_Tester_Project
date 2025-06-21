import { Platform, Alert, Linking, PermissionsAndroid } from "react-native";

export const TIME1 = "HH:mm";

let newInstance: any = null;

class Util {
  getWeatherIconName(weathercode: any): string {
    switch (weathercode) {
      case 0:
        return "weather-sunny";
      case 1:
      case 2:
      case 3:
        return "weather-partly-cloudy";
      case 45:
      case 48:
        return "weather-fog";
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return "weather-rainy";
      case 61:
      case 63:
      case 65:
      case 80:
      case 81:
      case 82:
        return "weather-pouring";
      case 66:
      case 67:
        return "weather-snowy-rainy";
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return "weather-snowy";
      case 95:
        return "weather-lightning";
      case 96:
      case 99:
        return "weather-lightning";
      default:
        return "weather-cloudy";
    }
  }
  reduxStore: any = null;

  keyExtractor = (item: any, index: number): string => index.toString();

  isPlatformAndroid(): boolean {
    return Platform.OS === "android";
  }

  isValidURL(url: string): boolean {
    const re =
      /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }

  isEmailValid(email: string): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  isPasswordValid(password: string): boolean {
    return password.length > 7;
  }

  isValidPasswordFormat(password: string): boolean {
    const passReg =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/;
    return passReg.test(password);
  }

  isValidName(name: string): boolean {
    return /^[a-zA-Z '.-]*$/.test(name);
  }

  isValidQuantity(quantity: number): boolean {
    return quantity > 0;
  }

  getValidImage(image: any): any {
    if (typeof image === "string" && this.isValidURL(image)) {
      return { uri: image };
    }
    return image;
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  isRequiredMessage(field: string): string {
    return `${this.capitalizeFirstLetter(field)} is required`;
  }

  isInvalidMessage(field: string): string {
    return `Invalid ${this.capitalizeFirstLetter(field)}`;
  }

  showLoader = (instance: any, loadingFor = ""): void => {
    if (!instance.state.loading) {
      newInstance = instance;
      instance.setState({
        loading: true,
        loadingFor,
      });
    }
  };

  hideLoader = (instance: any, callback?: () => void): void => {
    if (instance.state.loading) {
      instance.setState(
        {
          loading: false,
          loadingFor: "",
        },
        callback
      );
    }
  };

  getCurrentUserAccessToken(): string {
    return this.reduxStore.getState().user.access_token;
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth());
    const formatDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1 < 10
        ? `0${currentDate.getMonth() + 1}`
        : currentDate.getMonth() + 1
    }-${("0" + currentDate.getDate()).slice(-2)}`;
    return formatDate;
  }

  getErrorText(error: any): string {
    if (Array.isArray(error)) {
      if (error.length > 0) return error[0];
    } else {
      return error;
    }
    return "";
  }

  discardAlert(onYesPress: () => void): void {
    Alert.alert(
      "Discard?",
      "DISCARD_WARNING",
      [
        { text: "Yes", onPress: onYesPress },
        { text: "No", style: "cancel" },
      ],
      { cancelable: true }
    );
  }

  isNumber(val: string): boolean {
    return /^\d+$/.test(val);
  }

  openLinkInBrowser(url: string): void {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: ");
      }
    });
  }

  generateGetParameter(obj: Record<string, any>): string {
    let final = "?";
    for (const key in obj) {
      final = `${final}${key}=${obj[key]}&`;
    }
    final = final.slice(0, -1);
    return final;
  }

  async getCoordinates(): Promise<any> {
    const self = this;
    return new Promise(async function (resolve) {
      let granted: any = undefined;
      if (self.isPlatformAndroid()) {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
      } else {
        // @ts-ignore
        navigator.geolocation.requestAuthorization();
      }

      if (
        !self.isPlatformAndroid() ||
        (self.isPlatformAndroid() &&
          granted === PermissionsAndroid.RESULTS.GRANTED)
      ) {
        // @ts-ignore
        navigator.geolocation.getCurrentPosition(
          (geo_success: any) => {
            const { latitude, longitude } = geo_success.coords;
            resolve({ latitude, longitude });
          },
          (geo_error: any) => {
            resolve(geo_error);
          },
          { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
        );
      } else {
        resolve({ error: "Android permission required" });
      }
    });
  }

  setStore(store: any): void {
    this.reduxStore = store;
  }

  getStore(): any {
    return this.reduxStore;
  }

  secondsToHHMMSS = (seconds: number): string => {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : "";
    const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : "00:";
    const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : "00";
    return `${hrs}${mins}${scnds}`;
  };

  normalizeUrl = (url: string): string => {
    if (typeof url !== "string" || url.trim() === "") {
      return "";
    }
    if (url.startsWith("/")) {
      return url;
    } else {
      return "/" + url;
    }
  };

  getHourlyData = (forecast: any): any[] => {
    return (
      forecast?.hourly?.time?.map((time: string, idx: number) => ({
        time,
        temperature: forecast.hourly.temperature_2m[idx],
        feelsLike: forecast.hourly.apparent_temperature[idx],
        humidity: forecast.hourly.relative_humidity_2m[idx],
        windspeed: forecast.hourly.windspeed_10m[idx],
        winddirection: forecast.hourly.winddirection_10m[idx],
        weathercode: forecast.hourly.weathercode[idx],
        precipitation: forecast.hourly.precipitation[idx],
        uvIndex: forecast.hourly.uv_index[idx],
        cloudcover: forecast.hourly.cloudcover[idx],
        pressure: forecast.hourly.pressure_msl[idx],
        dewpoint: forecast.hourly.dewpoint_2m[idx],
        visibility: forecast.hourly.visibility[idx],
      })) || []
    );
  };
}

export default new Util();
