import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { Width } from '../../Components/Dimensions';

export const styles = StyleSheet.create({
    modalContent: {
        width: Width,
        paddingBottom: 25,
        borderRadius: 10,

    },
    ModalText: { color: Colors.black, textAlign: 'center', paddingVertical: 10, },
    modalHeading: { color: Colors.black, textAlign: 'center', paddingVertical: 10, fontSize: 20, fontWeight: 'bold' },
    mainFlatContainer: {

    },
    modalOuterContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContainer: { backgroundColor: 'white', padding: 20, borderRadius: 10, marginHorizontal: 20 },
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
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: Platform.OS === 'ios' ? 55 : 30,

    },
    iconStyle: {
        // position: 'absolute',
        // bottom: 0,
        // paddingRight: 20,
        // paddingBottom: 25,
        // right: 0
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
    HeaderIcon: {
        height: 50,
        width: 190,
        resizeMode: 'contain',
    },
    container: {
        marginBottom: Platform.OS === 'ios' ? 10 : 0,
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: -10,
        flexDirection: 'row',
        width: Width,
        height: 80,

    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    buttonLeft: {
        backgroundColor: Colors.primary, // Change to your desired color
        width: '50%',
    },
    buttonRight: {
        backgroundColor: '#2ecc71', // Change to your desired color
        width: '50%',
    },
    buttonText: {
        color: '#ffffff', // Change to your desired text color
        fontSize: 16,
    },
});