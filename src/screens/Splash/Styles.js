import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { Width, height } from '../../Components/Dimensions';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        height: height,
        width: Width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: { height: 130, width: Width / 1.3, resizeMode: 'contain' }

});