import React from 'react'
import { TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

const Rotate = ({ IconStyle, disabled }) => {
    return (
        <TouchableOpacity disabled={disabled}>
            <Feather name='rotate-ccw' style={IconStyle} />
        </TouchableOpacity>

    )
}
export default Rotate