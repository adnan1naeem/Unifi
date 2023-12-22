import { ScrollView, View, TextInput, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Utils/Colors'
import CustomText from '../../Components/CustomText'
import Header from '../../Components/Header'
import SwitchCase from '../../Components/SwitchCase'
import { styles } from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation, route }) => {

    const [isByteOn, setIsByteOn] = useState(false);
    const [adminUsername, setAdminUsername] = useState('');
    const [password, setPassword] = useState('');
    const [portId, setPortId] = useState('8443');
    // const [url, setUrl] = useState('https://frg-lab.myvnc.com'); //Live
    const [url, setUrl] = useState('https://frg.myvnc.com'); //Local
    const [siteId, setSiteId] = useState('cfnvpcxe');
    const [siteName, setSiteName] = useState('default');
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(route?.params?.site){
            let editSite = route?.params?.site;
            setAdminUsername(editSite?.username ||editSite['Username']);
            setPortId(editSite?.portNumber || editSite['Port Number']);
            setUrl(editSite?.url || editSite['URL']);
            setSiteId(editSite?.siteId || editSite['Site ID']);
            setSiteName(editSite?.siteName || editSite['Site Name']);
        }
    },[route])


    const handleBytePress = (value) => {
        setIsByteOn(value);
    };


    const handleLogin = async () => {
        try {
            setLoading(true);
            if (!adminUsername || !password || !url || !portId || !siteId || !siteName) {
                alert('Please enter remaining fields');
                setLoading(false);
                return;
            }
            let siteList = await AsyncStorage.getItem("SITE_LIST");
            let siteRecord = {
                username: adminUsername,
                password: password,
                siteId: siteId,
                portNumber: portId,
                url: `${url}:${portId}`,
                siteName: siteName
            };

            if (siteList) {
                siteList = JSON.parse(siteList);
                const isDuplicate = siteList?.some(existingSite => (
                    existingSite.username === adminUsername &&
                    existingSite.password === password &&
                    existingSite.siteId === siteId &&
                    existingSite.portNumber === portId &&
                    existingSite.url === `${url}:${portId}` &&
                    existingSite.siteName === siteName
                ));

                if (isDuplicate) {
                    alert("A site with the same credentials already exists.");
                } else {
                    siteList.push(siteRecord);
                    await AsyncStorage.setItem("SITE_LIST", JSON.stringify(siteList));
                    navigation.replace('Sites');
                }
            } else {
                await AsyncStorage.setItem("SITE_LIST", JSON.stringify([siteRecord]));
                navigation.replace('Sites');

            }
            setLoading(false);

        } catch (error) {
            console.log('error :: ', error);
            Alert.alert(JSON.stringify(error?.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flexGrow: 1 }}>

            <ScrollView style={{ backgroundColor: Colors.background }}>
                <Header loading={loading} onPress={handleLogin} />
                <View style={styles.innerHeading}>
                    <CustomText title={"CONTROLLER"} textStyle={styles.controllerText} />
                    <CustomText title={"Port"} textStyle={[styles.controllerText, { color: Colors.grey }]} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={url}
                        selectionColor={Colors.primary}
                        placeholder='IP Address / URL'
                        onChangeText={(text) => setUrl(text)}
                        placeholderTextColor={Colors.grey}
                        style={[styles.inptFirst, { width: "70%" }]} />
                    <TextInput
                        selectionColor={Colors.primary}
                        value={portId}
                        placeholder='Port'
                        onChangeText={(text) => setPortId(text)}
                        placeholderTextColor={Colors.grey}
                        style={[styles.inptFirst, { width: "30%" }]}
                    />
                </View>
                <View style={styles.adminContainer} >
                    <View style={styles.inneradminContainer}>
                        <TextInput
                            placeholder='Username'
                            value={adminUsername}
                            onChangeText={(text) => setAdminUsername(text)}
                            placeholderTextColor={Colors.grey}
                            style={styles.inputThird} />
                        <TextInput
                            placeholder='Password'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholderTextColor={Colors.grey}
                            style={styles.inputThird} />

                    </View>
                </View>
                <View style={styles.siteContainer}>
                    <CustomText title={"SITE"} textStyle={styles.siteText} />
                    <TextInput onChangeText={(text) => setSiteId(text)} placeholderTextColor={Colors.grey} value={siteId} placeholder={"Enter site id"} style={styles.siteInput} />
                </View>
                <SwitchCase title={"Verify SSL Certificates"} onValueChange={handleBytePress} />
                <CustomText textStyle={styles.infoText}
                    title={"Enabling will verify SSL certificates. Enable only if you have configured a valid certificate on your controller."} />
                <View style={styles.siteContainer}>
                    <CustomText title={"SITE Title (visible in list)"} textStyle={styles.siteText} />
                    <TextInput onChangeText={(text) => setSiteName(text)} placeholderTextColor={Colors.grey} value={siteName} placeholder={"Enter site name"} style={styles.siteInput} />
                </View>


            </ScrollView>

        </KeyboardAvoidingView>
    )
}

export default Login


