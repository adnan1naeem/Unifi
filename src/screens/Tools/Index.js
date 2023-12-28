import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from '../../Components/CustomText'
import { styles } from './Styles'
import { Colors } from '../../Utils/Colors'
import axios from 'axios'
import { prefix_url } from '../../Utils/Constants'
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { height } from '../../Components/Dimensions'

const Index = () => {

    const [loading, setLoading] = useState(true);
    const [voucher, setVoucher] = useState([]);
    const [activeVoucher, setActiveVoucher] = useState([]);

    useEffect(() => {
        (async () => {
            await handleGuest();
            await getNonActiveVoucher();
        })();
    }, [])


    const handleGuest = async () => {
        const userUrl = await AsyncStorage.getItem("SITE_URL");
        let siteId = await AsyncStorage.getItem('SITE_ID');
        const port = await AsyncStorage.getItem("PORT");

        let urlEndPoint;
        if(port === '8443'){
            urlEndPoint = ''
        }else{
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

        await axios.request(config)
            .then((response) => {
                setActiveVoucher(response?.data?.data);
            })
            .catch((error) => {
            });
    };

    const getNonActiveVoucher = async () => {
        setLoading(true);
        const userUrl = await AsyncStorage.getItem("SITE_URL");
        let siteId = await AsyncStorage.getItem('SITE_ID');
        const port = await AsyncStorage.getItem("PORT");

        let urlEndPoint;
        if(port === '8443'){
            urlEndPoint = ''
        }else{
            urlEndPoint = 'proxy/network/'
        }
        let config = {
            method: 'post',
            url: `${prefix_url}?url=${userUrl}/${urlEndPoint}api/s/${siteId}/stat/voucher&method=get`,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios.request(config)
            .then((response) => {
                if (response?.data) {
                    setVoucher(response?.data?.data)
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const shareCSVFile = async (voucherList) => {
        try {
            const headers = Object.keys(voucherList[0])?.join(',');
            const csvData = [headers].concat(
                voucherList?.map((item) => Object.values(item).map((value) => `"${value}"`).join(','))
            ).join('\n');

            const csvFilePath = RNFS.CachesDirectoryPath + '/data.csv';
            await RNFS.writeFile(csvFilePath, csvData, 'utf8');

            await Share.open({
                url: 'file://' + csvFilePath,
                type: 'text/csv',
                filename: 'data.csv',
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={{ height: height, }}>
            <View style={styles.container}>
                <CustomText title={"Tools"} textStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }} />
            </View>
            <View style={{ justifyContent: 'center', flex: 1 }}>
                {loading ? <ActivityIndicator size={"small"} /> :
                    <View style={styles.ButtonCenter}>
                        <TouchableOpacity
                            style={styles.buttonsContainer}
                            onPress={() => shareCSVFile(activeVoucher)}
                        >
                            <CustomText title={'Export Active Voucher'} textStyle={styles.ButtonTitle} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttonsContainer, { marginTop: 10 }]}
                            onPress={() => shareCSVFile(voucher)}
                        >
                            <CustomText title={'Export Non Active Voucher'} textStyle={styles.ButtonTitle} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    )
}

export default Index

