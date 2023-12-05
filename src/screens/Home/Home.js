import { FlatList, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../Utils/Colors'
import CustomText from '../../Components/CustomText'
import { styles } from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Bar_Chart from '../../Components/Bar_Chart'
import { Graph_data_Home, X_axis_Labels_Home } from '../../Utils/Arrays_data'
import { X_Axis } from '../../Components/ComponentsStyle'


const Home = ({ navigation }) => {

    const SignOut = async () => {
        try {
            await AsyncStorage.removeItem('USER');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
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

                <CustomText title={"HOME"} textStyle={styles.HeaderTitle} />
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
                    customLabels={X_axis_Labels_Home}
                    X_Axis_Container={X_Axis.X_axis_Container}
                    spacing={28}
                    initialSpacing={12}
                    width_Container={'88%'}
                />
            </View>
        </View>
    )
}

export default Home

