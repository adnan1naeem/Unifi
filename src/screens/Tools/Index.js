import { View } from 'react-native'
import React from 'react'
import CustomText from '../../Components/CustomText'
import { styles } from './Styles'

const Index = () => {
    return (
        <>
            <View style={styles.container}>
                <CustomText title={"Tools"} textStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }} />
            </View>
            <View style={{ flex: 1 }}>
                <CustomText title={"Tools"} textStyle={{ fontWeight: 'bold', fontSize: 20 }} />

            </View>
        </>
    )
}

export default Index

