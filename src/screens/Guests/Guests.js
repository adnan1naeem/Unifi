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

const Guests = () => {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [showActivityIndicator, setShowActivityIndicator] = useState(true);
    const [show_ok, setshow_ok] = useState(false);
    const [expired, setexpired] = useState(false);
    const [guestList, setguestList] = useState()
    const [disconnectedItems, setDisconnectedItems] = useState([]);



    const handleOpen = (action, item) => {
        setModalVisible(true);
        setShowActivityIndicator(true);
        setTimeout(() => {
            setShowActivityIndicator(false);
            setshow_ok(true);
            setTimeout(() => {
                setModalVisible(false);
                setshow_ok(false);
                setexpired(true)
            }, 2000);
        }, 3000);
    };

    const swipeoutBtns = [
        {
            text: 'Extend',
            onPress: handleOpen,
            backgroundColor: Colors.primary,
        },
        {
            text: 'Disconnect',
            onPress: handleOpen,
            backgroundColor: Colors.danger,
        },
    ];

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
        const currentDate = new Date();
        const unixTimestamp = Math.floor(currentDate.getTime() / 1000);
        axios.post(`${prefix_url}guest?start=${unixTimestamp}&end=1701349860466`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
                if (response?.data) {
                    setguestList(response?.data?.data)
                }
            })
            .catch(error => {
                console.log("Catch error :: ", error);
            });
    };

    const extractFirstWord = (sentence) => {
        const words = sentence?.trim().split(' ');
        if (words?.length > 0) {
            return words[0];
        }
        return '';
    };
    const formated_Time = (time) => {
        const date = moment?.unix(time)?.format('MMMM Do YYYY, h:mm:ss a');
        return date;
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

    const renderVoucherItem = ({ item }) => (
        <View style={{ marginHorizontal: 5, }}>
            <Swipeout style={styles.swipeRevoke} right={swipeoutBtns} autoClose={true} backgroundColor="transparent">
                <View style={styles.VouchersList}>
                    <View style={styles.itemHeader}>
                        <Text style={styles.low}>
                            200kb{' '}
                            <Octicons_Icons name={'arrow-down'} IconStyle={[styles.icon, { color: Colors.purple }]} />
                            <Text style={styles.lowText}>{' '}/{' '}</Text>
                            < Text style={[styles.low, { color: Colors.green }]}>
                                100kb{' '}
                                <Octicons_Icons name={"arrow-up"} IconStyle={[styles.icon, { color: Colors.green }]} />
                            </Text>
                        </Text>
                    </View>
                    <Text style={styles.macAdress}>Mac Adress: 00-10-FA-6E-38-4A</Text>
                    <Text style={[styles.macAdress, styles.v_Number]}>{formatItemCode("0342384823")}</Text>
                    <Text style={styles.macAdress}>Device Name: Mac</Text>

                    <View style={styles.dateContainer}>
                        <Text style={styles.text4}>Active Date:12/21/2023</Text>
                        <Text style={styles.text4}>Expiry Date:01/02/2024</Text>
                    </View>
                </View>
            </Swipeout>
        </View>

    );
    const handleSearch = text => {
        console.log(text);
    };


    const renderHeaderItem = ({ item }) => (
        <View style={{ marginHorizontal: 5, }}>
            <Search onChangeText={handleSearch} />
        </View>

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

                <FlatList
                    data={guestList || ['0', '2', '3', '4']}
                    contentContainerStyle={{ marginTop: 10, }}
                    ListHeaderComponent={renderHeaderItem}
                    renderItem={renderVoucherItem}
                    ListEmptyComponent={
                        <EmptyState title={"No content available at the moment."} />}
                    ListFooterComponent={<View style={styles.listFoter} />}

                    keyExtractor={item => item._id}
                />
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

