import {
  CommonActions,
  StackActions,
  DrawerActions,
  NavigationContainerRef,
  ParamListBase,
} from "@react-navigation/native";
import { Keyboard } from "react-native";

let _navigator: NavigationContainerRef<ParamListBase> | null = null;

function setTopLevelNavigator(navigatorRef: NavigationContainerRef<ParamListBase>) {
  _navigator = navigatorRef;
}

function navigate(name: string, params: Record<string, any> = {}) {
  _navigator?.dispatch(
    CommonActions.navigate({
      name,
      params,
    })
  );
}

function goBack() {
  Keyboard.dismiss();
  setTimeout(() => {
    _navigator?.dispatch(CommonActions.goBack());
  }, 100);
}

function replace(routeName: string, params: Record<string, any> = {}) {
  _navigator?.dispatch(StackActions.replace(routeName, params));
}

function reset(index: number, routes: Array<{ name: string; params?: Record<string, any> }>) {
  _navigator?.dispatch(
    CommonActions.reset({
      index,
      routes,
    })
  );
}

function openDrawer() {
  _navigator?.dispatch(DrawerActions.openDrawer());
}

function closeDrawer() {
  _navigator?.dispatch(DrawerActions.closeDrawer());
}

export default {
  navigate,
  goBack,
  replace,
  reset,
  setTopLevelNavigator,
  openDrawer,
  closeDrawer,
};