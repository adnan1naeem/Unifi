import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { Width } from "./Dimensions";
import { Colors } from "../Utils/Colors";

const List = ({ text }) => {


  return (
    <View style={styles.InputField}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  InputField: {
    width: Width,
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    justifyContent: "space-between",
    paddingVertical: 15,
    borderTopColor: "#bfbfbf",
    borderTopWidth: 0.5,


  },
  text: {
    fontSize: 18,

  },
  input: {
    width: 60,
    fontSize: 17
  },
});
