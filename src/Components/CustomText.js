import { Text, } from 'react-native'
import React from 'react'
import { TextStyle } from './ComponentsStyle'

const CustomText = ({ title, textStyle, numberOfLines }) => {

    return (
        <Text numberOfLines={numberOfLines} style={[TextStyle.container, textStyle]}>{title}</Text>
    )
}

export default CustomText

