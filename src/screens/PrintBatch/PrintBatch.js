import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  CustomText,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../Utils/Colors";
import { Width } from "../../Components/Dimensions";
import List from "../../Components/List";
import { useNavigation } from "@react-navigation/native";

const PrintBatch = (props) => {
  const navigation= useNavigation();
  const voucherList = props?.route?.params?.voucher;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.CreateVoucher}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={styles.text1}>Cancel </Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.text1,
            {
              fontSize: 18,
              fontWeight: "600",
            },
          ]}
        >
          Print Batch
        </Text>
      </View>
      <View style={{ marginTop: 55 }}></View>
      <List text="23 Nov 2023 at 2:10 PM" />
      <List text="23 Nov 2023 at 2:10 PM" />
      <List text="23 Nov 2023 at 2:10 PM" />
      <List text="23 Nov 2023 at 2:10 PM" />
      <List text="23 Nov 2023 at 2:10 PM" />
    </ScrollView>
  );
};

export default PrintBatch;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  CreateVoucher: {
    width: Width,
    backgroundColor: Colors.primary,
    paddingTop: "5%",
    paddingBottom: "5%",
    display: "flex",
    flexDirection: "row",
    gap: 90,
    paddingLeft: 15,
    paddingRight: 15,
  },
  text1: {
    color: Colors.white,
    fontSize: 15,
    marginTop: 2,
  },
});
