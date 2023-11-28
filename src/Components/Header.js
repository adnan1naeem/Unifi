import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../Utils/Colors'
import CustomText from './CustomText'

const Header = ({ onPress }) => {
    return (

        <View style={styles.HeaderContainer}>
            <Text />
            <Image source={require('../../assets/unifi.png')} resizeMode='stretch' style={styles.logo} />
            <TouchableOpacity onPress={onPress} style={styles.login}>
                <CustomText title="Login" />
            </TouchableOpacity>
        </View>

    )
}

export default Header

const styles = StyleSheet.create({
    HeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingTop: 50,
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
    },
    logo: { height: 50, width: 50, tintColor: Colors.white },
    login: { alignItems: 'center', alignSelf: 'center' }
})