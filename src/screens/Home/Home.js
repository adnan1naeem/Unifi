import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Utils/Colors'
import CustomText from '../../Components/CustomText'
import { Width, height } from '../../Components/Dimensions'

const Home = () => {
    return (
        <View>
            <View style={styles.HeaderContainer}>
                <TouchableOpacity>
                    <CustomText title={"Log Out"} textStyle={{ paddingTop: 50, }} />
                </TouchableOpacity>
                <CustomText title={"HOME"} textStyle={styles.HeaderTitle} />
            </View>
            <View style={styles.containerView}>
                <CustomText title={"Welcome, admin, to"} textStyle={{ color: Colors.textcolor }} />
                <CustomText title={"FRG UniFi Network"} textStyle={styles.mainContainer} />
                <CustomText title={"7.3.83"} textStyle={{ color: Colors.heading }} />

            </View>

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    HeaderContainer: {
        backgroundColor: Colors.primary,
        height: 120,
        paddingHorizontal: 20
    },
    HeaderTitle: {
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 27,
        color: Colors.black
    },
    containerView: {
        width: Width,
        height: height / 1.4,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainContainer: {
        color: Colors.primary,
        paddingVertical: 10,
        fontSize: 25,
        fontWeight: 'bold'
    }
})