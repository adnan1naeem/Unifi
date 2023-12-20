import { FlatList, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Utils/Colors'
import CustomText from '../../Components/CustomText'
import { styles } from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Bar_Chart from '../../Components/Bar_Chart'
import { Graph_data_Home, X_axis_Labels_Home } from '../../Utils/Arrays_data'
import { X_Axis } from '../../Components/ComponentsStyle'


const Home = ({ navigation }) => {
    const [siteName, setSiteName] = useState('');

    useEffect(() => {
        (async () => {
            let name = await AsyncStorage.getItem('SITE');
            setSiteName(name);
        })();
    }, [])

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
                        <CustomText title={siteName} textStyle={styles.siteTitle} />
                    </View>
                </View>
            </View>
            <View style={styles.containerView}>
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
                <Bar_Chart
                    data={Graph_data_Home}
                    spacing={28}
                    initialSpacing={12}
                    width_Container={'88%'}
                />
            </View>
        </View>
    )
}

export default Home

