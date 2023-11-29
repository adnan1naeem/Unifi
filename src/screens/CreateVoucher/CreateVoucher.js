import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../Utils/Colors";
import IncrementDecrement from "../../Components/IncrementDecrement";
import { Width } from "../../Components/Dimensions";
import CustomText from "../../Components/CustomText";
import InputField from "../../Components/InputField";
import SwitchCase from "../../Components/SwitchCase";

const CreateVoucher = ({ navigation }) => {
  const [isLimitedSelected, setLimitedSelected] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isBandWidthOn, setIsBandWidthOn] = useState(false);
  const [isByteOn, setIsByteOn] = useState(false);

  const handleSwitchChange = (value) => {
    setIsSwitchOn(value);
  };
  const handleBandwidthLimit = (value) => {
    setIsBandWidthOn(value);
  };

  const handleLimitedPress = (value) => {
    setLimitedSelected(value);
  };
  const handleBytePress = (value) => {
    setIsByteOn(value);
  };

  const handleUnlimitedPress = () => {
    setLimitedSelected(false);
  };
  return (
    <View>
      <View style={styles.CreateVoucher}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CustomText title={"Cancel"} textStyle={styles.text1} />
        </TouchableOpacity>

        <Text style={[styles.text1, {
          fontSize: 18,
          fontWeight: "600",
        }]}>Create Vouchers</Text>
        <Text style={styles.text1}>Create</Text>
      </View>
      <View style={styles.Amount}>
        <Text>
          {" "}
          <IncrementDecrement Amount="Amount" />
        </Text>
        <View style={styles.usage}>
          <View style={styles.limited}>
            <TouchableOpacity
              style={[
                styles.option,
                isLimitedSelected ? styles.selected : null,
              ]}
              onPress={handleLimitedPress}
            >
              <Text
                style={[
                  styles.optionText,
                  isLimitedSelected ? styles.whiteText : styles.blackText,
                ]}
              >
                Limited use
              </Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <TouchableOpacity
              style={[
                styles.option,
                !isLimitedSelected ? styles.selected : null,
              ]}
              onPress={handleUnlimitedPress}
            >
              <Text
                style={[
                  styles.optionText,
                  !isLimitedSelected ? styles.whiteText : styles.blackText,
                ]}
              >
                Unlimited use
              </Text>
            </TouchableOpacity>
            
          </View>
  
        </View>
      </View>  
      {isLimitedSelected && <IncrementDecrement Amount="Usage" />}
      <View style={styles.toggleButton}>
      <SwitchCase title="Limited Download Bandwidth" onValueChange={handleSwitchChange} textColor='black' />
      {isSwitchOn && <InputField text="Bandwidth Limit(kbps)" />}
      </View>
      <View style={styles.toggleButton}>
      <SwitchCase title="Limited Upload Bandwidth" onValueChange={handleBandwidthLimit} textColor='black' />
      {isBandWidthOn && <InputField text="Bandwidth Limit(kbps)" />}
      </View>
      <View style={styles.toggleButton}>
      <SwitchCase title="Byte Quta" onValueChange={handleBytePress} textColor='black' />
      {isByteOn && <InputField text="Bandwidth Limit(kbps)" />}
      </View>
      <View style={styles.toggleButton}>
      {isSwitchOn && <InputField text="Note" />}
      </View>
    </View>
  );
};

export default CreateVoucher;

const styles = StyleSheet.create({
  CreateVoucher: {
    width: Width,
    backgroundColor: Colors.primary,
    paddingTop: "15%",
    paddingBottom: "5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
  },
  text1: {
    color: Colors.white,
    fontSize: 15,
    marginTop: 2,
  },


  Amount: {
    marginTop: 20,
  },
  usage: {
    width: Width,
    backgroundColor: Colors.white,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  limited: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    width: 1,
    height: "100%",
    backgroundColor: Colors.primary,
  },
  option: {
    padding: 10,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: Colors.primary,

  },
  optionText: {
    color: Colors.primary,
  },
  whiteText: {
    color: Colors.white,
  },
  blackText: {
    color: Colors.primary,
  },
  toggleButton:{
    marginTop:55,
    borderTopColor: "#bfbfbf",
    borderTopWidth: 0.5,
  }
});
