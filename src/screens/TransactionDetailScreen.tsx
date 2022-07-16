import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  // ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Colors from '../colors';
// import { useTransactionById } from '../useQueries';
import humanize from '../utils';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

export default function TransactionDetailScreen() {
  // const id = 'FT7089';
  // const trxQuery = useTransactionById(id);

  const mockData = {
    id: 'FT7089',
    amount: 3972350,
    unique_code: 292,
    status: 'SUCCESS',
    sender_bank: 'bni',
    account_number: '9383972402',
    beneficiary_name: 'Selin Dawe',
    beneficiary_bank: 'bri',
    remark: 'sample remark',
    created_at: '2022-07-16 09:56:06'.split(' ').join('T'),
    completed_at: '2022-07-16 09:56:06',
    fee: 0,
  };

  // if (trxQuery.isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: Colors.gray, flex: 1 }}>
        <View style={{ backgroundColor: Colors.white }}>
          <View
            style={{
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text style={{ fontWeight: '500', marginRight: 10 }}>
              ID TRANSAKSI: #{mockData.id}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(mockData.id);
                Toast.show({
                  type: 'success',
                  text1: `Transaction ID (${mockData.id}) copied! ✅`,
                  position: 'bottom',
                });
              }}>
              <CopyIcon />
            </TouchableOpacity>
          </View>

          {/* Horizontal Line Softer */}
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'rgba(0,0,0,0.04)',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <Text>DETAIL TRANSAKSI</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{ color: Colors.orange, fontWeight: '500' }}>
                Tutup
              </Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal Line Bolder */}
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}
          />

          <View style={{ padding: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {humanize.bankName(mockData.sender_bank)} <Text>&#8594;</Text>{' '}
              <Text>{humanize.bankName(mockData.beneficiary_bank)}</Text>
            </Text>

            {/* kotak-kotak grid */}

            {/* Baris pertama */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <GridItem
                label={mockData.beneficiary_name}
                value={mockData.account_number}
                flex={3}
              />
              <GridItem
                label="NOMINAL"
                value={humanize.currency(mockData.amount)}
                flex={2}
              />
            </View>

            {/* Baris kedua */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <GridItem
                label="BERITA TRANSFER"
                value={mockData.remark}
                flex={3}
              />
              <GridItem
                label="KODE UNIK"
                value={mockData.unique_code.toString()}
                flex={2}
              />
            </View>

            {/* Baris ketiga */}
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <GridItem
                label="WAKTU DIBUAT"
                value={humanize.date(mockData.created_at)}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function CopyIcon() {
  return (
    <View style={{ position: 'relative' }}>
      <View
        style={{
          top: -3,
          right: -3,
          width: 12,
          height: 14,
          borderWidth: 1,
          borderColor: Colors.orange,
          borderRadius: 2,
          backgroundColor: Colors.white,
        }}></View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 12,
          height: 14,
          borderWidth: 1,
          borderColor: Colors.orange,
          borderRadius: 2,
          backgroundColor: Colors.white,
        }}
      />
    </View>
  );
}

function GridItem({
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
      <Text style={{ fontWeight: '500', fontSize: 14 }}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}
