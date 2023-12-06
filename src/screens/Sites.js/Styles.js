import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { Width } from '../../Components/Dimensions';

export const styles = StyleSheet.create({
    modalContent: {
        width: Width,
        paddingBottom: 25,
        borderRadius: 10,

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
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? '15%' : '5%'
    },
    backButton: {
        color: Colors.white,
        fontSize: 15,
        fontWeight: 'bold'
    },
    titleheading: {
        paddingHorizontal: 20,
        color: Colors.textcolor,
        fontSize: 13,
        paddingBottom: 5
    },
    sitelist: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20
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
        width: 50,
        resizeMode: 'contain',
        tintColor: Colors.white
    }
});