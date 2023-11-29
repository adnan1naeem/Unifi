import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { Width } from "./Dimensions";
import { Colors } from "../Utils/Colors";

const InputFieldNotes = ({text}) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (text) => {
    // Ensure the input contains only numeric values
    setInputValue(text);
  };

  return (
    <View style={styles.InputField}>
      <Text style={styles.text}>{text}</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        placeholder="Notes"
        keyboardType="text"
        onChangeText={handleInputChange}
      />
    </View>
  );
};

export default InputFieldNotes;

const styles = StyleSheet.create({
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
});
