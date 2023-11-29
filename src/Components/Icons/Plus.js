import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/AntDesign';

const Plus = ({ IconStyle, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <MaterialCommunityIcons name={'plus'} style={IconStyle} />
        </TouchableOpacity>
    );
};

export default Plus;
