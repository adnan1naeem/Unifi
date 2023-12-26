import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../Utils/Colors'
import { height } from './Dimensions'
import CustomText from './CustomText'

const EmptyState = ({ title }) => {
    return (
        <View style={styles.Container}>
            <CustomText textStyle={styles.titleText} title={title} />
        </View>
    )
}

export default EmptyState

const styles = StyleSheet.create({
    Container: {
        backgroundColor: Colors.primary,
        height: 120,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        borderRadius: 15,
        marginTop: height / 5,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})