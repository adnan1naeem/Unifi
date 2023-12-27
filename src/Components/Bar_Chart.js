import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '../Utils/Colors'
import { BarChart } from "react-native-gifted-charts";

const Bar_Chart = ({ data, width_Container, spacing, initialSpacing }) => {
    return (
        <View style={{ width: width_Container, marginTop: 30 }}>
            <BarChart
                data={data}
                frontColor={Colors.primary}
                barBorderRadius={12}
                barMarginBottom={1}
                disablePress={true}
                isAnimated
                animationDuration={1000}
                dashWidth={0}
                key={'xyz'}
                initialSpacing={initialSpacing}
                spacing={spacing}
            />
        </View>

    )
}

export default Bar_Chart

const styles = StyleSheet.create({})