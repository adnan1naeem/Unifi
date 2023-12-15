import { Text, View, FlatList, TouchableOpacity, ScrollView, Button } from 'react-native'
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
import DateTimePicker from '@react-native-community/datetimepicker';

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

  const filterDataForTimeRange = async (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dayAdded = end.getDate() + 7;
    end.setDate(dayAdded);

    const filteredData = voucher?.filter(item => {
      const createTime = new Date(item?.create_time * 1000);
      return createTime <= start && createTime <= end;
    });
    let value = { value: filteredData?.length, date: moment(startDate).format("MM/DD") };
    return value;
  };

  const fetchData = async () => {
    let lastDate = new Date();

    let resultArray = [];
    for (let i = 0; i < 7; i++) {
      let startDate = new Date();
      let dateIs = startDate.setDate(startDate.getDate() + i);
      let data = await filterDataForTimeRange(dateIs, lastDate);
      resultArray.push(data);
    }

    setFilteredDataLengths(resultArray);
  };

  useEffect(() => {
    fetchData();
  }, [voucher]);


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

  const [startDateIs, setStartDateIs] = useState(new Date(1598051730000));
  const [endDateIs, setEndDateIs] = useState(new Date(1598051730000));
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [showEndDate, setDhowEndDate] = useState(false);

  useEffect(() => {
    setStartDateIs(moment(startDateIs).format("MM/DD/YYYY"));
    setEndDateIs(moment(endDateIs).format("MM/DD/YYYY"));
  }, [])
  showEndDate

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setStartDateIs(currentDate);
  };

  const onChangeEndDate = (selectedDate) => {
    const currentDate = selectedDate;
    setDhowEndDate(false);
    setEndDateIs(currentDate);
  };

  const showDatepicker = (value) => {
    if (value === "start") {
      setShow(true);
    } else {
      setDhowEndDate(true);
    }
  };


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
          <View>
            <CustomText title={"Active Vouchers"} textStyle={styles.DetailsContainer} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Button onPress={() => showDatepicker("start")} title="Start Date!" />
              <Button onPress={() => showDatepicker('end')} title="End Date!" />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Text>StartDate: {startDateIs.toLocaleString()}</Text>
              <Text>EndDate: {endDateIs.toLocaleString()}</Text>
            </View>
            {show &&
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"date"}
                is24Hour={true}
                onChange={onChange}
              />
            }
            {showEndDate &&
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"date"}
                is24Hour={true}
                onChange={onChangeEndDate}
              />
            }
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
          </View>
        }
        <View style={{ height: 150 }} />
      </ScrollView>
    </View>
  )
}

export default Vouchers




