import { Platform, StyleSheet } from 'react-native';
import { Width } from '../../Components/Dimensions';
import { Colors } from '../../Utils/Colors';

export const styles = StyleSheet.create({
    headervouchers: {
        width: Width,
        backgroundColor: Colors.primary,
        paddingVertical: '5%'
    },
    printadd: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
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
        // marginTop: 35,
        marginBottom: 145
    },
    BarAxis: {
        position: 'absolute',
        bottom: 10,
        left: 45
    },
    DetailsContainer: {
        color: Colors.black,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    barContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '20%',
        width: '85%'
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
    containerTab: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 20
    },
    innerContainer: {
        paddingVertical: 7,
        backgroundColor: Colors.white,
        width: Width / 1.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8,
        overflow: 'hidden',
        paddingHorizontal: 5
    },
    unselectedTab: {
        textAlign: 'center',
        paddingVertical: 5,
    },
    selectedContainer: {
        width: '48%',
        backgroundColor: Colors.primary,
        borderRadius: 5
    },
    selectedText: {
        textAlign: 'center',
        paddingVertical: 5,
        color: Colors.white
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