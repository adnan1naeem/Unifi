import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/AntDesign';

const Print = ({ IconStyle, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <MaterialCommunityIcons name={'printer'} style={IconStyle} />
        </TouchableOpacity>
    );
};

export default Print;
