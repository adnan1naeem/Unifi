import { Text, View, Image, TouchableOpacity, FlatList, Switch, Platform, ActivityIndicator, Alert, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Utils/Colors'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import CustomText from '../../Components/CustomText'
import { prefix_url } from '../../Utils/Constants'
import axios from 'axios'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from './Styles'
import Purchases from 'react-native-purchases'

const Sites = ({ navigation }) => {
    const [monthly, setMonthly] = useState(false);
    const [yearly, setYearly] = useState(false);
    const [sites, setSites] = useState()
    const [loading, setLoading] = useState(false);
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
                setSites(response?.data?.data);
            }
        }).catch(error => {
            console.log("Catch error :: ", error);
        })
    };

    const handlesubmit = async (item) => {
        if (disable === false) {
            alert("Please Choose Your plan before selecting the sites, \nThanks")
            return
        }
        await AsyncStorage.setItem("SUBSCRIPTION", 'YES');
        await AsyncStorage.setItem('SITE', item?.name);
        navigation.replace("BottomTab")
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


    const renderItem = ({ item }) => (
        <View style={{ marginHorizontal: 15 }}>
            <TouchableOpacity onPress={() => handlesubmit(item)} style={styles.sitelist}>
                <CustomText title={item?.name} textStyle={{ color: Colors.black }} />
                <MaterialCommunityIcons name="arrow-right" style={styles.ForwordArrow} />
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

    // const renderFooter = () => (
    //     <View style={styles.modalContainer}>
    //         <View style={styles.modalContent}>

    //             <Text style={styles.modalTitle}>Select Your Subscription Plan</Text>

    //             <View style={styles.toggleContainer}>
    //                 <View style={styles.text_container}>
    //                     <Text style={styles.Text_heading}>Monthly</Text>
    //                     <Text style={styles.Text_description}>
    //                         {"Where you can Avail the limited restricted thing\n"}
    //                     </Text>
    //                 </View>
    //                 <Switch
    //                     trackColor={{ false: Colors.light_Black, true: Colors.primary }}
    //                     thumbColor={monthly ? Colors.white : Colors.white}
    //                     value={monthly}
    //                     ios_backgroundColor={"white"}
    //                     onValueChange={() => setMonthly(!monthly)}
    //                 />
    //             </View>
    //             <View style={styles.toggleContainer}>
    //                 <View style={styles.text_container}>
    //                     <Text style={styles.Text_heading}>Yearly</Text>
    //                     <Text style={styles.Text_description}>
    //                         {"Where you can Avail the limited restricted thing\n"}
    //                     </Text>
    //                 </View>
    //                 <Switch
    //                     trackColor={{ false: Colors.light_Black, true: Colors.primary }}
    //                     thumbColor={yearly ? Colors.white : Colors.white}
    //                     value={yearly}
    //                     onValueChange={() => setYearly(!yearly)}
    //                 />
    //             </View>
    //         </View>
    //     </View>
    // );

    if (loading) {
        return (
            <ActivityIndicator color={'red'} size={'small'} style={{ justifyContent: 'center', flex: 1 }} />
        );
    }

    return (
        <View>
            <View style={styles.ContainerSite}>
                <TouchableOpacity style={{ padding: 10, }} onPress={() => navigation.goBack() || navigation.replace("Login")}>
                    <SimpleLineIcons name="arrow-left" style={styles.backButton} />
                </TouchableOpacity>
                <Image source={require('../../../assets/frglogo.png')} style={styles.HeaderIcon} />
                <CustomText />
            </View>

            <CustomText title={"Sites List"} textStyle={styles.sitesListtext} />
            <View style={{ marginTop: '15%' }}>
                <CustomText title={"Sites Name"} textStyle={styles.titleheading} />

                <FlatList
                    data={sites}
                    renderItem={renderItem}
                    ListFooterComponent={showSubscription && renderFooter}
                    keyExtractor={(item) => item?._id}
                />
            </View>

        </View>
    )
}

export default Sites

