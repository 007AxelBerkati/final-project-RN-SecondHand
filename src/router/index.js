/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AkunScreen, DaftarJualScreen, HomeScreen, JualScreen, NotifikasiScreen,
  LoginScreen, RegisterScreen,
} from '../pages';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      activeColor="#fff"
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarStyle: {
          paddingTop: 10,
          height: 60,
        },
        tabBarLabelStyle: {
          marginBottom: 10,
        },
      })}

    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
          headerShown: false,

        }}
      />

      <Tab.Screen
        name="Notifikasi"
        component={NotifikasiScreen}
        options={{
          tabBarLabel: 'Notifikasi',
          tabBarColor: 'red',
          tabBarIcon: ({ color }) => (
            <Icon name="notifications" color={color} size={26} />
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
            <Icon name="add-circle-outline" color={color} size={26} />
          ),
          headerShown: false,

        }}
      />

      <Tab.Screen
        name="Daftar Jual"
        component={DaftarJualScreen}
        options={{
          tabBarLabel: 'Daftar Jual',
          tabBarColor: 'green',
          tabBarIcon: ({ color }) => (
            <Icon name="list" color={color} size={26} />
          ),
          headerShown: false,

        }}
      />
      <Tab.Screen
        name="Akun"
        component={AkunScreen}
        options={{
          tabBarLabel: 'Akun',
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />

    </Tab.Navigator>
  );
}

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">

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
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
