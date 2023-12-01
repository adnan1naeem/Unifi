import { Alert } from "react-native";

export const PostRequest = async ({ endpoint, body }) => {
    const url = endpoint;

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('POST request successful:', jsonResponse);
            Alert.alert('Success', 'POST request successful!');
        } else {
            console.error('POST request failed:', response.status);
            Alert.alert('Error', 'Failed to make POST request');
        }
    } catch (error) {
        console.error('Error making POST request:', error);
        Alert.alert('Error', 'Failed to make POST request');
    }
};