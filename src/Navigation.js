import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import CreateVoucher from "./screens/CreateVoucher/CreateVoucher";
import PrintBatch from "./screens/PrintBatch/PrintBatch";
import Login from "./screens/Login/Login";
import Splash from "./screens/Splash/Splash";
import Sites from "./screens/Sites.js/Sites";


const Navigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="BottomTab"
            >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Sites" component={Sites} />
                <Stack.Screen name="BottomTab" component={BottomTab} />
                <Stack.Screen name="CreateVoucher" component={CreateVoucher} />
                <Stack.Screen name="PrintBatch" component={PrintBatch} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
