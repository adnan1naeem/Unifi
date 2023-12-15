import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../Utils/Colors'
import { BarChart } from "react-native-gifted-charts";
import CustomText from './CustomText';

const Bar_Chart = ({ data, customLabels, width_Container, X_Axis_Container, axis, spacing, initialSpacing }) => {
    return (
        <View style={{ width: width_Container, marginTop: 30 }}>
            <BarChart
                data={data}
                frontColor={Colors.primary}
                barBorderRadius={12}
                barMarginBottom={5}
                isAnimated
                animationDuration={1000}
                disablePress={true}
                dashWidth={0}
                key={'xyz'}
                initialSpacing={initialSpacing}
                spacing={spacing}
            />
            <View style={X_Axis_Container}>
                <FlatList
                    data={data}
                    contentContainerStyle={{}}
                    horizontal
                    renderItem={({ item }) =>
                        <View style={{ paddingRight: 27 }}>
                            <CustomText title={item?.date} textStyle={axis ? axis : { color: Colors.black, paddingLeft: item?.id === 1 ? 17 : 1, }} />
                        </View>
                    }
                    keyExtractor={item => item?.id?.toString()}
                />
            </View>

        </View>

    )
}

export default Bar_Chart

const styles = StyleSheet.create({})