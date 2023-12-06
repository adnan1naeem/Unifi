import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Colors } from "../../Utils/Colors";
import Plus from '../../Components/Icons/Plus';
import Print from '../../Components/Icons/Print';
import Swipeout from "react-native-swipeout";
import CustomText from '../../Components/CustomText';
import { styles } from './Styles';
import Bar_Chart from '../../Components/Bar_Chart';
import { Graph_data_Home, X_axis_Labels_Vouchers } from '../../Utils/Arrays_data';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import { prefix_url } from '../../Utils/Constants';



const Vouchers = ({ navigation }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [tabView, settabView] = useState('Vouchers')
  const [voucher, setVoucher] = useState()



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
  const [filteredDataLengths, setFilteredDataLengths] = useState({});

  const filterDataForTimeRange = async (startDate, endDate, label) => {
    const start = new Date();
    start.setDate(start.getDate() - startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setDate(end.getDate() - endDate);
    end.setHours(23, 59, 59, 999);

    const filteredData = voucher?.filter(item => {
      const createTime = new Date(item?.create_time * 1000);
      return createTime >= start && createTime <= end;
    });

    return filteredData?.length;
  };

  const fetchData = async () => {
    const todayLength = await filterDataForTimeRange(0, 0, 'Today');
    const yesterdayLength = await filterDataForTimeRange(1, 1, 'Yesterday');
    const twoDaysAgoLength = await filterDataForTimeRange(2, 2, 'Two days ago');
    const threeDaysAgoLength = await filterDataForTimeRange(3, 3, 'Three days ago');
    const fourDaysAgoLength = await filterDataForTimeRange(4, 4, 'Four days ago');
    const fiveDaysAgoLength = await filterDataForTimeRange(5, 5, 'five days ago');

    const daysResult = [
      { value: todayLength },
      { value: yesterdayLength },
      { value: twoDaysAgoLength },
      { value: threeDaysAgoLength },
      { value: fourDaysAgoLength },
      { value: fiveDaysAgoLength },
    ];
    setFilteredDataLengths(daysResult);
  };

  useEffect(() => {
    fetchData();
  }, [filteredDataLengths]);


  const handleSites = () => {
    axios.get(`${prefix_url}/voucher`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (response?.data) {
          setVoucher(response?.data?.data)
        }
      })
      .catch(error => {
        console.log("Catch error :: ", error);
      });
  };

  const formated_Time = (time) => {
    const date = moment.unix(time).format('MMMM Do YYYY, h:mm:ss a');
    return date;
  };

  const renderVoucherItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Swipeout right={swipeBtns} autoClose={true} backgroundColor="transparent">
        <View style={styles.VouchersList}>
          <Text style={styles.text1}>Valid for 30 days</Text>
          <Text style={styles.text2}>{item.code}</Text>
          <Text style={styles.text3}>{item.status} use</Text>
          <Text style={styles.text4}>Created {formated_Time(item.create_time)}</Text>
          <Text style={styles.text5}>Note: {item.note}</Text>
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
        <View style={styles.containerTab}>
          <View style={styles.innerContainer}>
            <TouchableOpacity onPress={() => settabView('Vouchers')} style={tabView === 'Vouchers' ? styles.selectedContainer : { width: '48%', }}>
              <Text style={tabView === 'Vouchers' ? styles.selectedText : styles.unselectedTab}>Vouchers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => settabView('Details')} style={tabView === 'Details' ? styles.selectedContainer : { width: '48%', }}>
              <Text style={tabView === 'Details' ? styles.selectedText : styles.unselectedTab}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
        {tabView === 'Vouchers' ?
          <View style={styles.VouchersListMap}>
            <FlatList
              data={voucher}
              keyExtractor={(item) => item?.id}
              renderItem={renderVoucherItem}
            />
          </View>
          :
          <>
            <CustomText title={"Active Vouchers"} textStyle={styles.DetailsContainer} />
            <View style={styles.barContainer}>
              <Bar_Chart
                data={filteredDataLengths}
                customLabels={X_axis_Labels_Vouchers}
                X_Axis_Container={styles.BarAxis}
                axis={{ fontSize: 9, color: Colors.black, }}
                spacing={20}
                initialSpacing={5}
              />
            </View>
          </>
        }
        <View style={{ height: 150 }} />
      </ScrollView>
    </View>
  )
}

export default Vouchers




