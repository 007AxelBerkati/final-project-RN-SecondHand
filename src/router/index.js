/* eslint-disable react/no-unstable-nested-components */
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
// import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import {
  AkunScreen,
  DaftarJualScreen,
  HomeScreen,
  JualScreen,
  NotifikasiScreen,
  LoginScreen,
  RegisterScreen,
  SplashScreen,
  InfoPenawaranScreen,
  PreviewScreen,
  DetailProductScreen,
  DetailProductSellerScreen,
  UpdateDetailProductScreen,
  PengaturanScreen,
  ForgotPasswordScreen,
  DaftarSimpanScreen,
  HistoryScreen,
} from '../pages';
import { colors, fonts } from '../utils';
import ProfileScreen from '../pages/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background.primary,
  },
  fonts: {
    regular: 'Poppins-Regular',
  },
};

function MyTabs() {
  const read = useSelector((state) => state.dataNotifikasi.read);
  return (
    <Tab.Navigator
      initialRouteName="DaftarSimpanScreen"
      screenOptions={() => ({
        tabBarStyle: {
          paddingTop: 10,
          height: 60,
        },
        tabBarLabelStyle: {
          marginBottom: 10,
          fontFamily: fonts.Poppins.Regular,
        },
        tabBarActiveTintColor: colors.secondary,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home-outline" color={color} size={22} />,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Notifikasi"
        component={NotifikasiScreen}
        options={{
          tabBarLabel: 'Notifikasi',
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="notifications-outline" color={color} size={22} />
              {read === false && (
                <Icon
                  name="ellipse"
                  color="red"
                  size={10}
                  style={{ position: 'absolute', right: 0 }}
                />
              )}
            </View>
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Jual"
        component={JualScreen}
        options={{
          tabBarLabel: 'Jual',
          tabBarIcon: ({ color }) => (
            <Icon name="add-circle-outline" color={color} size={22} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="DaftarJual"
        component={DaftarJualScreen}
        options={{
          tabBarLabel: 'Daftar Jual',
          tabBarIcon: ({ color }) => <Icon name="list" color={color} size={22} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Akun"
        component={AkunScreen}
        options={{
          tabBarLabel: 'Akun',
          tabBarIcon: ({ color }) => (
            <Icon name="person-outline" color={color} size={22} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function Router({ notif }) {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainApp"
          component={MyTabs}
          options={{ headerShown: false }}
          initialParams={{ notif }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PreviewScreen"
          component={PreviewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailProductSellerScreen"
          component={DetailProductSellerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailProductScreen"
          component={DetailProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateDetailProductScreen"
          component={UpdateDetailProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InfoPenawaranScreen"
          component={InfoPenawaranScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PengaturanScreen"
          component={PengaturanScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DaftarSimpanScreen"
          component={DaftarSimpanScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HistoryScreen"
          component={HistoryScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
