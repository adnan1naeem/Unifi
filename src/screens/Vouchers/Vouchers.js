import { Text, View, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
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
import { height, } from '../../Components/Dimensions';
import EmptyState from '../../Components/EmptyState';

const Vouchers = ({ navigation }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [voucher, setVoucher] = useState([])
  const [searchVoucher, setSearchVoucher] = useState([])
  const [loading, setLoading] = useState(true);

  const handleSearch = text => {
    const filtered = voucher?.filter(
      item => item?.code?.includes(text)
    );
    setSearchVoucher(filtered)
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
      handleSites();
    }, [])
  );

  const handleSites = async () => {
    setLoading(true);
    const userUrl = await AsyncStorage.getItem("SITE_URL");
    let siteId = await AsyncStorage.getItem('SITE_ID');
    let config = {
      method: 'post',
      url: `${prefix_url}?url=${userUrl}/api/s/${siteId}/stat/voucher&method=get`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios.request(config)
      .then((response) => {
        if (response?.data) {
          setSearchVoucher(response?.data?.data);
          setVoucher(response?.data?.data)
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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
          formattedCode += '-';
        }
        formattedCode += item[i];
      }
      return formattedCode;
    }
    return item;
  };

  const renderHeaderItem = ({ item }) => (
    <Search value={voucher} onChangeText={handleSearch} />
  );

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
    <View style={{ flex: 1 }}>
      {isHeaderVisible ?
        <View style={styles.headervouchers}>
          <View style={styles.printadd}>
            <Print IconStyle={styles.printicon} onPress={() => navigation.navigate("PrintBatch",{voucher:voucher})} />
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

      <ScrollView style={{ backgroundColor: Colors.white }} onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={styles.VouchersListMap}>
          {loading ? <ActivityIndicator color={Colors.primary} size={'small'} style={{ marginTop: height / 2 }} /> :
            <FlatList
              data={searchVoucher}
              keyExtractor={(item) => item?.id}
              ListHeaderComponent={renderHeaderItem}
              renderItem={renderVoucherItem}
              ListEmptyComponent={
                <EmptyState title={"No content available at the moment."} />}
            />}
        </View>
      </ScrollView>
    </View>
  )
}

export default Vouchers