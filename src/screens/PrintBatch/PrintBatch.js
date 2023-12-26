import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  FlatList
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../Utils/Colors";
import { Width } from "../../Components/Dimensions";
import List from "../../Components/List";
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../../Components/CustomText";

const PrintBatch = ({ route, }) => {
  const navigation = useNavigation();
  const [dateBaseFilter, setdateBaseFilter] = useState()
  const [siteName, setSiteName] = useState('');

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
    setdateBaseFilter(resultArray?.reverse())
  }, [])

  const formated_Time = (time) => {
    const date = moment?.unix(time)?.format('MM Do YYYY, h:mm:ss a');
    return date;
  };

  useEffect(() => {
    (async () => {
      let name = await AsyncStorage.getItem('SITE');
      setSiteName(name);
    })();
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.CreateVoucher}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CustomText title={"Cancel"} textStyle={styles.text1} />
        </TouchableOpacity>
        <CustomText numberOfLines={1} title={siteName} textStyle={styles.siteTitle} />
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
    flexDirection: "row",
    gap: 90,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center'
  },
  text1: {
    color: Colors.white,
    fontSize: 15,
    marginTop: 2,
  },
  siteTitle: {
    paddingTop: 5,
    width: 130,
    fontWeight: 'bold',
    fontSize: 24,
    color: Colors.white
  },
});
