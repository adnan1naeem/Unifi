import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from './screens/Home/Home';
import { Colors } from "./Utils/Colors";
import Guests from "./screens/Guests/Guests";
import Payments from "./screens/Payments/Payments";
import Vouchers from './screens/Vouchers/Vouchers';
import Tools from './screens/Tools/Index';
import { Image, Platform } from "react-native";


const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarInactiveTintColor: Colors.blur,
                tabBarActiveTintColor: Colors.white,
                tabBarStyle: {
                    height: Platform.OS === "ios" ? 80 : 60,
                    paddingHorizontal: 5,
                    paddingTop: 5,
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    borderTopWidth: 0,
                    paddingBottom: 20
                },

            })}
        >
            <Tab.Screen
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-sharp" color={color} size={size} />
                    ),
                }}
                name="Home"
                component={Home}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: "Guests",
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../assets/Guests.png')} tintColor={color} size={size} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                    ),
                }}
                name="Guests"
                component={Guests}
            />
            {/* <Tab.Screen
                options={{
                    tabBarLabel: "Payments",
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../assets/Doller.png')} tintColor={color} size={size} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                    ),
                }}
                name="Payments"
                component={Payments}
            /> */}
            <Tab.Screen
                options={{
                    tabBarLabel: "Vouchers",
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../assets/payments.png')} tintColor={color} size={size} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                    ),
                }}
                name="Vouchers"
                component={Vouchers}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: "Tools",
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../assets/Tools.png')} tintColor={color} size={size} style={{ height: 25, width: 25, resizeMode: 'contain' }} />),
                }}
                name="Tools"
                component={Tools}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;
