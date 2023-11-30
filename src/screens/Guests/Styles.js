

import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { Width } from '../../Components/Dimensions';


export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: Width / 2.5,
        alignSelf: 'center',

    },
    HeaderContainer: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20
    },
    ScrolGuests: {
        paddingLeft: Width / 5,
        fontWeight: 'bold',
        fontSize: 20
    },
    ScrolContainer: {
        height: 100,
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    HeaderTitle: {
        fontWeight: 'bold',
        fontSize: 27,
        color: Colors.black
    },
    itemContainer: {
        backgroundColor: Colors.white,
    },
    itemContent: {
        paddingHorizontal: 15,
        borderBottomWidth: 0.2,
        borderBottomColor: Colors.blur,
        marginLeft: 10,
        paddingVertical: 10,
    },
    itemHeader: {
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    low: {
        color: Colors.purple,
        fontSize: 15,
    },
    lowText: {
        color: Colors.light_Black,
    },
    icon: {
        fontSize: 15,
    },
    itemDetails: {
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    voucher: {
        fontSize: 13,
        width: '45%',
        color: Colors.primary,
    },
    valid: {
        fontSize: 12,
        width: '57%',
        color: Colors.light_Black,
    },
})