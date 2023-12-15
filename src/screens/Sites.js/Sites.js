import { Text, View, Image, TouchableOpacity, FlatList, Switch, Platform, ActivityIndicator, Alert, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Utils/Colors'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import CustomText from '../../Components/CustomText'
import { prefix_url } from '../../Utils/Constants'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from './Styles'
import Purchases from 'react-native-purchases'

const Sites = ({ navigation }) => {
    const [monthly, setMonthly] = useState(false);
    const [yearly, setYearly] = useState(false);
    const [sites, setSites] = useState()
    const [loading, setLoading] = useState(false);
    const [availablePakages, setAvailablePakages] = useState([])

    const APIKeys = {
        apple: "appl_AUcEDGAcJBfMRWMmHnJnhobpfyP",
        google: "goog_FLqtqQZScGyoPgTPJSCqGeAlhAg",
    };

    useEffect(() => {
        (async () => {
            try {
                if (Platform.OS == "android") {
                    Purchases.configure({ apiKey: APIKeys.google });
                } else {
                    Purchases.configure({ apiKey: APIKeys.apple });
                }
                const offerings = await Purchases.getOfferings();
                if (offerings?.current !== null && offerings?.current?.availablePackages?.length !== 0) {
                    setLoading(false);
                    setAvailablePakages(offerings?.current?.availablePackages);
                }
            }
            catch (error) {
                // alert("error \n" + JSON.stringify(error));
            }
        })();
    }, []);

    useEffect(() => {
        handleSites()
    }, [])

    const handleSites = () => {
        axios.get(`${prefix_url}sites`, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async (response) => {
            if (response?.data) {
                setSites(response?.data?.data)
            }
        }).catch(error => {
            console.log("Catch error :: ", error);
        })
    };

    const handlesubmit = async (item) => {
        await AsyncStorage.setItem("SUBSCRIPTION", 'YES');
        await AsyncStorage.setItem('SITE', item?.name);
        navigation.navigate("BottomTab")
    };


    const handleSwitchChange = (index, item) => {
        if (index === 0) {
            if (!monthly) {
                showAlert("Monthly", item);
            }
            setMonthly(!monthly);
            setYearly(false);
        } else {
            if (!yearly) {
                showAlert("Yearly", item);
            }
            setMonthly(false);
            setYearly(!yearly);
        }
    };

    const showAlert = (value, item) => {
        Alert.alert(
            'Confirmation',
            `Are you sure you want to proceed in ${value} subscription with ${item?.product?.priceString}?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Okay',
                    onPress: async () => {

                        // try {
                        const data = await Purchases?.purchasePackage(item);

                        //     if (typeof customerInfo.entitlements.active.my_entitlement_identifier !== "undefined") {
                        //         // Unlock that great "pro" content
                        //     }
                        // } catch (e) {
                        //     if (!e.userCancelled) {
                        //         showError(e);
                        //     }
                        // }
                        alert(JSON.stringify(data?.customerInfo));

                        // alert(JSON.stringify(item?.product?.subscriptionOptions[0]?.productId));

                        alert('Will subscribe in future...')
                    },
                },
            ],
            { cancelable: false }
        );
    };


    const renderItem = ({ item }) => (
        <View style={{ marginHorizontal: 15 }}>
            <CustomText title={"Sites Name"} textStyle={styles.titleheading} />
            <TouchableOpacity onPress={() => handlesubmit(item)} style={styles.sitelist}>
                <Text>{item?.name}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Your Subscription Plan</Text>
            {availablePakages?.map((item, index) => (
                <View key={index} style={{ marginHorizontal: 15 }}>
                    <View style={styles.toggleContainer}>
                        <View style={styles.text_container}>
                            {index === 0 ? (
                                <Text style={styles.Text_heading}>Monthly</Text>
                            ) : (
                                <Text style={styles.Text_heading}>Yearly</Text>
                            )}
                            <Text style={styles.Text_description}>
                                {item?.product?.description}
                            </Text>
                        </View>
                        <Switch
                            trackColor={{
                                false: Colors.light_Black,
                                true: Colors.primary,
                            }}
                            thumbColor={index === 0 ? (monthly ? Colors.white : Colors.white) : (yearly ? Colors.white : Colors.white)}
                            value={index === 0 ? monthly : yearly}
                            ios_backgroundColor={'white'}
                            onValueChange={() => handleSwitchChange(index, item)}
                        />
                    </View>
                </View>
            ))}
        </View>

    );
    if (loading) {
        return (
            <ActivityIndicator color={'red'} size={'small'} style={{ justifyContent: 'center', flex: 1 }} />
        );
    }

    return (
        <View>
            <View style={styles.ContainerSite}>
                <TouchableOpacity style={{ padding: 10, }} onPress={() => navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" style={styles.backButton} />
                </TouchableOpacity>
                <Image source={require('../../../assets/frglogo.png')} style={styles.HeaderIcon} />
                <CustomText />
            </View>

            <CustomText title={"Sites List"} textStyle={styles.sitesListtext} />
            <View style={{ marginTop: '15%' }}>
                <FlatList
                    data={sites}
                    contentContainerStyle={{

                    }}
                    renderItem={renderItem}
                    ListFooterComponent={renderFooter}
                    keyExtractor={(item) => item?._id}
                />
            </View>

        </View>
    )
}

export default Sites

