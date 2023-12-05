import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Switch, Platform, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Utils/Colors'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import CustomText from '../../Components/CustomText'
import { prefix_url } from '../../Utils/Constants'
import axios from 'axios'
import { Width } from '../../Components/Dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Sites = ({ navigation }) => {
    const [weekly, setWeekly] = useState(false);
    const [monthly, setMonthly] = useState(false);
    const [yearly, setYearly] = useState(false);
    const [sites, setSites] = useState()

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
                setSites(response?.data?.data)
            }
        }).catch(error => {
            console.log("Catch error :: ", error);
        })
    };

    const handlesubmit = async (item) => {
        await AsyncStorage.setItem("SUBSCRIPTION", 'YES');
        await AsyncStorage.setItem('SITE', item?.name);
        navigation.navigate("BottomTab")
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlesubmit(item)} style={{ backgroundColor: Colors.white, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 8, paddingVertical: 15, paddingHorizontal: 20 }}>
            <Text>Name: {item?.name}</Text>
            <Text>role: {item?.role}</Text>
        </TouchableOpacity>
    );

    const renderFooter = () => (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>

                <Text style={styles.modalTitle}>Select Your Subscription Plan</Text>
                <View style={styles.toggleContainer}>
                    <View style={styles.text_container}>
                        <Text style={styles.Text_heading}>Weekly</Text>
                        <Text style={styles.Text_description}>
                            {"Where you can Avail the limited restricted thing\n"}
                        </Text>
                    </View>
                    <Switch
                        trackColor={{ false: Colors.light_Black, true: Colors.primary }}
                        thumbColor={weekly ? Colors.white : Colors.white}
                        value={weekly}
                        onValueChange={() => setWeekly(!weekly)}
                    />
                </View>
                <View style={styles.toggleContainer}>
                    <View style={styles.text_container}>
                        <Text style={styles.Text_heading}>Monthly</Text>
                        <Text style={styles.Text_description}>
                            {"Where you can Avail the limited restricted thing\n"}
                        </Text>
                    </View>
                    <Switch
                        trackColor={{ false: Colors.light_Black, true: Colors.primary }}
                        thumbColor={monthly ? Colors.white : Colors.white}
                        value={monthly}
                        ios_backgroundColor={"white"}
                        onValueChange={() => setMonthly(!monthly)}
                    />
                </View>
                <View style={styles.toggleContainer}>
                    <View style={styles.text_container}>
                        <Text style={styles.Text_heading}>Yearly</Text>
                        <Text style={styles.Text_description}>
                            {"Where you can Avail the limited restricted thing\n"}
                        </Text>
                    </View>
                    <Switch
                        trackColor={{ false: Colors.light_Black, true: Colors.primary }}
                        thumbColor={yearly ? Colors.white : Colors.white}
                        value={yearly}

                        onValueChange={() => setYearly(!yearly)}
                    />
                </View>
            </View>
        </View>
    );


    return (
        <View>
            <View style={{ backgroundColor: Colors.primary, height: 100, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center', paddingTop: Platform.OS === 'ios' ? '15%' : '5%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" style={{ color: Colors.white, fontSize: 15, fontWeight: 'bold' }} />
                </TouchableOpacity>
                <Image source={require('../../../assets/unifi.png')} style={{ height: 50, width: 50, resizeMode: 'contain', tintColor: Colors.white }} />
                <CustomText />
            </View>

            <CustomText title={"Sites List"} textStyle={{ color: Colors.black, fontWeight: 'bold', textAlign: 'center', fontSize: 30, paddingTop: 25 }} />
            <View style={{ marginTop: '15%' }}>
                <FlatList
                    data={sites}
                    contentContainerStyle={{
                        marginHorizontal: 15
                    }}
                    renderItem={renderItem}
                    ListFooterComponent={renderFooter}
                    keyExtractor={(item) => item?._id}
                />
            </View>

        </View>
    )
}

export default Sites

const styles = StyleSheet.create({
    modalContainer: {

    },
    modalContent: {
        width: Width,
        paddingBottom: 25,
        borderRadius: 10,

    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.black,
        paddingVertical: 25,
        textAlign: 'center',

    },
    text_container: { width: "75%" },
    Text_heading: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.black
    },
    Text_description: {
        fontSize: 12,
        fontWeight: "500",
        color: Colors.black
    },
    toggleContainer: {
        paddingVertical: 20,
        borderWidth: 0.5,
        borderColor: Colors.white,
        width: "92%",
        borderRadius: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.white,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    closeButton: {
        padding: 10,
        alignSelf: "flex-end",
        color: Colors.boldBlue,
    },
})