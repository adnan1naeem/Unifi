import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const LeftU = ({ IconStyle, icon, disabled }) => {
    return (
        <TouchableOpacity disabled={disabled}>
            <MaterialCommunityIcons name={icon ? icon : 'arrow-u-left-top'} style={IconStyle} />
        </TouchableOpacity>
    )
}

export default LeftU