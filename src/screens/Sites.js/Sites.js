import { Text, View, Image, TouchableOpacity, FlatList, Switch, Platform, ActivityIndicator, Alert, ScrollView, Button, Modal, Linking } from 'react-native'
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
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import DocumentPicker from 'react-native-document-picker';
import Papa from 'papaparse';
import { ios } from '../../../app.config'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Search from '../../Components/Search'

const Sites = ({ navigation }) => {
    const [monthly, setMonthly] = useState(false);
    const [yearly, setYearly] = useState(false);
    const [sites, setSites] = useState([])
    const [loading, setLoading] = useState(false);
    const [siteLoading, setSiteLoading] = useState(false);
    const [siteIndex, setSiteIndex] = useState(0);
    const [disable, setDisable] = useState(false);
    const [subscribe, isSubscribe] = useState(false);
    const [showSubscription, setShowSubscription] = useState(false);
    const [availablePakages, setAvailablePakages] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [searchSitesList, setsearchSitesList] = useState([])
    const [searchText, setSearchText] = useState("")

    const APIKeys = {
        apple: "appl_AUcEDGAcJBfMRWMmHnJnhobpfyP",
        google: "goog_FLqtqQZScGyoPgTPJSCqGeAlhAg",
    };

    useEffect(() => {
        (async () => {
            await Purchases.configure({
                apiKey: Platform.OS === "ios" ? APIKeys.apple : APIKeys.google,
            });
            await Purchases.getOfferings()
                .then(async (offerings) => {
                    await Purchases.getCustomerInfo().then((purchaserInfo) => {
                        if (purchaserInfo?.allPurchasedProductIdentifiers?.includes("unifi_monthly_subscription_id") || purchaserInfo?.allPurchasedProductIdentifiers?.includes("unifi_yearly_subscription_id") || purchaserInfo?.allPurchasedProductIdentifiers?.includes("monthly_subscription_id") || purchaserInfo?.allPurchasedProductIdentifiers?.includes("yearly_subscription_id")) {
                            if (purchaserInfo?.entitlements?.active) {
                                setDisable(false);
                                isSubscribe(true);
                                setShowSubscription(false);
                            } else {
                                isSubscribe(false);
                                setLoading(false);
                                setAvailablePakages(offerings?.current?.availablePackages);
                                setShowSubscription(true);
                            }
                        } else {
                            setLoading(false);
                            isSubscribe(false);
                            setAvailablePakages(offerings?.current?.availablePackages);
                            setShowSubscription(true);
                        }
                    });
                })
                .catch((error) => {
                    setDisable(true);
                    console.error('Error fetching entitlements:', error);
                });
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
        setsearchSitesList(siteList)

        setLoading(false);
    };

    const pickCSVFile = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            const fileContent = await RNFS.readFile(result[0]?.uri);

            if (result[0]?.type === 'text/csv') {
                Papa.parse(fileContent, {
                    header: true, // Set to true if your CSV file has a header row
                    skipEmptyLines: true,
                    complete: async (result) => {
                        let array = [];
                        result?.data?.map((existingSite) => {
                            const isDuplicate = sites?.some(item => (
                                (existingSite.username || item["Username"]) === item?.username &&
                                (existingSite.password || item["Password"]) === item?.password &&
                                (existingSite.siteId || item["Site ID"]) === item?.siteId &&
                                (existingSite.portNumber || item["Port Number"]) === item?.portId &&
                                (existingSite.url || item["URL"]) === item?.url &&
                                (existingSite.siteName || item["Site Name"]) === item?.siteName
                            ));
                            if (!isDuplicate) {
                                array.push(existingSite);
                            }
                        })
                        setSites(array);
                        await AsyncStorage.setItem("SITE_LIST", JSON.stringify(result?.data));
                    },
                    error: (error) => {
                        console.error('CSV Parsing Error:', error);
                        Alert.alert('Error', 'An error occurred while parsing the CSV file.');
                    },
                });

            }
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                // User cancelled the picker
            } else {
                console.error('Error picking CSV file:', error);
                Alert.alert('Error', 'An error occurred while picking the CSV file.');
            }
        }
    };

    const createCSVFile = async (sitesList) => {
        const headers = ['Username', 'Password', 'Site ID', 'Port Number', 'URL', 'Site Name'];
        const csvData = [headers.join(',')];

        sitesList?.forEach((item) => {
            const row = Object.values(item).map((value) => `"${value}"`);
            csvData.push(row.join(','));
        });

        const csvContent = csvData.join('\n');
        const filePath = `${RNFS.DocumentDirectoryPath}/data.csv`;

        try {
            await RNFS.writeFile(filePath, csvContent, 'utf8');
        } catch (error) {
            console.error('Error creating CSV file:', error);
        }
    };


    useEffect(() => {
        if (sites?.length > 0) {
            createCSVFile(sites);
        }
    }, [sites])

    const shareCSVFile = async () => {
        const filePath = `${RNFS.DocumentDirectoryPath}/data.csv`;

        try {
            await Share.open({
                title: 'Share CSV File',
                message: 'CSV File from your app',
                url: `file://${filePath}`,
                type: 'text/csv',
                failOnCancel: false,
            });
        } catch (error) {
            console.error('Error sharing CSV file:', error);
            Alert.alert('Error', 'An error occurred while sharing the CSV file.');
        }
    };


    const handlesubmit = async (item, index) => {
        if (disable === true) {
            alert("Please Choose Your plan before selecting the sites, \nThanks")
            return
        }
        setSiteIndex(index);
        setSiteLoading(true);

        await AsyncStorage.setItem("SUBSCRIPTION", 'YES');
        await AsyncStorage.setItem('SITE', item?.siteName || item["Site Name"]);
        await AsyncStorage.setItem('PORT', item?.portNumber || item["Port Number"]);
        await AsyncStorage.setItem('SITE_ID', item?.siteId || item["Site ID"]);
        await AsyncStorage.setItem('SITE_URL', item?.url || item["URL"]);

        let data = JSON.stringify({
            username: item?.username || item["Username"],
            password: item?.password || item["Password"],
            for_hotspot: true,
            strict: true,
            remember: false,
            site_name: item?.siteId || item["Site ID"]
        });
        let port = item?.portNumber === '8443' || item["Port Number"] === '8443'
        let urlEndPoint;
        if (port) {
            urlEndPoint = 'api/login'
        } else {
            urlEndPoint = 'api/auth/login'
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${prefix_url}?url=${item?.url || item["URL"]}/${urlEndPoint}&method=post`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios.request(config).then(async (item) => {
            if (!port) {
                await AsyncStorage.setItem('CSRF-TOKEN', item?.headers['x-csrf-token']);
            }
            const cookieString = item?.headers["set-cookie"][0];
            const cookieValue = cookieString.split('=')[1].split(';')[0];
            if (cookieValue) {
                await AsyncStorage.setItem('USER', cookieValue);
                navigation.replace('BottomTab');
            }
            setSiteLoading(false);
        }).catch((error) => {
            if (error?.message === "Request failed with status code 403" || error?.message === "Request failed with status code 500" || error?.message === "Request failed with status code 504") {
                alert('The provided credentials for this site are not valid!')
            }
            if (error?.message === "Request failed with status code 404") {
                alert('The provided url and port for this site are not valid!')
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
                            console.log(JSON.stringify(item.null, 2));
                            setShowSubscription(false);
                            setDisable(true);
                            isSubscribe(true);
                        }).catch((error) => {
                            console.log(JSON.stringify(error.null, 2));
                            setYearly(false);
                            setMonthly(false);
                        });
                    },
                },
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        if (searchText === "") {
            setsearchSitesList(sites);
        }
    }, [searchText])

    const handleSearch = () => {
        const filtered = sites?.filter(item => {
            let siteName = item?.siteName?.toLowerCase() || item['Site Name']?.toLowerCase();
            return siteName?.toLowerCase().includes(searchText.toLowerCase())
        }
        );
        setsearchSitesList(filtered);
    };




    const revokeSelected = async (item) => {
        let siteList = await AsyncStorage.getItem("SITE_LIST");
        if (siteList) {
            siteList = JSON.parse(siteList);
            const indexToRemove = siteList.findIndex(site => site.siteId === item);
            siteList.splice(indexToRemove, 1);
            await AsyncStorage.setItem("SITE_LIST", JSON.stringify(siteList));
            setSites(siteList);
            setsearchSitesList(siteList)
        }
    }

    const editSite = async (item, index) => {
        if(searchSitesList?.length >= 1 && !subscribe){
            alert("You need to subscribe for adding another site!")
        }else{
            navigation.navigate("Login", { site: item, index: index });
        }
    }


    const handleHelpPress = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const renderItem = ({ item, index }) => {
        let swipeoutBtns = [
            {
                text: 'Revoke',
                onPress: () => revokeSelected(item),
                backgroundColor: 'red',
            },
            {
                text: 'Edit',
                onPress: () => editSite(item, index),
                backgroundColor: Colors.primary,
            },
        ];
        return (
            <View style={{ marginHorizontal: 15 }}>
                <Swipeout style={styles.swipeRevoke} right={swipeoutBtns} autoClose={true} backgroundColor="transparent">
                    <TouchableOpacity onPress={() => handlesubmit(item, index)} style={styles.sitelist}>
                        {siteLoading && siteIndex === index ? <ActivityIndicator color={'black'} size={'small'} style={{ justifyContent: 'center', flex: 1 }} /> :
                            <>
                                <CustomText title={item?.siteName || item["Site Name"]} textStyle={{ color: Colors.black }} />
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

    const handleAddButton = () => {
        if(searchSitesList?.length >= 1 && !subscribe){
            alert("You need to subscribe for adding another site!")
        }else{
            navigation.navigate("Login")
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.ContainerSite}>
                <TouchableOpacity onPress={handleHelpPress}>
                    <CustomText textStyle={{ fontSize: 18, fontWeight: 'bold' }} title={"Help"} />
                </TouchableOpacity>
                <View>
                    <Image source={require('../../../assets/frglogo.png')} style={styles.HeaderIcon} />
                </View>
                <TouchableOpacity style={styles.iconStyle} onPress={handleAddButton}>
                    <SimpleLineIcons name="plus" style={styles.backButton} />
                </TouchableOpacity>
            </View>

            <ScrollView >
                <CustomText title={"List of Controllers"} textStyle={styles.sitesListtext} />
                <Search value={searchText} onChange={setSearchText} onPress={handleSearch} />

                <View style={{ paddingBottom: "25%" }}>
                    <CustomText title={sites?.length === 1 ? "Controller" : "Controllers"} textStyle={styles.titleheading} />
                    <FlatList
                        data={searchSitesList}
                        renderItem={renderItem}
                        ListFooterComponent={showSubscription && renderFooter}
                        keyExtractor={(item) => item?._id}
                    />
                </View>
                <Modal
                    visible={showModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalOuterContainer}>

                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={{}} onPress={closeModal}>
                                <Text style={{ textAlign: 'right', fontSize: 20 }}>✘</Text>
                            </TouchableOpacity>
                            <CustomText textStyle={styles.modalHeading} title={"ABOUT US"} />
                            <CustomText textStyle={styles.ModalText} title={`Application Version Number:${Platform.OS === ios ? '1.0.3' : " 1.0.7"}`} />
                            <CustomText textStyle={styles.ModalText} title={"Unifi Hotspot Manager provide you access to Ubiquiti Unifi Network Hotspot Management, where you can add / remove / manage and print vouchers of multiple sites and multiple controller. Our application allow you to see overview of each site hotspot voucher sale. It will save lots of your time to manage your Unifi hotspot on the move whether you are administering a single network or remotely managing multiple sites"} />
                            <CustomText textStyle={styles.ModalText} title={"If you need any assistance regarding Unifi system & solutions kindly contact"} />
                            <TouchableOpacity onPress={() => Linking.openURL('mailto:info@frg-technology.com')}
                                style={{ alignSelf: 'center', paddingBottom: 10 }}>
                                <CustomText textStyle={{ color: Colors.primary }} title={"info@frg-technology.com"} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
            </ScrollView>
            <View style={styles.container}>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={shareCSVFile} style={[styles.button, styles.buttonLeft]}>
                        <AntDesign name="cloudupload" style={{ fontSize: 30, color: Colors.white }} />
                        <Text style={styles.buttonText}>Backup</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickCSVFile} style={[styles.button, styles.buttonRight]}>
                        <AntDesign name="clouddownload" style={{ fontSize: 30, color: Colors.white }} />

                        <Text style={styles.buttonText}>Restore</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Sites

