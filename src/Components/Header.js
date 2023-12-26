import { StyleSheet, View, Image, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../Utils/Colors'
import CustomText from './CustomText'

const Header = ({ routes, onPress, loading }) => {
    return (
        <View style={styles.HeaderContainer}>
            <TouchableOpacity>
                <CustomText title={''} textStyle={{ ...styles.login, paddingTop: 15 }} />
            </TouchableOpacity>
            <Image source={require('../../assets/frglogo.png')} resizeMode='contain' style={styles.logo} />
            <TouchableOpacity onPress={onPress} style={styles.login}>
                <CustomText title={loading ? <ActivityIndicator color={Colors.white} /> :  routes ? "Update": "Add"} />
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
        width: 180,
        marginLeft: 25,
        marginBottom: 5
    },
    login: {
        alignItems: 'center',
        alignSelf: 'center'
    }
})