import { Image, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './Styles'

const Splash = ({ navigation }) => {

    useEffect(() => {
        const timer = setTimeout(async () => {
            navigation.replace('Login');
        }, 2600);
        return () => clearTimeout(timer);
    }, [])

    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/frglogo.png")}
                style={styles.logo} />
        </View>
    )
}
export default Splash

