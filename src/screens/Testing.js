import { FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Swipeout from 'react-native-swipeout';
import { Colors } from '../Utils/Colors';
import { Width } from '../Components/Dimensions';



const Guests = () => {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [showActivityIndicator, setShowActivityIndicator] = useState(true);
    const [showHiText, setShowHiText] = useState(false);

    const handleOpen = () => {
        setModalVisible(true);
        setShowActivityIndicator(true)
        setTimeout(() => {
            setShowActivityIndicator(false);
            setShowHiText(true);
            setTimeout(() => {
                setModalVisible(false);
                setShowHiText(false);
            }, 2000);
        }, 5000);
    };

    const swipeoutBtns = [
        {
            text: 'Extend',
            onPress: () => console.log('Button 1 pressed'),
            backgroundColor: Colors.primary,
        },
        {
            text: 'Disconnect',
            onPress: handleOpen,
            backgroundColor: Colors.danger,
        },
    ];
    const data = [
        {
            id: 1,
            title: 'Galaxy-J7-Nxt',
            low: "Zero KB",
            voucher: 'Voucher (28865-827...',
            Valid: "Valid until 26 Nov 2023 at 8:57 PM",
        },
        {
            id: 2,
            title: 'Gurparkash-s-S20',
            low: "Zero KB",
            voucher: 'Voucher (28865-827...',
            Valid: "Valid until 26 Nov 2023 at 8:57 PM",
        },
        {
            id: 3,
            title: '02:2b:16:b5:9d:e1',
            low: "Zero KB",
            voucher: 'Voucher (28865-827...',
            Valid: "Valid until 26 Nov 2023 at 8:57 PM",
        },
        {
            id: 4,
            title: 'Redmi-Note-10',
            low: "Zero KB",
            voucher: 'Voucher (28865-827...',
            Valid: "Valid until 26 Nov 2023 at 8:57 PM",
        },
        {
            id: 5,
            title: 'manoja-kumara',
            low: "Zero KB",
            voucher: 'Voucher (28865-827...',
            Valid: "Valid until 26 Nov 2023 at 8:57 PM",
        },
        {
            id: 6,
            title: '02:2b:16:b5:9d:e1',
            low: "Zero KB",
            voucher: 'Voucher (28865-827...',
            Valid: "Valid until 26 Nov 2023 at 8:57 PM",
        },
        {
            id: 7,
            title: 'Redmi-Note-10',
            low: "Zero KB",
            voucher: 'Voucher (28865-827...',
            Valid: "Valid until 26 Nov 2023 at 8:57 PM",
        },
        {
            id: 8,
            title: 'manoja-kumara',
            low: "Zero KB",
            voucher: 'Voucher (28865-827...',
            Valid: "Valid until 26 Nov 2023 at 8:57 PM",
        },
    ];
    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setIsHeaderVisible(offsetY <= 0);
    };


    return (
        <View style={styles.container}>

            <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                <Swipeout right={swipeoutBtns} autoClose={true}>
                    <View style={{ marginTop: 200 }}>
                        <View style={styles.itemContent}>

                            <View style={styles.itemDetails}>
                                <Text style={styles.voucher}>sadfader</Text>

                            </View>
                        </View>
                    </View>
                </Swipeout>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {showActivityIndicator && (
                                <ActivityIndicator size="large" color={Colors.primary} />
                            )}
                            {showHiText && (
                                <Text>Hi</Text>
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

const styles = StyleSheet.create({


    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: Width / 2,
        alignSelf: 'center',
        marginTop: 200,

    },


    // ////


    HeaderContainer: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20
    },
    ScrolGuests: {
        paddingLeft: Width / 5,
        fontWeight: 'bold',
        fontSize: 20
    },
    ScrolContainer: {
        height: 100,
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    HeaderTitle: {
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 27,
        color: Colors.black
    },
    itemContainer: {
        backgroundColor: Colors.white,
    },
    itemContent: {
        paddingHorizontal: 15,
        borderBottomWidth: 0.2,
        borderBottomColor: Colors.blur,
        marginLeft: 10,
        paddingVertical: 10,
    },
    itemHeader: {
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    low: {
        color: Colors.purple,
        fontSize: 15,
    },
    lowText: {
        color: Colors.light_Black,
    },
    icon: {
        fontSize: 15,
    },
    itemDetails: {
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    voucher: {
        fontSize: 13,
        width: '45%',
        color: Colors.primary,
    },
    valid: {
        fontSize: 12,
        width: '57%',
        color: Colors.light_Black,
    },
})