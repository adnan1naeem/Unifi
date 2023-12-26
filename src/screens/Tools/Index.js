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

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [voucher, setVoucher] = useState([]);
    const [activeVoucher, setActiveVoucher] = useState([]);

    useEffect(() => {
        (async()=>{
            await handleGuest();
            await getNonActiveVoucher();
        })();
    }, [])

    const handleGuest = async () => {
        const userUrl = await AsyncStorage.getItem("SITE_URL");
        let siteId = await AsyncStorage.getItem('SITE_ID');
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${prefix_url}/?url=${userUrl}/api/s/${siteId}/stat/guest?within=24&method=get`,
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
        let config = {
          method: 'post',
          url: `${prefix_url}?url=${userUrl}/api/s/${siteId}/stat/voucher&method=get`,
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
            console.log(JSON.stringify(error, null,2));
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
        <View>
            <View style={styles.container}>
                <CustomText title={"Tools"} textStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }} />
            </View>
            {loading ? <ActivityIndicator size={"small"} style={{ justifyContent: 'center', marginTop: 50 }} /> :
                <><TouchableOpacity
                    style={{
                        height: 50,
                        margin: 20,
                        borderRadius: 20,
                        backgroundColor: Colors.primary,
                        marginTop: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={()=>shareCSVFile(activeVoucher)}
                >
                    <CustomText title={'Export Active Voucher'} textStyle={{ color: 'white', fontSize: 16 }} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        height: 50,
                        margin: 20,
                        borderRadius: 20,
                        backgroundColor: Colors.primary,
                        marginTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={()=>shareCSVFile(voucher)}
                >
                    <CustomText title={'Export Non Active Voucher'} textStyle={{ color: 'white', fontSize: 16 }} />
                </TouchableOpacity>
                </>
            }
        </View>
    )
}

export default Index

