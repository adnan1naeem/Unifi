import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EmptyState from '../../Components/EmptyState'
import moment from 'moment'
import CustomText from '../../Components/CustomText'
import { Colors } from '../../Utils/Colors'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import LeftU from '../../Components/Icons/LeftU'
import Less from '../../Components/Icons/Less'
import Print from '../../Components/Icons/Print'
import { useNavigation } from '@react-navigation/native'

const Printer = ({ route }) => {
    const navigation = useNavigation();

    const [printerItems, setprinterItems] = useState(route?.params?.item?.items)
    const [selectedPrinter, setSelectedPrinter] = useState(null);

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
    const returnDays = (duration) => {
        let days;
        if (parseInt(duration) / 1440 <= 1) {
            days = `Valid for ${parseInt(duration) / 1440} day`
        } else {
            days = `Valid for ${parseInt(duration) / 1440} days`
        }
        return days;
    }

    const generatePrinterItemsHTML = (items) => {
        let itemsHTML = '';
        items.forEach((item) => {
            itemsHTML += `
                <div class="container">
                    <div class="main-container">
                         <div class="textline">${returnDays(item?.duration)}</div>
                          <div class="textbold">${formatItemCode(item?.code || "23434-44324")}</div>
                        <div class="text">Download Speed: ${item?.qos_rate_max_down || 0}</div>
                        <div class="text">Upload Speed: ${item?.qos_rate_max_up || 0}</div>
                        <div class="text">Byte Quota: ${item?.qos_usage_quota || 0}</div>
                    </div>
                </div>
            `;
        });
        return itemsHTML;
    };
    const contentToPrint = `
<!DOCTYPE html>
<html>
<head>
    <title>Dynamic HTML Structure</title>
    <style>
        @media print {
            body {
                width: 210mm;
                margin: 0;
                padding: 0;
            }
        }

        .parent-container {
            display: flex;
            flex-wrap: wrap;   
            margin: 0;
            padding: 0;
            gap: 0;
        }

        .container { 
            display: flex;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
        }
        .main-container{
             border: 2px dotted black; /* Dotted border */
             padding: 12px;
               width: 45mm;
        }
        .text {
            color: black;
            font-size: 10px;
            text-align: center
           
        }
        .textbold{
            color: black;
            font-size: 14px;
            font-weight: 800;
            text-align: center
        }
        .textline{
            text-decoration: underline;
            border-bottom: 1px solid black; 
            text-align: center;
            font-size: 14px;

        }
    </style>
</head>
<body>
    <div class="parent-container" id="contentArea">
      ${generatePrinterItemsHTML(printerItems)}
    </div>
         
           <script>
       
    </script>
</body>
</html>
`;
    const printPDF = async () => {
        const results = await RNHTMLtoPDF.convert({
            html: contentToPrint,
            fileName: 'test',
            base64: true,
        });
        await RNPrint.print({ filePath: results.filePath });
    };



    const renderVoucherItem = ({ item }) => (
        <View style={{ marginVertical: 5, marginHorizontal: 25, paddingVertical: 25, borderRadius: 10, borderWidth: 2, borderColor: Colors.black, borderStyle: 'dashed', alignItems: 'center', }}>
            <CustomText textStyle={{ color: Colors.black, }} title={returnDays(item?.duration)} />
            <CustomText textStyle={{ color: Colors.black, fontSize: 20, fontWeight: 'bold' }} title={formatItemCode(item?.code || "23434-44324")} />
            <CustomText textStyle={{ color: Colors.black, }} title={`Download Speed: ${item?.qos_rate_max_down || 0}`} />
            <CustomText textStyle={{ color: Colors.black, }} title={`Upload Speed: ${item?.qos_rate_max_up || 0}`} />
            <CustomText textStyle={{ color: Colors.black, }} title={`Byte Quota: ${item?.qos_usage_quota || 0}`} />
        </View>

    );
    const renderHeaderItem = ({ item }) => (

        <View style={{ marginVertical: 5, marginHorizontal: 5, paddingVertical: 25, borderRadius: 10, borderWidth: 2, borderColor: Colors.black, borderStyle: 'dashed', alignItems: 'center', }}>
            <CustomText textStyle={{ color: Colors.black, }} title={"dfvsdfvdf"} />
        </View>

    );


    const printHTML = async () => {
        await RNPrint.print({
            html: contentToPrint
        });
    };

    return (
        <View style={{ flex: 1, }}>
            <View style={{ backgroundColor: Colors.primary, flexDirection: 'row', justifyContent: 'space-betweene', alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingVertical: 10, paddingHorizontal: 20, justifyContent: 'space-between' }}>
                <TouchableOpacity>
                    <Less onPress={() => navigation.goBack()} IconStyle={{ fontSize: 25, color: Colors.white }} />
                </TouchableOpacity>
                <Print onPress={printPDF} IconStyle={{ fontSize: 25, color: Colors.white }} />
            </View>

            <FlatList
                data={printerItems || []}
                keyExtractor={(item) => item?.id}
                renderItem={renderVoucherItem}
                renderHeaderItem={renderHeaderItem}
                ListFooterComponent={<View style={{ height: 145 }} />}
                ListEmptyComponent={
                    <EmptyState title={"No content available at the moment."} />}
            />

        </View >

    )
}

export default Printer

const styles = StyleSheet.create({

})