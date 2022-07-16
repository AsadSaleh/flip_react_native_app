import React, { useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDebounce } from 'use-debounce';
import Colors from '../colors';
import {
  SortBy,
  SortDirection,
  SortOption,
  Transaction,
  TransactionStatus,
  useTransactions,
} from '../useQueries';
import humanize from '../utils';

import type { RootStackParamList } from '../Router';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'TransactionListScreen'
>;

export default function TransactionListScreen({ navigation }: Props) {
  const [searchText, setSearchText] = useState('');
  const [currentSort, setCurrentSort] = useState<SortOption | undefined>();
  const [modalVisible, setModalVisible] = useState(false);

  const [debSearchText] = useDebounce(searchText, 600, { maxWait: 1200 });

  const trxs = useTransactions({ search: debSearchText, sort: currentSort });

  const renderItem: ListRenderItem<Transaction> = ({ item }) => {
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('TransactionDetailScreen', { trx: item })
        }
        style={{
          backgroundColor: Colors.white,
          borderRadius: 6,
          flexDirection: 'row',
        }}>
        {/* Left Border with Color */}
        <View
          style={{
            backgroundColor: accentColor,
            height: '100%',
            width: 5,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
          }}
        />
        {/* Main Content and Right Capsule */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingRight: 10,
            paddingVertical: 15,
          }}>
          {/* Main Content */}
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {humanize.bankName(item.sender_bank)} <Text>&#8594;</Text>{' '}
              <Text>{humanize.bankName(item.beneficiary_bank)}</Text>
            </Text>
            <Text style={{ fontSize: 14, marginTop: 2 }}>
              {item.beneficiary_name.toUpperCase()}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>{humanize.currency(item.amount)}&nbsp;</Text>
              <Text
                style={{
                  fontSize: 5,
                }}>
                &#x2B24;
                {/* juga bisa pake unicode &#x25cf; */}
              </Text>
              <Text style={{ color: Colors.grayShades[500] }}>
                &nbsp;
                {humanize.date(item.completed_at)}
              </Text>
            </View>
          </View>
          {/* Right Capsule */}
          <CapsuleStatus status={item.status} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent
        style={{ backgroundColor: Colors.orange }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.4)',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: Colors.white,
                paddingVertical: 30,
                paddingHorizontal: 20,
                borderRadius: 6,
                width: '80%',
                height: '50%',
                justifyContent: 'space-around',
              }}>
              <RadioButton
                onPress={() => {
                  setCurrentSort(undefined);
                  setModalVisible(v => !v);
                }}
                label="URUTKAN"
                selected={currentSort === undefined}
              />
              <RadioButton
                onPress={() => {
                  setCurrentSort({
                    by: SortBy.NAME,
                    direction: SortDirection.ASC,
                  });
                  setModalVisible(v => !v);
                }}
                label="Nama A - Z"
                selected={
                  currentSort?.by === SortBy.NAME &&
                  currentSort.direction === SortDirection.ASC
                }
              />
              <RadioButton
                onPress={() => {
                  setCurrentSort({
                    by: SortBy.NAME,
                    direction: SortDirection.DESC,
                  });
                  setModalVisible(v => !v);
                }}
                selected={
                  currentSort?.by === SortBy.NAME &&
                  currentSort.direction === SortDirection.DESC
                }
                label="Nama Z - A"
              />
              <RadioButton
                onPress={() => {
                  setCurrentSort({
                    by: SortBy.DATE,
                    direction: SortDirection.ASC,
                  });
                  setModalVisible(v => !v);
                }}
                selected={
                  currentSort?.by === SortBy.DATE &&
                  currentSort.direction === SortDirection.ASC
                }
                label="Tanggal Terbaru"
              />
              <RadioButton
                onPress={() => {
                  setCurrentSort({
                    by: SortBy.DATE,
                    direction: SortDirection.DESC,
                  });
                  setModalVisible(v => !v);
                }}
                selected={
                  currentSort?.by === SortBy.DATE &&
                  currentSort.direction === SortDirection.DESC
                }
                label="Tanggal Terlama"
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 4 }}
        style={{ backgroundColor: Colors.gray, flex: 1 }}
        data={trxs.data ?? []}
        renderItem={renderItem}
        ListHeaderComponent={
          <ListHeaderComponent
            onSortClick={() => setModalVisible(true)}
            onChangeText={v => setSearchText(v)}
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListFooterComponent={() => <View style={{ height: 8 }} />}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
}

interface RadioButtonProps {
  selected: boolean;
  label: string;
  onPress: () => void;
}
function RadioButton({ selected, label, onPress }: RadioButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* The Circle Button */}
        <View
          style={[
            {
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 3,
              borderColor: Colors.orange,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            },
          ]}>
          {selected ? (
            <View
              style={{
                height: 13,
                width: 13,
                borderRadius: 6,
                backgroundColor: Colors.orange,
              }}
            />
          ) : null}
        </View>
        {/* The label */}
        <Text>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

interface ListHeaderComponentProps {
  onSortClick: () => void;
  onChangeText: (v: string) => void;
}
function ListHeaderComponent({
  onChangeText,
  onSortClick,
}: ListHeaderComponentProps) {
  return (
    <View style={{ backgroundColor: Colors.gray, padding: 5 }}>
      <View
        style={{
          backgroundColor: Colors.white,
          paddingHorizontal: 10,
          borderRadius: 5,
          marginBottom: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TextInput
          style={{
            backgroundColor: Colors.white,
            flex: 1,
            paddingVertical: 20,
          }}
          onChangeText={onChangeText}
          placeholder="Cari nama, bank, atau nominal"
        />
        <TouchableOpacity onPress={onSortClick}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: Colors.orange, fontWeight: '500' }}>
              URUTKAN{' '}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CapsuleStatus({ status }: { status: TransactionStatus }) {
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
  if (status === TransactionStatus.PENDING) {
    // With border style, without background:
    return (
      <View
        style={{
          borderColor: accentColor,
          borderWidth: 1,
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 6,
        }}>
        <Text style={{ fontSize: 12, color: textColor, fontWeight: '500' }}>
          {statusMessage}
        </Text>
      </View>
    );
  }
  // With background, without border:
  return (
    <View
      style={{
        backgroundColor: accentColor,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 6,
      }}>
      <Text style={{ fontSize: 12, color: textColor, fontWeight: '500' }}>
        {statusMessage}
      </Text>
    </View>
  );
}
