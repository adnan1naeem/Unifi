import { StyleSheet } from 'react-native';
import { Width } from '../../Components/Dimensions';
import { Colors } from '../../Utils/Colors';

export const styles = StyleSheet.create({
    headervouchers: {
        width: Width,
        backgroundColor: Colors.primary,
        paddingVertical: '5%'
    },
    printadd: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 15

    },
    printicon: {
        fontSize: 25,
        color: Colors.print,
        paddingHorizontal: 10
    },
    plusicon: {
        fontSize: 25,
        color: Colors.print,
    },
    voucher: {
        marginLeft: 20,
        marginTop: 8,
        fontSize: 35,
        fontWeight: "600",
    },
    VouchersListMap: {
        backgroundColor: Colors.white,
        marginTop: 35,
        marginBottom: 145
    },
    VouchersList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 40,
        borderBottomColor: Colors.light_Black,
        borderBottomWidth: 0.2,
        marginHorizontal: 20,
        paddingBottom: 13,
    },
    text1: {
        color: Colors.vouchers,
        fontSize: 14,
        fontWeight: '400'
    },
    text2: {
        fontSize: 30,
        fontWeight: '500'
    },
    text3: {
        color: Colors.vouchers,
        fontSize: 14,
        fontWeight: '400'
    },
    text4: {
        color: Colors.vouchers,
        fontSize: 13,
    },
    text5: {
        color: Colors.vouchers,
        marginTop: 10,
        fontSize: 12,

    },
    ScrolContainer: {
        backgroundColor: Colors.primary,
        paddingTop: 50,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    scrolTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 55
    },
    scrolPrint: {
        fontSize: 25,
        color: Colors.print,
        paddingHorizontal: 10
    },
    ScrolIconContainer: {
        flexDirection: 'row'
    }
});