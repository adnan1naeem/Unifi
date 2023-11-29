import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Swipeout from 'react-native-swipeout';


const Guests = () => {

    const swipeoutBtns = [
        {
            text: 'Button 1',
            onPress: () => console.log('Button 1 pressed'),
            backgroundColor: 'orange',
        },
        {
            text: 'Button 2',
            onPress: () => console.log('Button 2 pressed'),
            backgroundColor: 'blue',
        },
    ];

    return (
        <View style={{ marginTop: 150, }}>
            <Swipeout right={swipeoutBtns} autoClose={true}>
                <View style={{ backgroundColor: 'red', paddingHorizontal: 15, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>HUAWEI_P10_lite</Text>
                    <View>
                        <Text>Zero KB <Text>/</Text> <Text>Zero KB</Text> </Text>
                    </View>

                </View>
                <View style={{ backgroundColor: 'red', paddingHorizontal: 15, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text>Voucher (81195-206...)</Text>
                    <Text>Valid until 26 Nov 2023 at 8:57 PM</Text>
                </View>
            </Swipeout>
        </View>
    )
}

export default Guests

const styles = StyleSheet.create({})