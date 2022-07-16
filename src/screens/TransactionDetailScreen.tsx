import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Colors from '../colors';
import humanize from '../utils';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Router';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'TransactionDetailScreen'
>;

export default function TransactionDetailScreen({ navigation, route }: Props) {
  const trx = route.params.trx;

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
              ID TRANSAKSI: #{trx.id}
            </Text>
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
              {humanize.bankName(trx.sender_bank)} <Text>&#8594;</Text>{' '}
              <Text>{humanize.bankName(trx.beneficiary_bank)}</Text>
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
                label={trx.beneficiary_name}
                value={trx.account_number}
                flex={3}
              />
              <GridItem
                label="NOMINAL"
                value={humanize.currency(trx.amount)}
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
              <GridItem label="BERITA TRANSFER" value={trx.remark} flex={3} />
              <GridItem
                label="KODE UNIK"
                value={trx.unique_code.toString()}
                flex={2}
              />
            </View>

            {/* Baris ketiga */}
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <GridItem
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
