import { Text, View, TouchableOpacity, Modal, FlatList, ScrollView, Platform, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../Utils/Colors";
import axios from 'axios'
import IncrementDecrement from "../../Components/IncrementDecrement";
import CustomText from "../../Components/CustomText";
import InputField from "../../Components/InputField";
import SwitchCase from "../../Components/SwitchCase";
import InputFieldNotes from "../../Components/InputFieldNotes";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { prefix_url } from "../../Utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./Styles";

const CreateVoucher = ({ navigation }) => {
  const [isLimitedSelected, setLimitedSelected] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [voucherAmount, setVoucherAmount] = useState(1);
  const [voucherUsage, setVoucherUsage] = useState(1);
  const [isBandWidthOn, setIsBandWidthOn] = useState(false);
  const [uploadValue, setUploadValue] = useState(2);
  const [downloadValue, setDownloadValue] = useState(0);
  const [byteQutaValue, setByteQutaValue] = useState(0);
  const [isByteOn, setIsByteOn] = useState(false);
  const [loading, setLoading] = useState(false)

  const [inputValue, setInputValue] = useState("");

  const handleSwitchChange = (value) => {
    setIsSwitchOn(value);
  };
  const handleBandwidthLimit = (value) => {
    setIsBandWidthOn(value);
  };
  const handleLimitedPress = (value) => {
    setLimitedSelected(value);
  };
  const handleBytePress = (value) => {
    setIsByteOn(value);
  };

  const handleUnlimitedPress = () => {
    setLimitedSelected(false);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [daysSelected, setDaysSelected] = useState();
  const [data, setData] = useState([
    { id: '1', title: '8 Hours', expire: 480 },
    { id: '2', title: '1 day', expire: 1440 },
    { id: '3', title: '2 days', expire: 2880 },
    { id: '4', title: '4 days', expire: 5760 },
    { id: '5', title: '7 days', expire: 10080 },
    { id: '6', title: '30 days', expire: 43200 },
  ]);

  const handleItemPress = (item) => {
    const updatedData = data?.map((value) =>
      value?.id === item?.id ? { ...value, selected: true } : { ...value, selected: false }
    );
    setDaysSelected(item);
    setData(updatedData);
    closeModal();
  };

  const createVoucherFun = async () => {
    try {
      setLoading(true);

      let data = {
        cmd: "create-voucher",
        n: voucherAmount,
        quota: isLimitedSelected ? voucherUsage : 0,
        expire: daysSelected?.expire,
        expire_number: 1,
        expire_unit: 1440,
        note: inputValue
      };

      if (downloadValue > 0) {
        data['down'] = parseInt(downloadValue);
      }
      if (uploadValue > 1) {
        data['up'] = parseInt(uploadValue);
      }
      if (byteQutaValue > 0) {
        data['bytes'] = parseInt(byteQutaValue);
      }

      const userUrl = await AsyncStorage.getItem("SITE_URL");
      let siteId = await AsyncStorage.getItem('SITE_ID');
      let config = {
        method: 'post',
        url: `${prefix_url}?url=${userUrl}/api/s/${siteId}/cmd/hotspot&method=post`,
        headers: {
          'Content-Type': 'application/json',
        },
        data
      };

      const response = await axios.request(config);

      console.log(JSON.stringify(response.data));
      navigation.goBack();
    } catch (error) {
      console.log(JSON.stringify(error, null, 2), "error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flexGrow: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.CreateVoucher}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CustomText title={"Cancel"} textStyle={styles.text1} />
          </TouchableOpacity>
          <Text style={[styles.text1, {
            fontSize: 18,
            fontWeight: "600",
          }]}>Create Vouchers</Text>
          {loading ?
            <ActivityIndicator size={'small'} color={Colors.white} /> :
            <TouchableOpacity onPress={createVoucherFun}>
              <Text style={styles.text1}>Create</Text>
            </TouchableOpacity>}
        </View>
        <View style={styles.Amount}>
          <IncrementDecrement Amount={"Amount"} setVoucherAmount={setVoucherAmount} />
          <View style={styles.usage}>
            <View style={styles.limited}>
              <TouchableOpacity
                style={[
                  styles.option,
                  isLimitedSelected ? styles.selected : null,
                ]}
                onPress={handleLimitedPress}
              >
                <Text
                  style={[
                    styles.optionText,
                    isLimitedSelected ? styles.whiteText : styles.blackText
                  ]}
                >
                  Limited use
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.option,
                  !isLimitedSelected ? styles.selected : null,
                ]}
                onPress={handleUnlimitedPress}
              >
                <Text
                  style={[
                    styles.optionText,
                    !isLimitedSelected ? styles.whiteText : styles.blackText,
                  ]}
                >
                  Unlimited use
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {isLimitedSelected && <IncrementDecrement Amount="Usage" setVoucherUsage={setVoucherUsage} />}
        <View style={styles.toggleButton}>
          <SwitchCase title="Limited Download Bandwidth" onValueChange={handleSwitchChange} textColor='black' />
          {isSwitchOn && <InputField text="Bandwidth Limit(kbps)" onChange={setDownloadValue} />}
        </View>

        <TouchableOpacity onPress={() => openModal()} style={styles.exprieModalContainer}>
          <Text style={{ color: Colors.black, fontSize: 17 }}>Expiration Time</Text>
          <Text style={{ color: Colors.light_Black, fontSize: 17 }}>{daysSelected?.title}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={closeModal}>
                <MaterialIcons name="keyboard-backspace" style={{ color: Colors.white, fontSize: 30 }} />
              </TouchableOpacity>
              <CustomText title={"Expiration Time"} style={{ paddingRight: 20, }} />
              <CustomText title={""} />
            </View>
            <View style={{ marginTop: 40 }} />
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleItemPress(item)}>
                  <View>
                    <View style={styles.ContainerFlatModal}>
                      <Text style={styles.item}>{item.title}</Text>
                      {item.selected && <Text style={styles.tickMark}>✔</Text>}
                    </View>

                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>

        <View style={styles.toggleButton}>
          <SwitchCase title="Limited Upload Bandwidth" onValueChange={handleBandwidthLimit} textColor='black' />
          {isBandWidthOn && <InputField text="Bandwidth Limit(kbps)" onChange={setUploadValue} />}
        </View>
        <View style={styles.toggleButton}>
          <SwitchCase title="Byte Quta" onValueChange={handleBytePress} textColor='black' />
          {isByteOn && <InputField text="Bandwidth Limit(kbps)" onChange={setByteQutaValue} />}
        </View>
        <View style={[styles.toggleButton, { marginBottom: 60 }]}>
          <InputFieldNotes text="Notes" onChange={setInputValue} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateVoucher;
