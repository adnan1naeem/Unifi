import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from "../../Utils/Colors";
import Plus from '../../Components/Icons/Plus';
import Print from '../../Components/Icons/Print';
import Swipeout from "react-native-swipeout";
import CustomText from '../../Components/CustomText';
import { styles } from './Styles';


const Vouchers = ({ navigation }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const vouchersList = [
    {
      id: 1,
      validFor: "Valid for 30 days",
      code: "42200-47129",
      usage: "Valid for one-time use",
      createdAt: "Created 26 Oct 2023 at 8:58 PM",
      note: "Note: Decline 500 vouchers, 30 days, 26 Oct 2023 batch",
    },
    {
      id: 2,
      validFor: "Valid for 30 days",
      code: "42200-47129",
      usage: "Valid for one-time use",
      createdAt: "Created 26 Oct 2023 at 8:58 PM",
      note: "Note: Decline 500 vouchers, 30 days, 26 Oct 2023 batch",
    },
    {
      id: 3,
      validFor: "Valid for 30 days",
      code: "42200-47129",
      usage: "Valid for one-time use",
      createdAt: "Created 26 Oct 2023 at 8:58 PM",
      note: "Note: Decline 500 vouchers, 30 days, 26 Oct 2023 batch",
    },
    {
      id: 4,
      validFor: "Valid for 30 days",
      code: "42200-47129",
      usage: "Valid for one-time use",
      createdAt: "Created 26 Oct 2023 at 8:58 PM",
      note: "Note: Decline 500 vouchers, 30 days, 26 Oct 2023 batch",
    },
    {
      id: 5,
      validFor: "Valid for 30 days",
      code: "42200-47129",
      usage: "Valid for one-time use",
      createdAt: "Created 26 Oct 2023 at 8:58 PM",
      note: "Note: Decline 500 vouchers, 30 days, 26 Oct 2023 batch",
    },

  ];

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

  const renderVoucherItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Swipeout right={swipeBtns} autoClose={true} backgroundColor="transparent">
        <View style={styles.VouchersList}>
          <Text style={styles.text1}>{item.validFor}</Text>
          <Text style={styles.text2}>{item.code}</Text>
          <Text style={styles.text3}>{item.usage}</Text>
          <Text style={styles.text4}>{item.createdAt}</Text>
          <Text style={styles.text5}>{item.note}</Text>
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
        <View style={styles.VouchersListMap}>
          <FlatList
            data={vouchersList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderVoucherItem}
          />
        </View>
        <View style={{ height: 150 }} />
      </ScrollView>
    </View>
  )
}

export default Vouchers

