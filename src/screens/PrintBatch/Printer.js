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

const Printer = ({ navigation, route }) => {
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
            justify-content: flex-start;
            margin: 0;
            padding: 0;
            gap: 0;
        }

        .container {
            width: 58mm; /* Adjust the width of the card */
            margin-bottom: 20px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
        }
        .main-container{
             border: 2px dotted black; /* Dotted border */
             padding: 10px;
               width: 34mm;
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
    </div>

    <script>
        function generateContainerHTML(itemCode) {
            return \`
                <div class="container">
                    <div class="main-container">
                    <div class="textline">Valid for 30 days</div>
                    <div class="textbold">\${itemCode}</div>
                    <div class="text">Download Speed:</div>
                    <div class="text">Upload Speed:</div>
                    <div class="text">Byte Quota:</div>
                    </div>
                </div>
            \`;
        }

        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13,14,15,16,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13,14,15,16]; // Example array data
        const parentContainerWidth = 210;
        const numberOfContainersInRow = 4;

        const containerWidth = parentContainerWidth / numberOfContainersInRow;

        const contentArea = document.getElementById('contentArea');
        for (let i = 0; i < array.length; i++) {
            const itemCode = array[i];
            const containerHTML = generateContainerHTML(itemCode);

            contentArea.insertAdjacentHTML('beforeend', \`<div class="container" style="width: \${containerWidth}mm">\${containerHTML}</div>\`);

            if ((i + 1) % numberOfContainersInRow === 0) {
                contentArea.insertAdjacentHTML('beforeend', '<br>'); // Start the next row
            }
        }
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
            <CustomText textStyle={{ color: Colors.black, }} title={"Valid for 30 days"} />
            <CustomText textStyle={{ color: Colors.black, fontSize: 20, fontWeight: 'bold' }} title={formatItemCode(item?.code || "23434-44324")} />
            <CustomText textStyle={{ color: Colors.black, }} title={'Download Speed:'} />
            <CustomText textStyle={{ color: Colors.black, }} title={"Upload Speed:"} />
            <CustomText textStyle={{ color: Colors.black, }} title={"Byte Quota:"} />
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Less IconStyle={{ fontSize: 25, color: Colors.white }} />
                </TouchableOpacity>
                <Print onPress={printPDF} IconStyle={{ fontSize: 25, color: Colors.white }} />
            </View>

            <FlatList
                data={printerItems || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
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