import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from '../../Components/CustomText'
import { styles } from './Styles'
import { Colors } from '../../Utils/Colors'
import axios from 'axios'
import { prefix_url } from '../../Utils/Constants'
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [activeVoucher, setActiveVoucher] = useState(true);

    useEffect(() => {
        handleGuest();
    }, [])

    const handleGuest = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${prefix_url}/activeVouchers?start=1700596800000&end=1703188800000`,
            headers: {
                'Cookie': 'unifises=coAVJ9lv7BRJsbiyVWrzBauAL3BKXevh'
            }
        };

        await axios.request(config)
            .then((response) => {
                setLoading(false);
                setActiveVoucher(response?.data?.data);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const shareCSVFile = async () => {
        try {
            const headers = Object.keys(activeVoucher[0])?.join(',');
            const csvData = [headers].concat(
                activeVoucher?.map((item) => Object.values(item).map((value) => `"${value}"`).join(','))
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
        <View>
            <View style={styles.container}>
                <CustomText title={"Tools"} textStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }} />
            </View>
            {loading ? <ActivityIndicator size={"small"} style={{ justifyContent: 'center' }} /> :
                <TouchableOpacity
                    style={{
                        height: 50,
                        margin: 20,
                        borderRadius: 20,
                        backgroundColor: Colors.primary,
                        marginTop: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={shareCSVFile}
                >
                    <CustomText title={'Export Active Voucher'} textStyle={{ color: 'white', fontSize: 16 }} />
                </TouchableOpacity>
            }
        </View>
    )
}

export default Index

