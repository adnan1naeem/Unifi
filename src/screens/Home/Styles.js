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
        color: Colors.black
    },
    siteTitle: {
        textTransform: 'capitalize',
        paddingTop: 5,
        fontWeight: 'bold',
        fontSize: 24,
        color: Colors.black
    },
    containerView: {
        width: Width,
        height: height / 1.4,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainContainer: {
        color: Colors.primary,
        paddingVertical: 10,
        fontSize: 25,
        fontWeight: 'bold'
    },

});
