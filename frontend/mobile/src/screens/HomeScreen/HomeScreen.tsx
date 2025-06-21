import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  NativeModules,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState, AppDispatch } from '../../store';
import { wp, hp } from '../../utils';
import Utils from '../../utils/Utils';
import Header from '../../components/Header';
import NavService from '../../helpers/NavService';
import styles from './styles';

const HomeScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        {...navigation}
        title="Weather"
        onPressButton={() => NavService.goBack()}
      />
    </View>
  );
};

export default HomeScreen;
