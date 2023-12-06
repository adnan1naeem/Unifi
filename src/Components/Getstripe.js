import { CardField, useStripe } from '@stripe/stripe-react-native';


let stripePromise;
const getStripe = () => {
    const { confirmPayment } = useStripe();
    if (!stripePromise) {
        stripePromise = loadStripe(
            "pk_test_51O7fHtDVGeSuUbZZo6K3OlSGWrGslFYx6pSUT2JIojG3CMdzmJA3xEKCMNHVKTwjrYBEoG9mU01VBWNbHWy0iuJq00L444d4XQ"
        );
    }
    return stripePromise;
};

export default getStripe;




// const handlePayment = async () => {
//   try {
//     const { paymentIntent, error } = await confirmPayment('pk_test_51OK3eKBKHpS5mcYa6gT5a35ldvQkR3MXL6g0GaUAjkpy9I53rIwUIjjei5ZZOa1wIU04NDkFJJkW1mpDIn3hYQXv00xnGglmVa', {
//       paymentMethodType: 'Card',
//       billingDetails: {
//         name: 'John Doe',
//       },
//       card: cardDetails,
//     });

//     if (error) {
//       Alert.alert('Payment failed', error.message);
//     } else if (paymentIntent) {
//       Alert.alert('Payment Successful', 'Thank you for your payment');
//      }
//   } catch (error) {
//     console.log('Error processing payment:', error);
//     Alert.alert('Error', 'An error occurred while processing your payment');
//   }
// };
