import { Text, View, Image, TouchableOpacity, FlatList, Switch, Platform, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Utils/Colors'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import CustomText from '../../Components/CustomText'
import { prefix_url } from '../../Utils/Constants'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from './Styles'



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
        <View style={{ marginHorizontal: 15 }}>
            <CustomText title={"Sites Name"} textStyle={styles.titleheading} />
            <TouchableOpacity onPress={() => handlesubmit(item)} style={styles.sitelist}>
                <Text>{item?.name}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderFooter = () => (

        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Your Subscription Plan</Text>
            <View style={{ marginHorizontal: 15 }}>
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
            <View style={styles.ContainerSite}>
                <TouchableOpacity style={{ padding: 10, }} onPress={() => navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" style={styles.backButton} />
                </TouchableOpacity>
                <Image source={require('../../../assets/unifi.png')} style={styles.HeaderIcon} />
                <CustomText />
            </View>

            <CustomText title={"Sites List"} textStyle={styles.sitesListtext} />
            <View style={{ marginTop: '15%' }}>
                <FlatList
                    data={sites}
                    contentContainerStyle={{

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

