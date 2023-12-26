

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

        padding: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1

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
        fontSize: 12,
        width: '45%',
        color: Colors.primary,
    },
    valid: {
        fontSize: 9,
        width: '50%',
        color: Colors.light_Black,
        textAlign: 'right',
    },
    VouchersList: {
        backgroundColor: Colors.white,
        marginHorizontal: 20,
        borderRadius: 10


    },
    macAdress: {
        color: Colors.vouchers,
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center'
    },
    text2: {
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center'
    },
    text4: {
        color: Colors.vouchers,
        fontSize: 13,
    },
    container: {
        backgroundColor: Colors.print
    },

    swipeRevoke: {
        backgroundColor: Colors.white,
        borderRadius: 18,
        marginVertical: 7,
    },
    sitelist: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
    },
    sitesListtext: {
        color: Colors.black,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
        paddingTop: 25
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    v_Number: {
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.black,
        paddingVertical: 5
    },
    listFoter: { height: 240 }


})