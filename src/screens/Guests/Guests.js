import { FlatList, Text, View, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Swipeout from 'react-native-swipeout';
import { Colors } from '../../Utils/Colors';
import CustomText from '../../Components/CustomText'
import Octicons_Icons from '../../Components/Icons/Octicons_Icons';
import AntDesign_icon from '../../Components/Icons/AntDesign_icon';
import { styles } from './Styles';

const Guests = () => {

    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [showActivityIndicator, setShowActivityIndicator] = useState(true);
    const [showHiText, setShowHiText] = useState(false);

    const handleOpen = () => {
        setModalVisible(true);
        setShowActivityIndicator(true);
        setTimeout(() => {
            setShowActivityIndicator(false);
            setShowHiText(true);
            setTimeout(() => {
                setModalVisible(false);
                setShowHiText(false);
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
            {isHeaderVisible ?
                <View style={[styles.HeaderContainer, { height: 120, }]}>
                    <TouchableOpacity>
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
                    data={data}
                    contentContainerStyle={{ marginTop: 50, }}
                    renderItem={({ item }) =>
                        <Swipeout right={swipeoutBtns} autoClose={true}>
                            <View style={styles.itemContainer}>
                                <View style={styles.itemContent}>
                                    <View style={styles.itemHeader}>
                                        <Text style={styles.title}>{item?.title}</Text>
                                        <Text style={styles.low}>
                                            {item?.low}{' '}
                                            <Octicons_Icons name={'arrow-down'} IconStyle={[styles.icon, { color: Colors.purple }]} />
                                            <Text style={styles.lowText}>{' '}/{' '}</Text>
                                            < Text style={[styles.low, { color: Colors.green }]}>
                                                {item?.low}{' '}
                                                <Octicons_Icons name={"arrow-up"} IconStyle={[styles.icon, { color: Colors.green }]} />
                                            </Text>
                                        </Text>
                                    </View>
                                    <View style={styles.itemDetails}>
                                        <Text style={styles.voucher}>{item?.voucher}</Text>
                                        <Text style={styles.valid}>{item?.Valid}</Text>
                                    </View>
                                </View>
                            </View>
                        </Swipeout>
                    }
                    keyExtractor={item => item.id.toString()}
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

