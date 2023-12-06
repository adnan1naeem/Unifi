import { ScrollView, View, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Utils/Colors'
import CustomText from '../../Components/CustomText'
import Header from '../../Components/Header'
import SwitchCase from '../../Components/SwitchCase'
import { styles } from './Styles'
import axios from 'axios'
import { prefix_url } from '../../Utils/Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [isByteOn, setIsByteOn] = useState(false);
    const [adminUsername, setAdminUsername] = useState('');
    const [siteId, setSiteId] = useState('');
    const [siteName, setsiteName] = useState('');
    const [loading, setLoading] = useState(false);
    const [cancelLogin, setCancelLogin] = useState(false);


    const handleBytePress = (value) => {
        setIsByteOn(value);
    };
    useEffect(() => {
        (async () => {
            let selectedSite = await AsyncStorage.getItem("SITE");
            setsiteName(selectedSite)
        })();
    }, []);


    const handleLogin = () => {
        setLoading(true);
        setCancelLogin(false);

        const loginData = {
            username: adminUsername || 'upWork0867845',
            password: siteId || 'upWork0867845',
        };

        axios.post(`${prefix_url}login`, loginData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
                if (!cancelLogin && response?.data?.deviceToken) {
                    // console.log('Token:: ', response?.data?.deviceToken);
                    await AsyncStorage.setItem('USER', response?.data?.deviceToken);
                    navigation.navigate('Sites');
                }
                setLoading(false);
            })
            .catch(error => {
                if (!cancelLogin) {
                    console.log('error :: ', error);
                    Alert.alert(JSON.stringify(error?.message));
                }
                setLoading(false);
            });
    };

    const handleCancelLogin = async () => {
        setCancelLogin(true);
        setLoading(false);
        await AsyncStorage.removeItem('USER');

    };
    // const SignOut = async () => {
    //     try {
    //         await AsyncStorage.removeItem('USER');
    //         navigation.reset({
    //             index: 0,
    //             routes: [{ name: 'Login' }],
    //         });
    //     } catch (error) {
    //         console.error('Error signing out:', error);
    //     }
    // };

    return (
        <ScrollView style={{ backgroundColor: Colors.background }}>
            <Header navigation={navigation} loading={loading} Cancel={handleCancelLogin} onPress={handleLogin} />
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
                <TextInput editable={false} placeholder={siteName} style={styles.siteInput} />
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


