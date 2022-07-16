import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TrxDetailGridItem({
  label,
  value,
  flex = 1,
}: {
  label: string;
  value: string;
  flex?: number;
}) {
  return (
    <View style={{ flex }}>
      <Text style={styles.labelText}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  labelText: {
    fontWeight: '500',
    fontSize: 14,
  },
});
