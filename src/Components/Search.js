import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../Utils/Colors';
import { Width } from './Dimensions';
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const Search = ({ value, onChange, onPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Icon name="search" size={15} color={Colors.black} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    onChangeText={onChange}
                    value={value}
                />
            </View>
            <TouchableOpacity onPress={onPress} style={{ marginHorizontal: 10, justifyContent: 'center', backgroundColor: Colors.primary, padding: 5, borderRadius: 5, paddingHorizontal: 10 }}>
                <EvilIcons name="search" size={24} color={Colors.white} />
            </TouchableOpacity>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        flexDirection: 'row'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.grey,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: Width / 1.4
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,

    },
    icon: {
        marginRight: 10,
    },
})