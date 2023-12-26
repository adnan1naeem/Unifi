import { Image, View, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './Styles'

const Splash = ({ navigation }) => {

    useEffect(() => {
        const fetchData = async () => {
            navigation.replace('Sites');
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