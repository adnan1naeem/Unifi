import { TouchableOpacity, View, Button, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Utils/Colors'
import CustomText from '../../Components/CustomText'
import { styles } from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Bar_Chart from '../../Components/Bar_Chart'
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { prefix_url } from '../../Utils/Constants'
import axios from 'axios'

const Home = ({ navigation }) => {
    const [siteName, setSiteName] = useState('');
    const [show, setShow] = useState(false);
    const [startDateModal, setStartDateModal] = useState(false);
    const [filteredDataLengths, setFilteredDataLengths] = useState([]);
    const [startDateIs, setStartDateIs] = useState(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [endDateIs, setEndDateIs] = useState(new Date());
    const [voucher, setVoucher] = useState([])
    const [numberOfActiveVouchers, setnumberOfActiveVouchers] = useState(0)

    const maxEndDate = moment(startDateIs).add(35, 'days').toDate();

    useEffect(() => {
        (async () => {
            let name = await AsyncStorage.getItem('SITE');
            setSiteName(name);
        })();
    }, [])
    useEffect(() => {
        if (voucher?.length > 0 && startDateIs !== null && endDateIs !== null) {
            fetchData();
        }
    }, [startDateIs, endDateIs, voucher]);

    const SignOut = async () => {
        try {
            await AsyncStorage.removeItem('USER');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Sites' }],
            });
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };


    const onChange = (event, selectedDate) => {
        setShow(false);
        if (startDateModal) {
            setStartDateIs(selectedDate);
        } else {
            setEndDateIs(selectedDate);
        }
    };

    const showDatepicker = (value) => {
        if (value === "start") {
            setStartDateModal(true);
        } else {
            setStartDateModal(false);
        }
        setShow(true);
    };

    const fetchData = async () => {
        let resultArray = [];
        const dateCountObject = {};
        voucher.forEach(entry => {
            const startDate = new Date(entry.start * 1000);
            const formattedDate = startDate.toISOString().split('T')[0];
            dateCountObject[formattedDate] = dateCountObject[formattedDate] ? dateCountObject[formattedDate] + 1 : 1;
        });
        Object.entries(dateCountObject).forEach(([key, value]) => {
            let result = { value: value, label: moment(key).format("MM/DD") };
            resultArray.push(result);
        })
        setFilteredDataLengths(resultArray.reverse());
        setnumberOfActiveVouchers(voucher?.length)

    };

    useEffect(() => {
        if (startDateIs && endDateIs) {
            handleSites();
        }
    }, [startDateIs, endDateIs])

    const returnExpectedDate = (date) => {
        const originalDateString = moment(date);
        const originalDate = new Date(originalDateString);
        const datePart = originalDate.toISOString().slice(0, 10);
        const formattedDateTimeString = `${datePart} 00:00:00`;
        let formatedDate = moment.utc(formattedDateTimeString, 'YYYY-MM-DD').unix() * 1000;
        return formatedDate;
    }

    const handleSites = async () => {
        const userUrl = await AsyncStorage.getItem("SITE_URL");
        let siteId = await AsyncStorage.getItem('SITE_ID');
        let date = new Date(endDateIs);
        date.setDate(date.getDate() + 1);
        let startDate = returnExpectedDate(startDateIs);
        let endDate = returnExpectedDate(date);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${prefix_url}?url=${userUrl}/api/s/${siteId}/stat/guest?start=${parseInt(startDate)}%26end=${parseInt(endDate)}&method=get`,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        axios.request(config)
            .then((response) => {
                if (response?.data) {
                    setVoucher(response?.data?.data)
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error, null, 2));
            });
    };

    return (
        <View>
            <View style={styles.HeaderContainer}>
                <TouchableOpacity onPress={SignOut}>
                    <CustomText title={"Log Out"} textStyle={styles.logout} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <CustomText title={"HOME"} textStyle={styles.HeaderTitle} />
                    <View style={{ flexDirection: 'row' }}>
                        <CustomText title={"site: "} textStyle={styles.HeaderTitle} />
                        <CustomText numberOfLines={1} title={siteName} textStyle={styles.siteTitle} />
                    </View>
                </View>
            </View>
            <ScrollView style={styles.containerView}>
                <View style={styles.headingContainer}>


                    <CustomText
                        title={"Welcome, admin, to"}
                        textStyle={{ color: Colors.textcolor }}
                    />
                    <CustomText
                        title={"FRG UniFi Network"}
                        textStyle={styles.mainContainer}
                    />
                    <CustomText
                        title={"7.3.83"}
                        textStyle={{ color: Colors.heading }}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <CustomText title={`Active Vouchers: `} textStyle={styles.DetailsContainer} />
                        <CustomText title={numberOfActiveVouchers} textStyle={[styles.DetailsContainer, { color: Colors.primary }]} />
                    </View>
                </View>
                <View style={styles.datePickerContainer}>
                    <View >
                        <Button onPress={() => showDatepicker("start")} title="Start Date!" />
                        <Text>StartDate: {moment(startDateIs).format("MM/DD/YYYY")}</Text>
                    </View>
                    <View>
                        <Button onPress={() => showDatepicker('end')} title="End Date!" />
                        <Text>EndDate: {moment(endDateIs).format("MM/DD/YYYY")}</Text>
                    </View>
                </View>
                {show &&
                    <DateTimePicker
                        testID="datePicker"
                        value={new Date()}
                        maximumDate={!startDateModal ? maxEndDate : undefined}
                        mode={"date"}
                        onChange={onChange}
                    />
                }
                <View style={styles.barContainer}>
                    <Bar_Chart
                        data={filteredDataLengths}
                        spacing={20}
                        width_Container={'100%'}
                        initialSpacing={5}
                    />
                </View>

            </ScrollView>
        </View>
    )
}

export default Home