import { ScrollView, View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../Utils/Colors'
import CustomText from '../../Components/CustomText'
import Header from '../../Components/Header'
import SwitchCase from '../../Components/SwitchCase'

const Login = ({ navigation }) => {

    return (
        <ScrollView style={{ backgroundColor: Colors.background }}>
            <Header navigation={navigation} onPress={() => navigation.navigate("BottomTab")} />
            <View style={styles.innerHeading}>
                <CustomText title={"CONTROLLER"} textStyle={styles.controllerText} />
                <CustomText title={"Fill"} textStyle={[styles.controllerText, { color: Colors.primary }]} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    selectionColor={Colors.primary}
                    placeholder='frg.myvnc.com'
                    placeholderTextColor={Colors.textcolor}
                    style={styles.inptFirst} />

                <TextInput
                    selectionColor={Colors.primary}
                    placeholder='8443'
                    placeholderTextColor={Colors.textcolor}
                    style={styles.inptFirst}
                />
            </View>
            <View style={styles.adminContainer} >
                <View style={styles.inneradminContainer}>
                    <TextInput
                        placeholder='Admin'
                        placeholderTextColor={Colors.textcolor}
                        style={styles.inputThird} />
                </View>
            </View>
            <View style={styles.siteContainer}>
                <CustomText title={"SITE"} textStyle={styles.siteText} />
                <TextInput placeholder='g698a69h' style={styles.siteInput} />
            </View>
            <SwitchCase title={"Verify SSL Certificates"} />
            <CustomText textStyle={styles.infoText}
                title={"Enabling will verify SSL certificates. Enable only if you have configured a valid certificate on your controller."} />
            <View style={{ marginTop: 20 }}>
                <SwitchCase title={"Remember Password"} />
            </View>
            <View style={{ marginTop: 20 }}>
                <SwitchCase title={"Require Passcode"} />
            </View>
            <CustomText textStyle={styles.infoText}
                title={"Controller will be joined automatically if password is remembered."} />


        </ScrollView>
    )
}

export default Login
const styles = StyleSheet.create({
    innerHeading: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 10
    },
    controllerText: {
        fontSize: 17,
        color: Colors.heading
    },
    inputContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingLeft: 15,
    },
    inptFirst: {
        width: 200,
        paddingVertical: 15,
        borderRightWidth: 0.2,
        borderBottomWidth: 0.2,
        paddingHorizontal: 10,
        color: Colors.textcolor,
        fontWeight: 'bold',
        fontSize: 18,
        borderColor: Colors.heading
    },
    adminContainer: {
        backgroundColor: Colors.white,
        paddingLeft: 15
    },
    inputThird: {
        paddingVertical: 15,
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 8,
        borderColor: Colors.heading
    },
    siteContainer: {
        paddingVertical: 10
    },
    inneradminContainer: {
        borderBottomWidth: 0.2,
        borderColor: Colors.heading
    },
    siteText: {
        fontSize: 17,
        color: Colors.heading,
        paddingHorizontal: 20
    },
    siteInput: {
        backgroundColor: Colors.white,
        fontSize: 17,
        color: Colors.heading,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 10,
        borderWidth: 0.2,
        borderColor: Colors.heading
    },
    infoText: { color: Colors.heading, paddingHorizontal: 20, alignSelf: 'center', fontSize: 12, paddingVertical: 15 }
});

