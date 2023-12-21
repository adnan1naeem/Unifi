import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { Width } from "./Dimensions";
import { Colors } from "../Utils/Colors";
import SwitchCase from "./SwitchCase";

const InputField = ({text,onChange}) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    onChange(numericValue);
    setInputValue(numericValue);
  };

  return (
    <View style={styles.InputField}>
      <Text style={styles.text}>{text}</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        placeholder="0"
        keyboardType="numeric"
        onChangeText={handleInputChange}
      />
    </View>
  );
};

export default InputField;

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
