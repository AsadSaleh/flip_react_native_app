import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../theme/colors';
import { SortBy, SortDirection, SortOption } from '../api/useTransactions';

interface TrxListHeaderProps {
  onSortClick: () => void;
  onChangeText: (v: string) => void;
  currentSort?: SortOption;
}

export default function TrxListHeader({
  onChangeText,
  onSortClick,
  currentSort,
}: TrxListHeaderProps) {
  const text = fromSortOptionToText(currentSort);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.magnifyingGlass}>&#x1F50D;</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          placeholder="Cari nama, bank, atau nominal"
        />
        <TouchableOpacity onPress={onSortClick}>
          <View style={styles.directionRow}>
            <Text style={[styles.colorOrange, styles.fontWeight500]}>
              {text}
            </Text>
            <Text style={styles.chevronDown}>&#8964;</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chevronDown: {
    color: Colors.orange,
    fontSize: 30,
    top: -10,
    marginLeft: 4,
  },
  magnifyingGlass: { marginRight: 6 },
  container: { backgroundColor: Colors.gray, padding: 5 },
  innerContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

function fromSortOptionToText(input?: SortOption): string {
  let text = '';

  if (input === undefined) {
    text = 'URUTKAN';
  } else if (
    input.by === SortBy.NAME &&
    input.direction === SortDirection.ASC
  ) {
    text = 'Nama A - Z';
  } else if (
    input.by === SortBy.NAME &&
    input.direction === SortDirection.DESC
  ) {
    text = 'Nama Z - A';
  } else if (
    input.by === SortBy.DATE &&
    input.direction === SortDirection.ASC
  ) {
    text = 'Tanggal Terbaru';
  } else if (
    input.by === SortBy.DATE &&
    input.direction === SortDirection.DESC
  ) {
    text = 'Tanggal Terlama';
  }

  return text;
}
