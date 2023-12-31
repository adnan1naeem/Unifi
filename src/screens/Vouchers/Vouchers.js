import { Text, View, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
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
  const [searchText, setSearchText] = useState("")
  const [searchVoucher, setSearchVoucher] = useState([])
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState();

  useEffect(() => {
    if (searchText === "") {
      setSearchVoucher(voucher);
    }
  }, [searchText])

  const handleSearch = () => {
    const filtered = voucher?.filter(
      item => item?.code?.includes(searchText)
    );
    setSearchVoucher(filtered)
  };

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
    const port = await AsyncStorage.getItem("PORT");
    let csrf = '';
    let urlEndPoint;
    if (port === '8443') {
      urlEndPoint = ''
    } else {
      csrf = await AsyncStorage.getItem("CSRF-TOKEN");
      urlEndPoint = 'proxy/network/'
    }
    let config = {
      method: 'post',
      url: `${prefix_url}?url=${userUrl}/${urlEndPoint}api/s/${siteId}/stat/voucher&method=get`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (csrf !== '') {
      config.headers['x-csrf-token'] = csrf;
    }

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

  const revokeSelected = async (item) => {
    setSelectedVoucher(item);
    setDeleteLoading(true);
    const userUrl = await AsyncStorage.getItem("SITE_URL");
    let siteId = await AsyncStorage.getItem('SITE_ID');
    const port = await AsyncStorage.getItem("PORT");

    let data = { "_id": item?._id, "cmd": "delete-voucher" };
    let urlEndPoint;
    let csrf = '';
    if (port === '8443') {
      urlEndPoint = ''
    } else {
      csrf = await AsyncStorage.getItem("CSRF-TOKEN");
      urlEndPoint = 'proxy/network/'
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${prefix_url}?url=${userUrl}/${urlEndPoint}api/s/${siteId}/cmd/hotspot&method=post`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: data
    };
    if (csrf !== '') {
      config.headers['x-csrf-token'] = csrf;
    }

    axios.request(config)
      .then((response) => {
        handleSites();
        setDeleteLoading(false);
      })
      .catch((error) => {
        setDeleteLoading(false);
      });
  }

  const renderVoucherItem = ({ item }) => {
    const swipeBtns = [
      {
        text: "Revoke",
        backgroundColor: "red",
        onPress: () => revokeSelected(item),
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
      }
    ];
    let days;
    if (parseInt(item?.duration) / 1440 <= 1) {
      days = `Valid for ${parseInt(item?.duration) / 1440} day`
    } else {
      days = `Valid for ${parseInt(item?.duration) / 1440} days`
    }
    return (
      <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => handlePress(item)}>
        <Swipeout right={swipeBtns} autoClose={true} backgroundColor="transparent">
          {selectedVoucher?._id === item?._id && deleteLoading ? <ActivityIndicator color={'black'} size={'small'} style={[styles.VouchersList, { height: 150, justifyContent: 'center' }]} /> :
            <View style={styles.VouchersList}>
              <Text style={styles.text1}>{days}</Text>
              <Text style={styles.text2}>{formatItemCode(item?.code)}</Text>
              <Text style={styles.text3}>{item?.status} use</Text>
              <Text style={styles.text4}>Created {formated_Time(item?.create_time)}</Text>
              <Text style={styles.text5}>Note: {item?.note}</Text>
            </View>
          }
        </Swipeout>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {isHeaderVisible ?
        <View style={styles.headervouchers}>
          <View style={styles.printadd}>
            <Print IconStyle={styles.printicon} onPress={() => navigation.navigate("PrintBatch", { voucher: voucher })} />
            <Plus onPress={() => navigation.navigate("CreateVoucher")} IconStyle={styles.plusicon} />
          </View>
          <CustomText title={"Vouchers"} textStyle={styles.voucher} />
        </View> :
        <View style={styles.ScrolContainer}>
          <Text />
          <CustomText title={"Vouchers"} textStyle={styles.scrolTitle} />
          <View style={styles.ScrolIconContainer}>
            <Print IconStyle={styles.scrolPrint} onPress={() => navigation.navigate("PrintBatch", { voucher: voucher })} />
            <Plus onPress={() => navigation.navigate("CreateVoucher")} IconStyle={{
              fontSize: 25,
              color: Colors.print,
            }} />
          </View>
        </View>
      }

      <ScrollView style={{ backgroundColor: Colors.white }} onScroll={handleScroll} scrollEventThrottle={16}>
        <Search value={searchText} onChange={setSearchText} onPress={() => handleSearch()} />
        <View style={styles.VouchersListMap}>
          {loading ? <ActivityIndicator color={Colors.primary} size={'small'} style={{ marginTop: 50 }} /> :
            <FlatList
              data={searchVoucher}
              keyExtractor={(item) => item?.id}
              renderItem={renderVoucherItem}
              initialNumToRender={10}
              ListEmptyComponent={
                <EmptyState title={"List of vouchers are not available at the moment."} />}
            />}
        </View>
      </ScrollView>
    </View>
  )
}

export default Vouchers