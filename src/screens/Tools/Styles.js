import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";


export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    buttonsContainer: {
        borderRadius: 20,
        backgroundColor: Colors.primary,
        paddingVertical: 20,
        marginHorizontal: 20

    },
    ButtonTitle: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    ButtonCenter: {
        marginBottom: 30
    }
})