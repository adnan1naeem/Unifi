// import { StatusBar, View } from 'react-native';
// import React, { useEffect } from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import Navigation from './src/Navigation';
// import { Colors } from './src/Utils/Colors';
// import * as Updates from 'expo-updates'

// const App = () => {

//   useEffect(() => {
//     onFetchUpdateAsync()
//   }, [])

//   async function onFetchUpdateAsync() {
//     try {
//       const update = await Updates.checkForUpdateAsync()
//       if (update.isAvailable) {
//         await Updates.fetchUpdateAsync()
//         await Updates.reloadAsync()
//       }
//     } catch (e) {
//     }
//   }

//   return (
//     <SafeAreaProvider>

//       <StatusBar
//         backgroundColor={Colors.primary}
//         barStyle="light-content"
//       />
//       <Navigation />
//     </SafeAreaProvider>
//   )
// }

// export default App

import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})


// import React, { useEffect, useState } from 'react';
// import { View, Button, Alert } from 'react-native';
// import { CardField, useStripe } from '@stripe/stripe-react-native';

// const PaymentScreen = () => {
//   const { confirmPayment } = useStripe();
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [stripeInitialized, setStripeInitialized] = useState(false);
//   const [cardDetails, setCardDetails] = useState(null);

//   useEffect(() => {
//     initializeStripe();
//   }, []);

//   const initializeStripe = async () => {
//     try {
//       // Initialize Stripe here if required
//       setStripeInitialized(true);
//     } catch (error) {
//       console.log('Error initializing Stripe:', error);
//     }
//   };

//   const handlePayment = async () => {
//     if (!stripeInitialized || !cardDetails) {
//       Alert.alert('Error', 'Please enter card details.');
//       return;
//     }

//     setPaymentLoading(true);
//     try {
//       const { paymentIntent, error } = await confirmPayment({
//         paymentMethod: {
//           type: 'Card',
//           card: cardDetails, // Pass the card details here
//         },
//       });

//       if (error) {
//         Alert.alert('Payment failed', error.message);
//       } else if (paymentIntent) {
//         Alert.alert('Payment Successful', 'Thank you for your payment');
//       }
//     } catch (error) {
//       console.log('Error processing payment:', error);
//       Alert.alert('Error', 'An error occurred while processing your payment');
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   return (
//     <View style={{ backgroundColor: 'red', flex: 1, paddingTop: 120 }}>
//       <CardField
//         postalCodeEnabled={true}
//         placeholder={{
//           number: '4242 4242 4242 4242',
//         }}
//         cardStyle={{
//           backgroundColor: '#FFFFFF',
//           textColor: '#000000',
//         }}
//         style={{
//           width: '100%',
//           height: 50,
//           marginVertical: 30,
//         }}
//         onCardChange={(cardDetails) => {
//           console.log('cardDetails', cardDetails);
//           setCardDetails(cardDetails);
//         }}
//         onFocus={(focusedField) => {
//           console.log('focusField', focusedField);
//         }}
//       />
//       <Button title="Pay" onPress={handlePayment} disabled={paymentLoading} />
//     </View>
//   );
// };

// export default PaymentScreen;


// import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { CardField, createToken, initStripe, confirmPayment, PaymentMethod } from '@stripe/stripe-react-native';

// const App = () => {
//   const [cardinfo, setCardinfo] = useState(null);
//   const [stripeInitialized, setStripeInitialized] = useState(false);

//   useEffect(() => {
//     initializeStripe();
//   }, []);

//   const initializeStripe = async () => {
//     try {
//       await initStripe({
//         publishableKey: 'pk_test_51OK3eKBKHpS5mcYa6gT5a35ldvQkR3MXL6g0GaUAjkpy9I53rIwUIjjei5ZZOa1wIU04NDkFJJkW1mpDIn3hYQXv00xnGglmVa',
//       });
//       setStripeInitialized(true);
//     } catch (error) {
//       console.log('Error initializing Stripe:', error);
//     }
//   };

//   const getToken = async () => {
//     try {
//       const paymentIntentClientSecret = "pi_3OKJVFBKHpS5mcYa04B9mb2Q_secret_soDNbmey81n0VTzClNoqIkjBX";
//       const result = await confirmPayment(paymentIntentClientSecret, { paymentMethodType: 'Card' });
//       console.log('Payment confirmed:', result);
//       alert('Payment confirmed successfully!');
//     } catch (error) {
//       console.error('Error confirming payment:', error);
//       alert('Payment confirmation failed. Please try again.');
//     }
//   };

//   const fetchCard = (cardDetails) => {
//     if (cardDetails?.complete) {
//       setCardinfo(cardDetails)
//     } else {
//       setCardinfo(null)
//     }
//   }

//   return (
//     <SafeAreaView style={{ marginTop: 60, paddingHorizontal: 30, backgroundColor: 'red', flex: 1 }} >
//       <CardField
//         postalCodeEnabled={true}
//         placeholder={{
//           number: '4242 4242 4242 4242',
//         }}
//         cardStyle={{
//           backgroundColor: '#FFFFFF',
//           textColor: '#000000',
//         }}
//         style={{
//           width: '100%',
//           height: 50,
//           marginVertical: 30,
//         }}
//         onCardChange={(cardDetails) => {
//           console.log('cardDetails', cardDetails);
//           fetchCard(cardDetails);
//         }}
//         onFocus={(focusedField) => {
//           console.log('focusField', focusedField);
//         }}
//       />
//       <TouchableOpacity onPress={getToken} style={{ backgroundColor: 'green', paddingVertical: 10, borderRadius: 10 }}>
//         <Text style={{ textAlign: 'center', color: 'white' }}>Get token</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   )
// }

// export default App
