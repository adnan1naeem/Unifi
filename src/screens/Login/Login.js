import { ScrollView, View, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../Utils/Colors'
import CustomText from '../../Components/CustomText'
import Header from '../../Components/Header'
import SwitchCase from '../../Components/SwitchCase'
import { styles } from './Styles'
import axios from 'axios'



const Login = ({ navigation }) => {
    const [isByteOn, setIsByteOn] = useState(false);
    const [adminUsername, setAdminUsername] = useState('');
    const [siteId, setSiteId] = useState('');

    const handleBytePress = (value) => {
        setIsByteOn(value);
    };

    const handleLogin = () => {
        const loginData = {
            username: "upWork0867845",
            password: "upWork0867845",
        };
        axios.post('https://frg-lab.myvnc.com:9443/api/auth/login', loginData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response?.data) {
                    Alert.alert('Login Successful');
                }
            })
            .catch(error => {
                console.log("Catch error :: ", error);
            });
    };




    return (
        <ScrollView style={{ backgroundColor: Colors.background }}>
            <Header navigation={navigation}
                // onPress={handleLogin}
                onPress={() => navigation.navigate('BottomTab')}
            />
            <View style={styles.innerHeading}>
                <CustomText title={"CONTROLLER"} textStyle={styles.controllerText} />
                <CustomText title={"Fill"} textStyle={[styles.controllerText, { color: Colors.primary }]} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    editable={false}
                    selectionColor={Colors.primary}
                    placeholder='frg.myvnc.com'
                    placeholderTextColor={Colors.textcolor}
                    style={styles.inptFirst} />

                <TextInput
                    selectionColor={Colors.primary}
                    placeholder='8443'
                    onChangeText={(i) => setSiteId(i)}
                    placeholderTextColor={Colors.textcolor}
                    style={styles.inptFirst}
                />
            </View>
            <View style={styles.adminContainer} >
                <View style={styles.inneradminContainer}>
                    <TextInput
                        placeholder='Admin'
                        onChangeText={(i) => setAdminUsername(i)}
                        placeholderTextColor={Colors.textcolor}
                        style={styles.inputThird} />
                </View>
            </View>
            <View style={styles.siteContainer}>
                <CustomText title={"SITE"} textStyle={styles.siteText} />
                <TextInput placeholder='g698a69h' style={styles.siteInput} />
            </View>
            <SwitchCase title={"Verify SSL Certificates"} onValueChange={handleBytePress} />
            <CustomText textStyle={styles.infoText}
                title={"Enabling will verify SSL certificates. Enable only if you have configured a valid certificate on your controller."} />
            <View style={{ marginTop: 20 }}>
                <SwitchCase title={"Remember Password"} onValueChange={handleBytePress} />
            </View>
            <View style={{ marginTop: 20 }}>
                <SwitchCase title={"Require Passcode"} onValueChange={handleBytePress} />
            </View>
            <CustomText textStyle={styles.infoText}
                title={"Controller will be joined automatically if password is remembered."} />
        </ScrollView>
    )
}

export default Login


