import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../colors';

export default function CopyIcon() {
  return (
    <View style={styles.container}>
      <View style={styles.frontSquare} />
      <View style={styles.backSquarae} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  frontSquare: {
    top: -3,
    right: -3,
    width: 12,
    height: 14,
    borderWidth: 1,
    borderColor: Colors.orange,
    borderRadius: 2,
    backgroundColor: Colors.white,
  },
  backSquarae: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 14,
    borderWidth: 1,
    borderColor: Colors.orange,
    borderRadius: 2,
    backgroundColor: Colors.white,
  },
});
