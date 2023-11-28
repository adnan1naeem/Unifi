import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'


const Less = ({ IconStyle, disabled, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <Feather name="chevron-left" style={IconStyle} />
        </TouchableOpacity>

    )
}
export default Less