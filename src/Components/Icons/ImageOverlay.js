import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const ImageOverlay = ({ IconStyle }) => {
    return (
        <MaterialIcons name="do-not-disturb" style={IconStyle} />
    )
}

export default ImageOverlay

