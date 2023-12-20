import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { Width } from '../../Components/Dimensions';

export const styles = StyleSheet.create({
    modalContent: {
        width: Width,
        paddingBottom: 25,
        borderRadius: 10,

    },
    mainFlatContainer: {

    },
    ForwordArrow: {
        alignSelf: 'center',
        fontSize: 25,
        color: Colors.black,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.black,
        paddingVertical: 25,
        textAlign: 'center',

    },
    text_container: {
        width: "75%"
    },
    Text_heading: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.black
    },
    Text_description: {
        fontSize: 12,
        fontWeight: "500",
        color: Colors.black
    },
    toggleContainer: {
        paddingVertical: 20,
        borderWidth: 0.5,
        borderColor: Colors.white,
        borderRadius: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.white,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    closeButton: {
        padding: 10,
        alignSelf: "flex-end",
        color: Colors.boldBlue,
    },
    ContainerSite: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 15,
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 55 : 30,
        paddingBottom: 10
    },
    iconStyle: { 
        position: 'absolute', 
        bottom: 0, 
        paddingRight: 20,
        paddingBottom: 25, 
        right: 0 
    },
    backButton: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'bold'
    },
    titleheading: {
        paddingHorizontal: 20,
        color: Colors.textcolor,
        fontSize: 13,
        paddingBottom: 5
    },
    swipeRevoke:{
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
    HeaderIcon: {
        height: 50,
        width: 190,
        resizeMode: 'contain',
    }
});