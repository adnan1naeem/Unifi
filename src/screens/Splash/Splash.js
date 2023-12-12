import { Image, View, Text, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Purchases from 'react-native-purchases'

const Splash = ({ navigation }) => {

    const APIKeys = {
        apple: "appl_AUcEDGAcJBfMRWMmHnJnhobpfyP",
        google: "goog_FLqtqQZScGyoPgTPJSCqGeAlhAg",
    };

    useEffect(() => {
        const fetchData = async () => {
            const user = await AsyncStorage.getItem('USER');
            const subscription = await AsyncStorage.getItem('SUBSCRIPTION');
            if (user) {
                if (Platform.OS == "android") {
                    await Purchases.configure({ apiKey: APIKeys.google });
                } else {
                    await Purchases.configure({ apiKey: APIKeys.apple });
                }
                const customerInfo = await Purchases.getCustomerInfo();
                if (Object?.entries(customerInfo?.entitlements?.active)?.length > 0) {
                    navigation.replace('BottomTab');
                } else {
                    navigation.replace('Sites');
                }
            } else {
                navigation.replace('Login');
            }
        };

        const timer = setTimeout(() => {
            fetchData();
        }, 2600);

        return () => clearTimeout(timer);
    }, []);



    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/frglogo.png")}
                style={styles.logo} />
        </View>
    )
}
export default Splash

