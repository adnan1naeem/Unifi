import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import Photo from "./screens/Photo/Photo";
import { Colors } from "./Utils/Colors";
import Videos from "./screens/Videos/Videos";
import Settings from "./screens/Settings/Settings";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: Colors.black,
                },
            }}
        >
            <Tab.Screen
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-sharp" color={color} size={size} />
                    ),
                }}
                name="Home"
                component={Photo}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: "Guests",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-friends" color={color} size={size} />
                    ),
                }}
                name="Videos"
                component={Videos}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: "Setting",
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="settings" color={color} size={size} />
                    ),
                }}
                name="Settings"
                component={Settings}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;
