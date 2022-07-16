import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../colors';

interface RadioButtonProps {
  selected: boolean;
  label: string;
  onPress: () => void;
}

export default function RadioButton({
  selected,
  label,
  onPress,
}: RadioButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {/* The Circle Button */}
        <View style={[styles.outerRing, { borderColor: Colors.orange }]}>
          {selected ? (
            <View
              style={[
                styles.innerRing,
                {
                  backgroundColor: Colors.orange,
                },
              ]}
            />
          ) : null}
        </View>
        {/* The label */}
        <Text>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerRing: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 3,
    // borderColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  innerRing: {
    height: 13,
    width: 13,
    borderRadius: 6,
    // backgroundColor: Colors.orange,
  },
});
