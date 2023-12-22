import { FlatList, Text, View, TouchableOpacity, ScrollView, Modal, ActivityIndicator, } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Swipeout from 'react-native-swipeout';
import { Colors } from '../../Utils/Colors';
import CustomText from '../../Components/CustomText'
import AntDesign_icon from '../../Components/Icons/AntDesign_icon';
import { styles } from './Styles';
import { prefix_url } from '../../Utils/Constants';
import axios from 'axios'
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import Octicons_Icons from '../../Components/Icons/Octicons_Icons';
import Search from '../../Components/Search';
import EmptyState from '../../Components/EmptyState';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Guests = () => {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [showActivityIndicator, setShowActivityIndicator] = useState(true);
    const [show_ok, setshow_ok] = useState(false);
    const [loading, setLoading] = useState(true);
    const [expired, setexpired] = useState(false);
    const [guestList, setguestList] = useState([])
    const [searchGuestList, setSearchGuestList] = useState([])
    const [searchText, setSearchText] = useState("")
    const [disconnectedItems, setDisconnectedItems] = useState([]);

    const handleOpen = async(item) => {
        console.log(item);
        // setModalVisible(true);
        // setShowActivityIndicator(true);
        // setTimeout(() => {
            const userUrl = await AsyncStorage.getItem("SITE_URL");
            let siteId = await AsyncStorage.getItem('SITE_ID');
        
            let data = JSON.stringify({
                "_id": item?._id,
                "cmd": "extend"
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${prefix_url}?url=${userUrl}/api/s/${siteId}/cmd/hotspot&method=post`,
                headers: { 
                    'authority': 'frg-lab.myvnc.com:9443', 
                    'accept': 'application/json, text/plain, */*', 
                    'accept-language': 'en-US,en;q=0.9', 
                    'content-type': 'application/json', 
                    'cookie': 'TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkM2M2MDFmYS1mMmY0LTQwYjYtOWJiZC1lM2M3OTY0MjhjNDkiLCJjc3JmVG9rZW4iOiI1M2JlMTBhMy01ZjVjLTQxNWYtYmYyYi0xMDhkZDUzNjAxMDMiLCJqdGkiOiIwOTZiMDU4Ny0zMTFjLTRmMTYtYmZmYy1mMDBhYTkzNTU4ZWQiLCJwYXNzd29yZFJldmlzaW9uIjoxNzAxMzM5ODU3LCJpYXQiOjE3MDMxNTkxNTIsImV4cCI6MTcwMzE2Mjc1Mn0.GAvkN7IAfh6lLb0yM8dTiARDDpr8qQYiTV-grB-vzCo; TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkM2M2MDFmYS1mMmY0LTQwYjYtOWJiZC1lM2M3OTY0MjhjNDkiLCJjc3JmVG9rZW4iOiI1M2JlMTBhMy01ZjVjLTQxNWYtYmYyYi0xMDhkZDUzNjAxMDMiLCJqdGkiOiIwOTZiMDU4Ny0zMTFjLTRmMTYtYmZmYy1mMDBhYTkzNTU4ZWQiLCJwYXNzd29yZFJldmlzaW9uIjoxNzAxMzM5ODU3LCJpYXQiOjE3MDMxNTk1NDgsImV4cCI6MTcwMzE2MzE0OH0.HBUXfo-cGyhGz0ZqmxhIHnbDpDGKiCjV1_8D-kN5s5Y', 
                    'origin': 'https://frg-lab.myvnc.com:9443', 
                    'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"', 
                    'sec-ch-ua-mobile': '?0', 
                    'sec-ch-ua-platform': '"macOS"', 
                    'sec-fetch-dest': 'empty', 
                    'sec-fetch-mode': 'cors', 
                    'sec-fetch-site': 'same-origin', 
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 
                    'x-csrf-token': '53be10a3-5f5c-415f-bf2b-108dd5360103'
                  },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    alert('testing');
                    // setShowActivityIndicator(false);
                    // setshow_ok(true);
                    // setTimeout(() => {
                    //     setModalVisible(false);
                    //     setshow_ok(false);
                    //     setexpired(true)
                    // }, 1000);
                })
                .catch((error) => {
                    // setShowActivityIndicator(false);
                    // setshow_ok(true);
                    // setTimeout(() => {
                    //     setModalVisible(false);
                    //     setshow_ok(false);
                    //     setexpired(true)
                    // }, 100);
                    console.log(JSON.stringify(error, null,2));
                });
        // }, 3000);
    };

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setIsHeaderVisible(offsetY <= 0);
    };

    useFocusEffect(
        useCallback(() => {
            handleGuest();
        }, [])
    );

    const handleGuest = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${prefix_url}/activeVouchers?start=1700596800000&end=1703188800000`,
            headers: {
                'Cookie': 'unifises=coAVJ9lv7BRJsbiyVWrzBauAL3BKXevh'
            }
        };

        axios.request(config)
            .then((response) => {
                setguestList(response?.data?.data);
                setSearchGuestList(response?.data?.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    const formatItemCode = (item) => {
        if (item && item.length > 5) {
            let formattedCode = '';
            for (let i = 0; i < item.length; i++) {
                if (i > 0 && i % 5 === 0) {
                    formattedCode += '-';
                }
                formattedCode += item[i];
            }
            return formattedCode;
        }
        return item;
    };

    const byteConverter = (bytes) => {
        const kilobytes = bytes;
        const megabytes = kilobytes / (1024 * 1024);
        return megabytes;
    }

    const renderVoucherItem = ({ item }) => {
        const swipeoutBtns = [
            // {
            //     text: 'Extend',
            //     onPress: () => handleOpen(item),
            //     backgroundColor: Colors.primary,
            // },
            // {
            //     text: 'Disconnect',
            //     onPress: () => handleOpen(item),
            //     backgroundColor: Colors.danger,
            // },
        ];
        return (
            <View style={{ marginHorizontal: 5, }}>
                <Swipeout style={styles.swipeRevoke} right={swipeoutBtns} autoClose={true} backgroundColor="transparent">
                    <View style={styles.VouchersList}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.low}>
                                {byteConverter(item?.tx_bytes)?.toFixed(2)}MB{' '}
                                <Octicons_Icons name={'arrow-down'} IconStyle={[styles.icon, { color: Colors.purple }]} />
                                <Text style={styles.lowText}>{' '}/{' '}</Text>
                                < Text style={[styles.low, { color: Colors.green }]}>
                                    {byteConverter(item?.rx_bytes)?.toFixed(2)}KB{' '}
                                    <Octicons_Icons name={"arrow-up"} IconStyle={[styles.icon, { color: Colors.green }]} />
                                </Text>
                            </Text>
                        </View>
                        <Text style={styles.macAdress}>Mac Adress: {item?.mac}</Text>
                        <Text style={[styles.macAdress, styles.v_Number]}>{formatItemCode(item?.voucher_code)}</Text>
                        <Text style={styles.macAdress}>Device Name: Mac</Text>

                        <View style={styles.dateContainer}>
                            <Text style={styles.text4}>Active Date:{moment(new Date(item?.start)).format("MM/DD/YYYY")}</Text>
                            <Text style={styles.text4}>Expiry Date:{moment(new Date(item?.end)).format("MM/DD/YYYY")}</Text>
                        </View>
                    </View>
                </Swipeout>
            </View>
        );
    }

    const handleSearch = text => {
        setSearchText(text);
        const filtered = guestList?.filter(
            item => item?.voucher_code?.includes(text)
        );
        setSearchGuestList(filtered)
    };


    const renderHeaderItem = () => (
        <Search value={searchText} onChangeText={handleSearch} />
    );
    return (
        <View style={styles.container}>
            {isHeaderVisible ?
                <View style={[styles.HeaderContainer, { height: 120, }]}>
                    <TouchableOpacity onPress={handleGuest}>
                        <CustomText title={"24 hours"} textStyle={{ marginTop: 50, textAlign: 'right' }} />
                    </TouchableOpacity>
                    <CustomText title={"Guests"} textStyle={styles.HeaderTitle} />
                </View> :
                <View style={styles.ScrolContainer}>
                    <CustomText title={""} />
                    <CustomText title={"Guests"} textStyle={styles.ScrolGuests} />
                    <TouchableOpacity>
                        <CustomText title={"24 hours"} textStyle={{ fontSize: 20 }} />
                    </TouchableOpacity>
                </View>
            }
            <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                {loading ? <ActivityIndicator color={Colors.primary} size={'small'} style={{ marginTop: 50 }} /> :

                    <FlatList
                        data={searchGuestList}
                        contentContainerStyle={{ marginTop: 10, }}
                        ListHeaderComponent={renderHeaderItem}
                        renderItem={renderVoucherItem}
                        ListEmptyComponent={
                            <EmptyState title={"No content available at the moment."} />}
                        ListFooterComponent={<View style={styles.listFoter} />}

                        keyExtractor={item => item._id}
                    />
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {showActivityIndicator && (
                                <ActivityIndicator size={'large'} style={{ color: Colors.light_Black }} />
                            )}
                            {show_ok && (
                                <AntDesign_icon name='check' IconStyle={{ color: Colors.light_Black, fontSize: 50, fontWeight: 'bold' }} />
                            )}
                        </View>
                    </View>
                </Modal>
                {/* <View /> */}
            </ScrollView>
        </View>
    )
}

export default Guests

