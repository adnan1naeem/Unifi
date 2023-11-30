import { Dimensions, Platform } from "react-native";

export const Width = Dimensions.get('screen').width
export const height = Dimensions.get('screen').height

export const Android = Platform.OS === 'android'