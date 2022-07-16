import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../colors';

interface TrxListHeaderProps {
  onSortClick: () => void;
  onChangeText: (v: string) => void;
}

export default function TrxListHeader({
  onChangeText,
  onSortClick,
}: TrxListHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          placeholder="Cari nama, bank, atau nominal"
        />
        <TouchableOpacity onPress={onSortClick}>
          <View style={styles.directionRow}>
            <Text style={[styles.colorOrange, styles.fontWeight500]}>
              URUTKAN{' '}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.gray, padding: 5 },
  innerContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  directionRow: {
    flexDirection: 'row',
  },
  colorOrange: {
    color: Colors.orange,
  },
  fontWeight500: {
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingVertical: 20,
  },
});
