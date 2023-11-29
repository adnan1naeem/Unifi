import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Octicons from 'react-native-vector-icons/Octicons'


const Octicons_Icons = ({ IconStyle, name }) => {
    return (
        <Octicons name={name} style={IconStyle} />
    )
}

export default Octicons_Icons

