import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EmptyState from '../../Components/EmptyState'
import CustomText from '../../Components/CustomText'
import { Colors } from '../../Utils/Colors'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import Less from '../../Components/Icons/Less'
import Print from '../../Components/Icons/Print'
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Printer = ({ route }) => {
    const navigation = useNavigation();
    const [printerItems, setprinterItems] = useState(route?.params?.item?.items);
    const [siteName, setSiteName] = useState('');

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

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handlePrint = () => {
        console.log("Print action");
        toggleModal();
        setTimeout(() => {
            printPDF()
        }, 500);
    };

    const handleImportCSV = () => {
        toggleModal();
        setTimeout(() => {
            shareCSVFile(printerItems);
        }, 500);
    };

    const shareCSVFile = async (voucherList) => {
        try {
            const headers = Object.keys(voucherList[0])?.join(',');
            const csvData = [headers].concat(
                voucherList?.map((item) => Object.values(item).map((value) => `"${value}"`).join(','))
            ).join('\n');

            const csvFilePath = RNFS.CachesDirectoryPath + '/data.csv';
            await RNFS.writeFile(csvFilePath, csvData, 'utf8');

            await Share.open({
                url: 'file://' + csvFilePath,
                type: 'text/csv',
                filename: 'data.csv',
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        (async () => {
            let name = await AsyncStorage.getItem('SITE');
            setSiteName(name);
        })();
    }, [])
    return (
        <View style={{ flex: 1, }}>
            <View style={{ backgroundColor: Colors.primary, flexDirection: 'row', justifyContent: 'space-betweene', alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingVertical: 10, paddingHorizontal: 20, justifyContent: 'space-between' }}>
                <TouchableOpacity>
                    <Less onPress={() => navigation.goBack()} IconStyle={{ fontSize: 25, color: Colors.white }} />
                </TouchableOpacity>
                <CustomText numberOfLines={1} title={siteName} textStyle={styles.siteTitle} />
                <Print onPress={toggleModal} IconStyle={{ fontSize: 25, color: Colors.white }} />
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
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalOption} onPress={handlePrint}>
                        <Text style={styles.printText}>Print</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalOption} onPress={handleImportCSV}>
                        <Text style={styles.printText}>Import CSV</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </View >

    )
}

export default Printer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalOption: {
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    printText: {
        fontSize: 16,
        color: Colors.black
    },
    siteTitle: {
        paddingTop: 5,
        width: 130,
        fontWeight: 'bold',
        fontSize: 24,
        color: Colors.white,
        paddingLeft: 20
    },
})