import { StyleSheet, Switch, View } from 'react-native';
import React, { useState } from 'react';
import CustomText from './CustomText';
import { Colors } from '../Utils/Colors';

const SwitchCase = ({ title, onValueChange ,textColor}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => {
      const newState = !previousState;
      onValueChange(newState); // Notify the parent component of the state change
      return newState;
    });
  };

  return (
    <View style={{ backgroundColor: Colors.white, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', paddingVertical: 10 }}>
      <CustomText textStyle={{  color: textColor || Colors.heading  }} title={title} />
      <Switch
        trackColor={{ false: Colors.primary, true: Colors.primary }}
        thumbColor={isEnabled ? Colors.white : Colors.white}
        ios_backgroundColor={Colors.white}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default SwitchCase;

const styles = StyleSheet.create({});
