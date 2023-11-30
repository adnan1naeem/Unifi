import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Utils/Colors'
import CustomText from '../../Components/CustomText'
import { styles } from './Styles'


const Home = ({ navigation }) => {
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
            </View>
        </View>
    )
}

export default Home

