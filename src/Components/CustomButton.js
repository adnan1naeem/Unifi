import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../Utils/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const CustomButton = ({ title, onPress, textStyle, navigation, icon, customContainer, disabled }) => {
    return (
        <TouchableOpacity disabled={disabled} style={[styles.buttonContainer,customContainer]} onPress={onPress}>
            {icon && <FontAwesome name="magic" style={styles.magicIcon} />}
            <Text style={[styles.buttonText,textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 20,
        backgroundColor: "#0c84ff",
        width: "90%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
    },
    magicIcon: {
        color: Colors.white,
        fontSize: 20,
        paddingHorizontal: 10,
        paddingTop: 5

    },
    buttonText: {
        color: Colors.white,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    },
});
