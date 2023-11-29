import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import React from "react";
import { Colors } from "../Utils/Colors";
import Swipeout from "react-native-swipeout";


const VouchersList = ({ validFor, code, usage, createdAt, note }) => {
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
    
    return (
        <Swipeout right={swipeBtns} autoClose={true} backgroundColor="transparent">
        <TouchableHighlight
          underlayColor="rgba(192,192,192,1,0.6)"     
        >
        
          <View style={styles.VouchersList}>
            <Text style={styles.text1}>{validFor}</Text>
            <Text style={styles.text2}>{code}</Text>
            <Text style={styles.text3}>{usage}</Text>
            <Text style={styles.text4}>{createdAt}</Text>
            <Text style={styles.text5}>{note}</Text>
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  };
  

export default VouchersList;

const styles = StyleSheet.create({
    VouchersList:{
        display: 'flex',
        flexDirection:'column',
        alignItems:'center',                 
        paddingTop: 40,
        borderBottomColor: "#bfbfbf", 
        borderBottomWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        paddingBottom:13
    },
    text1:{
        color: Colors.vouchers,
        fontSize:14,
        fontWeight:'400'
    },
    text2:{
        fontSize: 30,
        fontWeight:'500'
    },
    text3:{
        color: Colors.vouchers,
        fontSize:14,
        fontWeight:'400'
    },
    text4:{
        color: Colors.vouchers,
        fontSize:13,
      

    },
    text5:{
        color: Colors.vouchers,
        marginTop:10,
        fontSize:12,
       
    }
});
