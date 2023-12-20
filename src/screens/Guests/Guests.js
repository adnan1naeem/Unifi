import { FlatList, Text, View, TouchableOpacity, ScrollView, Modal, ActivityIndicator, Alert } from 'react-native'
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


const Guests = () => {

    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [showActivityIndicator, setShowActivityIndicator] = useState(true);
    const [showHiText, setShowHiText] = useState(false);
    const [expired, setexpired] = useState(false);
    const [guestList, setguestList] = useState()
    const [disconnectedItems, setDisconnectedItems] = useState([]);


    const handleOpen = (action, item) => {
        setModalVisible(true);
        setShowActivityIndicator(true);
        setTimeout(() => {
            setShowActivityIndicator(false);
            setShowHiText(true);
            setTimeout(() => {
                setModalVisible(false);
                setShowHiText(false);
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


    const renderVoucherItem = ({ item }) => (

        <View style={{ marginHorizontal: 5, }}>
            <Swipeout style={styles.swipeRevoke} right={swipeoutBtns} autoClose={true} backgroundColor="transparent">
                <View style={styles.VouchersList}>
                    <Text style={styles.macAdress}>Mac Adress: 00-10-FA-6E-38-4A</Text>
                    <Text style={[styles.macAdress, styles.v_Number]}>0342384823</Text>
                    <Text style={styles.macAdress}>Device Name: Mac</Text>
                    <View style={styles.dateContainer}>
                        <Text style={styles.text4}>Active Date:12/21/2023</Text>
                        <Text style={styles.text4}>Expiry Date:01/02/2024</Text>
                    </View>
                </View>
            </Swipeout>
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
                    contentContainerStyle={{ marginTop: 50, }}
                    renderItem={renderVoucherItem}
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
                            {showHiText && (
                                <AntDesign_icon name='check' IconStyle={{ color: Colors.light_Black, fontSize: 50, fontWeight: 'bold' }} />
                            )}
                        </View>
                    </View>
                </Modal>
                <View style={{ height: 240 }} />
            </ScrollView>
        </View>
    )
}

export default Guests

