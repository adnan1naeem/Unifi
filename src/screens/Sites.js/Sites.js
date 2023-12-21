import { Text, View, Image, TouchableOpacity, FlatList, Switch, Platform, ActivityIndicator, Alert, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Utils/Colors'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import CustomText from '../../Components/CustomText'
import { prefix_url } from '../../Utils/Constants'
import axios from 'axios'
import Swipeout from "react-native-swipeout";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from './Styles'
import Purchases from 'react-native-purchases'

const Sites = ({ navigation }) => {
    const [monthly, setMonthly] = useState(false);
    const [yearly, setYearly] = useState(false);
    const [sites, setSites] = useState([])
    const [loading, setLoading] = useState(false);
    const [siteLoading, setSiteLoading] = useState(false);
    const [siteIndex, setSiteIndex] = useState(0);
    const [disable, setDisable] = useState(false);
    const [showSubscription, setShowSubscription] = useState(false);
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
                const customerInfo = await Purchases.getCustomerInfo();
                if (Object?.entries(customerInfo?.entitlements?.active)?.length > 0) {
                    setShowSubscription(false);
                } else {
                    setShowSubscription(true);
                }
                if (offerings?.current !== null && offerings?.current?.availablePackages?.length !== 0) {
                    setLoading(false);
                    setAvailablePakages(offerings?.current?.availablePackages);
                }
            }
            catch (error) {
                setDisable(true);
            }
        })();
    }, []);

    useEffect(() => {
        handleSites()
    }, []);

    const handleSites = async () => {
        setLoading(true);
        let siteList = await AsyncStorage.getItem("SITE_LIST");
        siteList = JSON.parse(siteList);
        setSites(siteList);
        // const userUrl = await AsyncStorage.getItem("SITE_URL");
        // let config = {
        //     method: 'post',
        //     url: `${prefix_url}?url=${userUrl}/proxy/network/api/self/sites&method=get`,
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // };

        // await axios.request(config)
        //     .then((response) => {
        //         if (response?.data) {
        //             setSites(response?.data?.data);
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        setLoading(false);
    };

    const handlesubmit = async (item, index) => {
        if (disable === true) {
            alert("Please Choose Your plan before selecting the sites, \nThanks")
            return
        }
        setSiteIndex(index);
        setSiteLoading(true);

        await AsyncStorage.setItem("SUBSCRIPTION", 'YES');
        await AsyncStorage.setItem('SITE', item?.siteName);

        let data = JSON.stringify({
            username: item?.username,
            password: item?.password
        });

        let config = {
            method: 'post',
            url: `${prefix_url}?url=${item?.url}/api/auth/login&method=post`,
            headers: {
                'Content-Type': 'application/json',
            },
            data
        };

        axios.request(config).then(async (item) => {
            if (item?.data?.deviceToken) {
                await AsyncStorage.setItem('USER', item?.data?.deviceToken);
                navigation.replace('BottomTab');
            }
            setSiteLoading(false);
        }).catch((error) => {
            console.log(JSON.stringify(error, null,2));
            if (error?.message === "Request failed with status code 403" || error?.message === "Request failed with status code 504") {
                alert('The provided credentials for this site are not valid!')
            }
            setSiteLoading(false);
        });
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
                    onPress: () => {
                        setYearly(false);
                        setMonthly(false);
                    },
                    style: 'cancel',
                },
                {
                    text: 'Okay',
                    onPress: async () => {
                        await Purchases?.purchasePackage(item).then((item) => {
                            setDisable(true);
                        }).catch(() => {
                            setYearly(false);
                            setMonthly(false);
                        });
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const revokeSelected = async (item) => {
        let siteList = await AsyncStorage.getItem("SITE_LIST");
        if (siteList) {
            siteList = JSON.parse(siteList);
            const indexToRemove = siteList.findIndex(site => site.siteId === item);
            siteList.splice(indexToRemove, 1);
            await AsyncStorage.setItem("SITE_LIST", JSON.stringify(siteList));
            setSites(siteList);
        }
    }

    const renderItem = ({ item, index }) => {
        let swipeoutBtns = [
            {
                text: 'Revoke',
                onPress: () => revokeSelected(item),
                backgroundColor: 'red',
            },
        ];
        return (
            <View style={{ marginHorizontal: 15 }}>
                <Swipeout style={styles.swipeRevoke} right={swipeoutBtns} autoClose={true} backgroundColor="transparent">
                    <TouchableOpacity onPress={() => handlesubmit(item, index)} style={styles.sitelist}>
                        {siteLoading && siteIndex === index ? <ActivityIndicator color={'black'} size={'small'} style={{ justifyContent: 'center', flex: 1 }} /> :
                            <>
                                <CustomText title={item?.siteName} textStyle={{ color: Colors.black }} />
                                <MaterialCommunityIcons name="arrow-right" style={styles.ForwordArrow} />
                            </>
                        }
                    </TouchableOpacity>
                </Swipeout>
            </View>)
    };

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
                            disabled={disable}
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
            <ActivityIndicator color={'black'} size={'small'} style={{ justifyContent: 'center', flex: 1 }} />
        );
    }

    return (
        <View>
            <View style={styles.ContainerSite}>
                <Image source={require('../../../assets/frglogo.png')} style={styles.HeaderIcon} />
                <TouchableOpacity style={styles.iconStyle} onPress={() => navigation.navigate("Login")}>
                    <SimpleLineIcons name="plus" style={styles.backButton} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <CustomText title={"List of Controllers"} textStyle={styles.sitesListtext} />
                <View style={{ marginTop: '15%', paddingBottom: "25%" }}>
                    <CustomText title={sites?.length === 1 ? "Controller" : "Controllers"} textStyle={styles.titleheading} />
                    <FlatList
                        data={sites}
                        renderItem={renderItem}
                        ListFooterComponent={showSubscription && renderFooter}
                        keyExtractor={(item) => item?._id}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Sites

