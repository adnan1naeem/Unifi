import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Utils/Colors'
import CustomText from '../../Components/CustomText'
import { styles } from './Styles'
import { BarChart } from "react-native-gifted-charts";




const Home = ({ navigation }) => {
    const data = [{ value: 40 }, { value: 160 }, { value: 180 }, { value: 170 }, { value: 140 }]
    const customLabels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];

    return (
        <View>
            <View style={styles.HeaderContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <CustomText title={"Log Out"} textStyle={styles.logout} />
                </TouchableOpacity>
                <CustomText title={"HOME"} textStyle={styles.HeaderTitle} />
            </View>
            <View style={styles.containerView}>
                <CustomText title={"Welcome, admin, to"} textStyle={{ color: Colors.textcolor }} />
                <CustomText title={"FRG UniFi Network"} textStyle={styles.mainContainer} />
                <CustomText title={"7.3.83"} textStyle={{ color: Colors.heading }} />

                <View style={{ width: '90%', }}>
                    <BarChart
                        textShiftX={['1', '2']}
                        data={data}
                        frontColor={Colors.primary}
                        barBorderRadius={12}
                        barMarginBottom={5}
                        isAnimated
                        animationDuration={1000}
                        secondaryData={data}
                        maxValue={230}
                        autoShiftLabels={true}
                        disablePress={true}
                        label={'qewqwdfqc'}
                        showXAxisIndex={true}
                        dashWidth={0}
                        key={'xyz'}
                        xAxisLabels={customLabels}
                    />
                </View>



            </View>
        </View>
    )
}

export default Home

