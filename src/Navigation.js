import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import EditingPhoto from "./screens/EditingPhoto/EditingPhoto";
import Login from './screens/Auth/Login'
import CreateVoucher from "./screens/CreateVoucher/CreateVoucher";
import Testing from './screens/Testing'
import PrintBatch from "./screens/PrintBatch/PrintBatch";


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
                <Stack.Screen name="Testing" component={Testing} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="BottomTab" component={BottomTab} />
                <Stack.Screen name="EditingPhoto" component={EditingPhoto} />
                <Stack.Screen name="CreateVoucher" component={CreateVoucher} />
                <Stack.Screen name="PrintBatch" component={PrintBatch} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
