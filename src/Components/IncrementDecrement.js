import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../Utils/Colors";
import { Width } from "./Dimensions";
import Plus from "./Icons/Plus";
import Minus from "./Icons/Minus";

const IncrementDecrement = ({ Amount, setVoucherAmount, setVoucherUsage }) => {
  const [inputValue, setInputValue] = useState(1);
  const handleIncrement = () => {
    if (Amount === "Usage") {
      setVoucherUsage((prevValue) => prevValue + 1);
    } else {
      setVoucherAmount((prevValue) => prevValue + 1);
    }
    setInputValue((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    if (Amount === "Usage") {
      setVoucherUsage((prevValue) => Math.max(prevValue - 1, 1));
    } else {
      setVoucherAmount((prevValue) => Math.max(prevValue - 1, 1));
    }
    setInputValue((prevValue) => Math.max(prevValue - 1, 1));
  };
  const handleInputChange = text => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue)) {
      if (Amount === "Usage") {
        setVoucherUsage(Math.max(numericValue, 1));
      } else {
        setVoucherAmount(Math.max(numericValue, 1));
      }
      setInputValue(Math.max(numericValue, 1));
    }
  };

  return (
    <View style={styles.IncrementDecrement}>
      <Text style={styles.text}>{Amount}</Text>
      <View style={styles.buttonsInput}>
        <TextInput
          style={styles.input}
          value={inputValue.toString()}
          keyboardType="numeric"
          onChangeText={handleInputChange}
          editable={true}

        />
        <View style={styles.buttons}>
          <Minus IconStyle={styles.Minus} onPress={handleDecrement} />
          <View style={styles.line} />
          <Plus IconStyle={styles.Minus} onPress={handleIncrement} />
        </View>
      </View>
    </View>
  );
};

export default IncrementDecrement;

const styles = StyleSheet.create({
  IncrementDecrement: {
    width: Width,
    backgroundColor: Colors.white,
    borderTopColor: "#bfbfbf",
    borderTopWidth: 0.5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 22,
    paddingRight: 20,
  },
  text: {
    fontSize: 18,
    paddingTop: 30,
  },
  input: {

    width: 50,
    textAlign: "center",
    fontSize: 18,
  },
  buttonsInput: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    paddingTop: 23,
    paddingBottom: 23,
  },
  buttons: {
    flexDirection: "row",
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    width: 1,
    height: "100%",
    backgroundColor: Colors.primary,
  },
  Minus: {
    fontSize: 27,
    color: Colors.primary,
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 3,
    paddingBottom: 3,
  },
});
