import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Width } from "./Dimensions";
import { Colors } from "../Utils/Colors";
import Greater from "./Icons/Greater";

const List = ({ text, onPress }) => {


  return (
    <TouchableOpacity onPress={onPress} style={styles.InputField}>
      <Text style={styles.text}>{text}</Text>
      <Greater IconStyle={{ fontSize: 20 }} />

    </TouchableOpacity>
  );
};

export default List;

const styles = StyleSheet.create({
  InputField: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingVertical: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 15
  },
  text: {
    fontSize: 18,

  },
  input: {
    width: 60,
    fontSize: 17
  },
});
