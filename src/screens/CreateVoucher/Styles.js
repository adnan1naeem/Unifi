import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { Width, height } from '../../Components/Dimensions';


export const styles = StyleSheet.create({

    scrollViewContent: {
        flexGrow: 1,
    },
    centeredView: {
        height: height,
        width: Width,
        backgroundColor: Colors.background
    },
    modalView: {
        marginTop: 30,
        backgroundColor: 'red',
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    ContainerFlatModal: {
        flexDirection: 'row',
        width: Width,
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: Colors.white,
        borderWidth: 0.2,
        borderColor: Colors.light_Black,
    },
    modalContainer: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: Platform.OS === 'ios' ? 60 : 0,
        paddingHorizontal: 20
    },

    CreateVoucher: {
        width: Width,
        backgroundColor: Colors.primary,
        paddingTop: "15%",
        paddingBottom: "5%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 15,
    },
    text1: {
        color: Colors.white,
        fontSize: 15,
        marginTop: 2,
    },
    Amount: {
        marginTop: 20,
    },
    usage: {
        width: Width,
        backgroundColor: Colors.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    limited: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 14,

        alignItems: "center",
        justifyContent: "center",
    },
    line: {
        width: 1,
        height: "100%",
        backgroundColor: Colors.primary,
    },
    option: {
        padding: 10,
        borderRadius: 5,
    },
    selected: {
        backgroundColor: Colors.primary,
        borderRadius: 13

    },
    optionText: {
        color: Colors.primary,
        paddingLeft: 41,
        paddingRight: 41
    },
    whiteText: {
        color: Colors.white,
    },
    blackText: {
        color: Colors.primary,
    },
    toggleButton: {
        marginTop: 30,
        borderTopColor: "#bfbfbf",
        borderTopWidth: 0.5,
    },
    InputField: {
        width: Width,
        display: "flex",
        flexDirection: "row",
        backgroundColor: Colors.white,
        marginTop: 2,
        paddingHorizontal: 18,
        justifyContent: "space-between",
        paddingVertical: 15,

    },
    text: {
        fontSize: 17,
    },
    input: {
        width: 60,
        fontSize: 17
    },
    exprieModalContainer: {
        paddingVertical: 20,
        backgroundColor: Colors.white,
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 29,
        borderWidth: 0.2,
        borderColor: Colors.light_Black
    }
})