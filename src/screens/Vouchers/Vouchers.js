import { Text, View, FlatList, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Colors } from "../../Utils/Colors";
import Plus from '../../Components/Icons/Plus';
import Print from '../../Components/Icons/Print';
import Swipeout from "react-native-swipeout";
import CustomText from '../../Components/CustomText';
import { styles } from './Styles';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import { prefix_url } from '../../Utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Search from '../../Components/Search'

const Vouchers = ({ navigation }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [voucher, setVoucher] = useState([])
  const [loading, setLoading] = useState(true);

  const handleSearch = text => {
    const filtered = voucher.filter(
      item => item.code.includes(text)
    );
    setVoucher(filtered)
  };

  const swipeBtns = [
    {
      text: "Revoke",
      backgroundColor: "red",
      underlayColor: "rgba(0, 0, 0, 1, 0.6)",
    },
    {
      text: 'Share',
      backgroundColor: 'blue',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    }
  ];

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsHeaderVisible(offsetY <= 0);
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      handleSites();
    }, [])
  );

  const handleSites = async () => {
    const userUrl = await AsyncStorage.getItem("SITE_URL");
    let config = {
      method: 'post',
      url: `${prefix_url}?url=${userUrl}/proxy/network/api/s/default/stat/voucher&method=get`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios.request(config)
      .then((response) => {
        if (response?.data) {
          setVoucher(response?.data?.data)
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };
  const formated_Time = (time) => {
    const date = moment.unix(time).format('MMMM Do YYYY, h:mm:ss a');
    return date;
  };

  const formatItemCode = (item) => {
    if (item && item.length > 5) {
      let formattedCode = '';
      for (let i = 0; i < item.length; i++) {
        if (i > 0 && i % 5 === 0) {
          formattedCode += '_';
        }
        formattedCode += item[i];
      }
      return formattedCode;
    }
    return item;
  };

  const renderVoucherItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Swipeout right={swipeBtns} autoClose={true} backgroundColor="transparent">
        <View style={styles.VouchersList}>
          <Text style={styles.text1}>Valid for 30 days</Text>
          <Text style={styles.text2}>{formatItemCode(item?.code)}</Text>
          <Text style={styles.text3}>{item?.status} use</Text>
          <Text style={styles.text4}>Created {formated_Time(item?.create_time)}</Text>
          <Text style={styles.text5}>Note: {item?.note}</Text>
        </View>
      </Swipeout>
    </TouchableOpacity>
  );

  return (
    <View>
      {isHeaderVisible ?
        <View style={styles.headervouchers}>
          <View style={styles.printadd}>
            <Print IconStyle={styles.printicon} onPress={() => navigation.navigate("PrintBatch")} />
            <Plus onPress={() => navigation.navigate("CreateVoucher")} IconStyle={styles.plusicon} />
          </View>
          <CustomText title={"Vouchers"} textStyle={styles.voucher} />
        </View> :
        <View style={styles.ScrolContainer}>
          <Text />
          <CustomText title={"Vouchers"} textStyle={styles.scrolTitle} />
          <View style={styles.ScrolIconContainer}>
            <Print IconStyle={styles.scrolPrint} onPress={() => navigation.navigate("PrintBatch")} />
            <Plus onPress={() => navigation.navigate("CreateVoucher")} IconStyle={{
              fontSize: 25,
              color: Colors.print,
            }} />
          </View>
        </View>
      }
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <Search value={voucher} onChangeText={handleSearch} />
        <View style={styles.VouchersListMap}>
          <FlatList
            data={voucher}
            keyExtractor={(item) => item?.id}
            renderItem={renderVoucherItem}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default Vouchers