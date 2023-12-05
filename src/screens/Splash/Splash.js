import { Image, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splash = ({ navigation }) => {

    useEffect(() => {
        const fetchData = async () => {
            const user = await AsyncStorage.getItem('USER');
            const subscription = await AsyncStorage.getItem('SUBSCRIPTION');
            if (user) {
                navigation.navigate('BottomTab');
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

