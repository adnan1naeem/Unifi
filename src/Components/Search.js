import { StyleSheet, View, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../Utils/Colors';

const Search = ({ value, onChangeText }) => {

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Icon name="search" size={15} color={Colors.black} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    onChangeText={onChangeText}
                    value={value}
                />
            </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({

    container: {

        paddingHorizontal: 30,
        paddingVertical: 20
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 5,
        paddingHorizontal: 10,
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