import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { Width, height } from '../../Components/Dimensions';


export const styles = StyleSheet.create({
    HeaderContainer: {
        backgroundColor: Colors.primary,
        height: Platform.OS === 'ios' ? 120 : 100,
        paddingHorizontal: 20
    },
    logout: {
        paddingTop: Platform.OS === 'ios' ? 50 : 25,
    },
    HeaderTitle: {
        paddingTop: 5,
        fontWeight: 'bold',
        fontSize: 24,
        color: Colors.white
    },
    siteTitle: {
        paddingTop: 5,
        width: 130,
        fontWeight: 'bold',
        fontSize: 24,
        color: Colors.white
    },
    containerView: {
        width: Width,
        paddingVertical: 30,
    },
    headingContainer: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    mainContainer: {
        color: Colors.primary,
        paddingVertical: 10,
        fontSize: 25,
        fontWeight: 'bold'
    },
    DetailsContainer: {
        color: Colors.black,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15,
    },
    barContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '20%',
        width: '85%'
    },
    datePickerContainer: { flexDirection: 'row', justifyContent: 'space-between', width: Width, paddingHorizontal: 30, }


});