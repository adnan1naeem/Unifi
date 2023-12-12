import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../Utils/Colors'
import CustomText from './CustomText'

const Header = ({ onPress, loading, Cancel }) => {
    return (
        <View style={styles.HeaderContainer}>
            <TouchableOpacity onPress={Cancel}>
                <CustomText title={loading ? "Canecl" : ''} textStyle={{ ...styles.login, paddingTop: 15 }} />
            </TouchableOpacity>
            <Image source={require('../../assets/frglogo.png')} resizeMode='containe' style={styles.logo} />
            <TouchableOpacity onPress={onPress} style={styles.login}>
                <CustomText title={loading ? <ActivityIndicator color={Colors.white} /> : "Login"} />
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
        paddingTop: Platform.OS === 'ios' ? 50 : 25,
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
    },
    logo: {
        height: 50,
        width: 200,
        // tintColor: Colors.white,
        marginLeft: 25,
        paddingBottom: 10
    },
    login: {
        alignItems: 'center',
        alignSelf: 'center'
    }
})