import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import EditingPhoto from "./screens/EditingPhoto/EditingPhoto";
import Login from './screens/Auth/Login'


const Navigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="BottomTab" component={BottomTab} />
                <Stack.Screen name="EditingPhoto" component={EditingPhoto} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
