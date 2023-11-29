import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from './screens/Home/Home';
import { Colors } from "./Utils/Colors";
import Guests from "./screens/Guests/Guests";
import Payments from "./screens/Payments/Payments";
import Vouchers from './screens/Vouchers/Vouchers';
import Operators from './screens/Operators/Operators';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator

            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarInactiveTintColor: Colors.blur,
                tabBarActiveTintColor: Colors.white,
                tabBarStyle: {
                    height: 90,
                    paddingHorizontal: 5,
                    paddingTop: 0,
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    borderTopWidth: 0,
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
                        <FontAwesome5 name="user-friends" color={color} size={size} />
                    ),
                }}
                name="Guests"
                component={Guests}
            />

            <Tab.Screen
                options={{
                    tabBarLabel: "Payments",
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="dollar" color={color} size={size} />
                    ),
                }}
                name="Payments"
                component={Payments}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: "Vouchers",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cash-multiple" color={color} size={size} />
                    ),
                }}
                name="Vouchers"
                component={Vouchers}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: "Operators",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-tie" color={color} size={size} />
                    ),
                }}
                name="Operators"
                component={Operators}
            />


        </Tab.Navigator>
    );
};

export default BottomTab;
