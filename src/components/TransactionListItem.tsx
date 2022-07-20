import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../theme/colors';
import { Transaction, TransactionStatus } from '../api/useTransactions';
import humanize from '../utils/humanize';
import StatusCapsule from './StatusCapsule';

interface TransactionListItemProps {
  item: Transaction;
  onPress: () => void;
}
export default function TransactionListItem({
  item,
  onPress,
}: TransactionListItemProps) {
  let accentColor: string;
  switch (item.status) {
    case TransactionStatus.SUCCESS:
      accentColor = Colors.green;
      break;
    case TransactionStatus.FAILED:
      accentColor = Colors.red;
      break;
    default:
    case TransactionStatus.PENDING:
      accentColor = Colors.orange;
      break;
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* Left Border with Color */}
      <View
        style={[styles.leftBorderWithColor, { backgroundColor: accentColor }]}
      />
      {/* Main Content and Right Capsule */}
      <View style={styles.mainContentContainer}>
        {/* Main Content */}
        <View>
          <Text style={styles.bankText}>
            {humanize.bankName(item.sender_bank)} <Text>&#8594;</Text>{' '}
            <Text>{humanize.bankName(item.beneficiary_bank)}</Text>
          </Text>
          <Text style={styles.beneficaryText}>
            {item.beneficiary_name.toUpperCase()}
          </Text>
          <View style={styles.priceAndDateContainer}>
            <Text>{humanize.currency(item.amount)}&nbsp;</Text>
            <Text style={styles.dot}>
              &#x2B24;
              {/* juga bisa pake unicode &#x25cf; */}
            </Text>
            <Text style={{ color: Colors.grayShades[500] }}>
              &nbsp;
              {humanize.date(item.created_at)}
            </Text>
          </View>
        </View>
        {/* Right Capsule */}
        <StatusCapsule status={item.status} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 6,
    flexDirection: 'row',
  },
  leftBorderWithColor: {
    height: '100%',
    width: 5,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  mainContentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 15,
  },
  beneficaryText: { fontSize: 14, marginTop: 2 },
  bankText: { fontWeight: 'bold', fontSize: 16 },
  priceAndDateContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    fontSize: 5,
  },
});
