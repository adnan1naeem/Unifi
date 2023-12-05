import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';

export const styles = StyleSheet.create({
    innerHeading: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 10
    },
    controllerText: {
        fontSize: 17,
        color: Colors.heading
    },
    inputContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingLeft: 15,
    },
    inptFirst: {
        width: 200,
        paddingVertical: 15,
        borderRightWidth: 0.2,
        borderBottomWidth: 0.2,
        paddingHorizontal: 10,
        color: Colors.textcolor,
        fontWeight: 'bold',
        fontSize: 18,
        borderColor: Colors.heading
    },
    adminContainer: {
        backgroundColor: Colors.white,
        paddingLeft: 15
    },
    inputThird: {
        paddingVertical: 15,
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 8,
        borderColor: Colors.heading
    },
    siteContainer: {
        paddingVertical: 10
    },
    inneradminContainer: {
        borderBottomWidth: 0.2,
        borderColor: Colors.heading
    },
    siteText: {
        fontSize: 17,
        color: Colors.heading,
        paddingHorizontal: 20
    },
    siteInput: {
        backgroundColor: Colors.white,
        fontSize: 17,
        color: Colors.heading,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 10,

        borderColor: Colors.heading
    },
    infoText: {
        color: Colors.heading,
        paddingHorizontal: 20,
        alignSelf: 'center',
        fontSize: 12,
        paddingVertical: 15
    }
});