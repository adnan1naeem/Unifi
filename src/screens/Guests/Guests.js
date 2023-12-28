import { FlatList, Text, View, TouchableOpacity, ScrollView, Modal, ActivityIndicator, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Swipeout from 'react-native-swipeout';
import { Colors } from '../../Utils/Colors';
import CustomText from '../../Components/CustomText'
import AntDesign_icon from '../../Components/Icons/AntDesign_icon';
import { styles } from './Styles';
import { prefix_url } from '../../Utils/Constants';
import axios from 'axios'
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

    const handleExtend = async (item) => {

        setModalVisible(true);
        setShowActivityIndicator(true);
        const userUrl = await AsyncStorage.getItem("SITE_URL");
        let siteId = await AsyncStorage.getItem('SITE_ID');
        const port = await AsyncStorage.getItem("PORT");
        setTimeout(async() => {
            let data = JSON.stringify({
                "_id": item?._id,
                "cmd": "extend"
            });
            let urlEndPoint;
            let csrf = '';
            if (port === 8443 || port === '8443') {
                urlEndPoint = ''
            } else {
                csrf = await AsyncStorage.getItem("CSRF-TOKEN");
                urlEndPoint = 'proxy/network/'
            }

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${prefix_url}?url=${userUrl}/${urlEndPoint}api/s/${siteId}/cmd/hotspot&method=post`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data
            };
            if (csrf !== '') {
                config.headers['x-csrf-token'] = csrf;
            }

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
                    console.log(JSON.stringify(error, null, 2))
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
        const userUrl = await AsyncStorage.getItem("SITE_URL");
        let siteId = await AsyncStorage.getItem('SITE_ID');
        const port = await AsyncStorage.getItem("PORT");
        setTimeout(async () => {
            let data = JSON.stringify({
                "_id": item?._id,
                "cmd": "terminate"
            });
            let csrf = '';
            let urlEndPoint;
            if (port === 8443 || port === '8443') {
                urlEndPoint = ''
            } else {
                csrf = await AsyncStorage.getItem("CSRF-TOKEN");
                urlEndPoint = 'proxy/network/'
            }

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${prefix_url}?url=${userUrl}/${urlEndPoint}api/s/${siteId}/cmd/hotspot&method=post`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            if (csrf !== '') {
                config.headers['x-csrf-token'] = csrf;
            }

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
                    console.log(JSON.stringify(error, null, 2))
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

    useEffect(() => {
        handleGuest();
    }, [])

    const handleGuest = async () => {
        setLoading(true);
        const userUrl = await AsyncStorage.getItem("SITE_URL");
        let siteId = await AsyncStorage.getItem('SITE_ID');
        const port = await AsyncStorage.getItem("PORT");
        let urlEndPoint;
        let csrf = '';
        if (port === 8443 || port === '8443') {
            urlEndPoint = ''
        } else {
            csrf = await AsyncStorage.getItem("CSRF-TOKEN");
            urlEndPoint = 'proxy/network/'
        }
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${prefix_url}/?url=${userUrl}/${urlEndPoint}api/s/${siteId}/stat/guest?within=24&method=get`,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        if (csrf !== '') {
            config.headers['x-csrf-token'] = csrf;
        }

        axios.request(config)
            .then((response) => {
                setguestList(response?.data?.data);
                setSearchGuestList(response?.data?.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(JSON.stringify(error,));
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
        const kilobyte = 1024;
        const megabyte = kilobyte * 1024;
        const gigabyte = megabyte * 1024;

        if (bytes < kilobyte) {
            return bytes + ' B';
        } else if (bytes < megabyte) {
            return (bytes / kilobyte).toFixed(2) + 'KB';
        } else if (bytes < gigabyte) {
            return (bytes / megabyte).toFixed(2) + 'MB';
        } else {
            return (bytes / gigabyte).toFixed(2) + 'GB';
        }
    }

    const convertDate = (timeStamp) => {
        const timeStampIs = timeStamp + '000'
        const date = new Date(parseInt(timeStampIs));
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${day}/${month}/${year}`
    }

    const renderVoucherItem = ({ item }) => {
        const swipeoutBtns = [
            {
                text: 'Extend',
                onPress: () => handleExtend(item),
                backgroundColor: Colors.primary
            },
            {
                text: 'Disconnect',
                onPress: () => item?.expired == true ? null : handleTerminate(item),
                backgroundColor: item?.expired == true ? Colors.heading : Colors.danger,
                disabled: item?.expired == true ? true : false

            },
        ];
        return (
            <View style={{ marginHorizontal: 5, }}>
                <Swipeout style={styles.swipeRevoke} right={swipeoutBtns} autoClose={true} backgroundColor="transparent">
                    <View style={styles.VouchersList}>

                        <View style={styles.itemHeader}>
                            {item?.expired == true &&
                                <View style={{ borderRadius: 5, overflow: 'hidden' }}>
                                    <Text style={{ backgroundColor: 'red', textAlign: 'center', color: Colors.white, padding: 10, }}>{"Expired"}</Text>

                                </View>}
                            <>
                                <Text style={styles.low}>
                                    {byteConverter(item?.tx_bytes)}{' '}
                                    <Octicons_Icons name={'arrow-down'} IconStyle={[styles.icon, { color: Colors.purple }]} />
                                    <Text style={styles.lowText}>{' '}/{' '}</Text>
                                    <Text style={[styles.low, { color: Colors.green }]}>
                                        {byteConverter(item?.rx_bytes)}{' '}
                                        <Octicons_Icons name={"arrow-up"} IconStyle={[styles.icon, { color: Colors.green }]} />
                                    </Text>
                                </Text>
                            </>

                        </View>
                        <Text style={styles.macAdress}>Mac Adress: {item?.mac}</Text>
                        <Text style={[styles.macAdress, styles.v_Number]}>{formatItemCode(item?.voucher_code)}</Text>
                        <Text style={styles.macAdress}>Device Name: Mac</Text>

                        <View style={styles.dateContainer}>
                            <Text style={styles.text4}>Active Date:{convertDate(item?.start)}</Text>
                            <Text style={styles.text4}>Expiry Date is:{convertDate(item?.end)}</Text>
                        </View>
                    </View>
                </Swipeout>
            </View>
        );
    }

    useEffect(() => {
        if (searchText === "") {
            setSearchGuestList(guestList);
        }
    }, [searchText])

    const handleSearch = () => {
        const filtered = guestList?.filter(
            item => item?.voucher_code?.includes(searchText)
        );
        setSearchGuestList(filtered)
    };

    return (
        <View style={styles.container}>
            {isHeaderVisible ?
                <View style={[styles.HeaderContainer, styles.HeaderContainerSecond]}>
                    <CustomText title={"Guests"} textStyle={styles.HeaderTitle} />
                    <TouchableOpacity onPress={handleGuest}>
                        <CustomText title={"24 hours"} textStyle={{}} />
                    </TouchableOpacity>
                </View> :
                <View style={styles.ScrolContainer}>
                    <CustomText title={""} />
                    <CustomText title={"Guests"} textStyle={styles.ScrolGuests} />
                    <CustomText title={"24 hours"} textStyle={{ fontSize: 20 }} />
                </View>
            }
            <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                <Search value={searchText} onChange={setSearchText} onPress={handleSearch} />
                {loading ? <ActivityIndicator color={Colors.primary} size={'small'} style={{ marginTop: 50 }} /> :
                    <FlatList
                        data={searchGuestList}
                        contentContainerStyle={{ marginTop: 10, }}
                        renderItem={renderVoucherItem}
                        maxToRenderPerBatch={10}
                        initialNumToRender={10}
                        ListEmptyComponent={
                            <EmptyState title={"No active voucher available at the moment."} />}
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
            </ScrollView>
        </View>
    )
}

export default Guests

