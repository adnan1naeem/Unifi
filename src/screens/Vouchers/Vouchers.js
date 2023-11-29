import { StyleSheet, Text, View,TouchableHighlight,FlatList } from 'react-native'
import React from 'react'
import VouchersList from '../../Components/VouchersList';
import { Colors } from "../../Utils/Colors";
import Plus from '../../Components/Icons/Plus';
import Print from '../../Components/Icons/Print';

const Vouchers = () => {
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
      const renderVoucherItem = ({ item }) => (
        <VouchersList
          validFor={item.validFor}
          code={item.code}
          usage={item.usage}
          createdAt={item.createdAt}
          note={item.note}
          onPress={() => handlePress(item)}
        />
      );
    return (
        <View>
        <View style={styles.headervouchers}>
          <View style={styles.printadd}>
            <Text>
              <Print IconStyle={styles.printicon} />
            </Text>
            <Text>
              <Plus IconStyle={styles.plusicon} />
            </Text>
          </View>
          <Text style={styles.voucher}>Vouchers</Text>
        </View>
        <View style={styles.VouchersListMap}>
          <FlatList
            data={vouchersList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderVoucherItem}
          />
        </View>
      </View>
    )
}

export default Vouchers

const styles = StyleSheet.create({
    headervouchers: {
      width: "100%",
      backgroundColor: Colors.primary,
      paddingTop: "15%",
      paddingBottom: "5%",
    },
    printadd: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
      justifyContent: "flex-end",
      marginRight: "5%",
    },
    printicon: {
      fontSize: 35,
      color: Colors.print,
    },
    plusicon: {
      fontSize: 30,
      color: Colors.print,
      marginTop: 4,
    },
    voucher: {
      marginLeft: 20,
      marginTop: 8,
      fontSize: 35,
      fontWeight: "600",
    },
    VouchersListMap: {
      backgroundColor: Colors.white,
      marginTop: 35,
    },
  });