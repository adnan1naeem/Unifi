import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/AntDesign';

const Minus = ({ IconStyle, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <MaterialCommunityIcons name={'minus'} style={IconStyle} />
        </TouchableOpacity>
    );
};

export default Minus;
