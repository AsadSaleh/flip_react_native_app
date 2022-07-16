import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../colors';
import { TransactionStatus } from '../useQueries';

export default function StatusCapsule({
  status,
}: {
  status: TransactionStatus;
}) {
  let accentColor: string;
  let statusMessage: string;
  let textColor: string;
  switch (status) {
    case TransactionStatus.SUCCESS:
      accentColor = Colors.green;
      statusMessage = 'Berhasil';
      textColor = Colors.white;
      break;
    case TransactionStatus.FAILED:
      accentColor = Colors.red;
      statusMessage = 'Gagal';
      textColor = Colors.white;
      break;
    default:
    case TransactionStatus.PENDING:
      accentColor = Colors.orange;
      statusMessage = 'Pengecekan';
      textColor = Colors.black;
      break;
  }
  const statusComponent = (
    <Text style={[styles.text, { color: textColor }]}>{statusMessage}</Text>
  );
  if (status === TransactionStatus.PENDING) {
    // With border style, without background:
    return (
      <View
        style={[
          styles.container,
          styles.withBorder,
          {
            borderColor: accentColor,
          },
        ]}>
        {statusComponent}
      </View>
    );
  }
  // With background, without border:
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: accentColor,
        },
      ]}>
      {statusComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  withBorder: {
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});
