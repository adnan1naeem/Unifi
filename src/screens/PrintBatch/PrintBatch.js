import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  CustomText,
  Platform,
  FlatList
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../Utils/Colors";
import { Width } from "../../Components/Dimensions";
import List from "../../Components/List";
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';

const PrintBatch = ({ route, }) => {
  const navigation = useNavigation();
  const [dateBaseFilter, setdateBaseFilter] = useState()

  useEffect(() => {
    const data = route?.params?.voucher;
    const groupedData = data.reduce((acc, item) => {
      const create_time = item.create_time;
      if (!acc[create_time]) {
        acc[create_time] = [];
      }
      acc[create_time].push(item);
      return acc;
    }, {});
    const resultArray = Object.keys(groupedData).map(create_time => ({
      create_time,
      items: groupedData[create_time],
    }));
    setdateBaseFilter(resultArray)
  }, [])

  const formated_Time = (time) => {
    const date = moment?.unix(time)?.format('MM Do YYYY, h:mm:ss a');
    return date;
  };


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

      {dateBaseFilter?.map(item => (
        <View key={item.id}>
          <List onPress={() => navigation.navigate('Printer', { item: item })} text={formated_Time(item?.create_time)} />
        </View>
      ))}

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
    paddingTop: Platform.OS === 'android' ? "5%" : 60,
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
