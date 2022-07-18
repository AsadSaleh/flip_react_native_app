import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../theme/colors';
import humanize from '../utils/humanize';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Router';
import CopyIcon from '../components/CopyIcon';
import TrxDetailGridItem from '../components/TrxDetailGridItem';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'TransactionDetailScreen'
>;

export default function TransactionDetailScreen({ navigation, route }: Props) {
  const trx = route.params.trx;

  return (
    <SafeAreaView style={styles.flex1}>
      <View style={[styles.bgGrey, styles.flex1]}>
        <View style={styles.bgWhite}>
          <View style={styles.firstSection}>
            <Text style={styles.trxIdText}>ID TRANSAKSI: #{trx.id}</Text>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(trx.id);
                Toast.show({
                  type: 'success',
                  text1: `Transaction ID "${trx.id}" copied! ✅`,
                  position: 'bottom',
                });
              }}>
              <CopyIcon />
            </TouchableOpacity>
          </View>

          {/* Horizontal Line Softer */}
          <View style={styles.softHorizontalLine} />

          <View style={styles.secondSection}>
            <Text>DETAIL TRANSAKSI</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.closeText}>Tutup</Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal Line Bolder */}
          <View style={styles.boldHorizontalLine} />

          <View style={styles.p20}>
            <Text style={styles.bankText}>
              {humanize.bankName(trx.sender_bank)} <Text>&#8594;</Text>{' '}
              <Text>{humanize.bankName(trx.beneficiary_bank)}</Text>
            </Text>

            {/* kotak-kotak grid */}

            {/* Baris pertama */}
            <View style={styles.gridItemContainer}>
              <TrxDetailGridItem
                label={trx.beneficiary_name}
                value={trx.account_number}
                flex={3}
              />
              <TrxDetailGridItem
                label="NOMINAL"
                value={humanize.currency(trx.amount)}
                flex={2}
              />
            </View>

            {/* Baris kedua */}
            <View style={styles.gridItemContainer}>
              <TrxDetailGridItem
                label="BERITA TRANSFER"
                value={trx.remark}
                flex={3}
              />
              <TrxDetailGridItem
                label="KODE UNIK"
                value={trx.unique_code.toString()}
                flex={2}
              />
            </View>

            {/* Baris ketiga */}
            <View style={styles.gridItemContainer}>
              <TrxDetailGridItem
                label="WAKTU DIBUAT"
                value={humanize.date(trx.created_at)}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  bgGrey: {
    backgroundColor: Colors.gray,
  },
  bgWhite: {
    backgroundColor: Colors.white,
  },
  firstSection: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  trxIdText: { fontWeight: '500', marginRight: 10 },
  softHorizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  boldHorizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  closeText: { color: Colors.orange, fontWeight: '500' },
  secondSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  p20: {
    padding: 20,
  },
  bankText: { fontWeight: 'bold', fontSize: 16 },
  gridItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
