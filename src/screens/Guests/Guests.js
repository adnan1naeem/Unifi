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

    const handleExtend = async (item) => {
        console.log(item);
        setModalVisible(true);
        setShowActivityIndicator(true);
        setTimeout(() => {
            let data = JSON.stringify({
                "id": item?._id
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${prefix_url}/extendVoucher`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response, null, 2), "response")
                    setShowActivityIndicator(false);
                    setshow_ok(true);
                    handleGuest();
                    setTimeout(() => {
                        setModalVisible(false);
                        setshow_ok(false);
                        setexpired(true)
                    }, 1000);
                })
                .catch((error) => {
                    if (error?.message === "Request failed with status code 429") {
                        alert("Too many attempts!\n Please try again after few minutes");
                    }
                    setShowActivityIndicator(false);
                    setModalVisible(false);
                    setshow_ok(false);

                });
        }, 1000);
    };

    const handleTerminate = async (item) => {
        setModalVisible(true);
        setShowActivityIndicator(true);
        setTimeout(() => {
            let data = JSON.stringify({
                "id": item?._id
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${prefix_url}/terminateVoucher`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    setShowActivityIndicator(false);
                    setshow_ok(true);
                    handleGuest();
                    setTimeout(() => {
                        setModalVisible(false);
                        setshow_ok(false);
                        setexpired(true)
                    }, 1000);
                })
                .catch((error) => {
                    if (error?.message === "Request failed with status code 429") {
                        alert("Too many attempts!\n Please try again after few minutes");
                    }
                    setShowActivityIndicator(false);
                    setModalVisible(false);
                    setshow_ok(false);
                });
        }, 1000);
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
            {
                text: 'Extend',
                onPress: () => handleExtend(item),
                backgroundColor: Colors.primary,
            },
            {
                text: 'Disconnect',
                onPress: () => handleTerminate(item),
                backgroundColor: Colors.danger,
            },
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

