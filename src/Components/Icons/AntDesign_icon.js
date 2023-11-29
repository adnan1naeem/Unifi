import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

const AntDesign_icon = ({ IconStyle, name }) => {
    return (
        <AntDesign name={name} style={IconStyle} />
    )
}

export default AntDesign_icon