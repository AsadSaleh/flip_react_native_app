import React, { useCallback, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { useDebounce } from 'use-debounce';
import Colors from '../colors';
import {
  SortOption,
  Transaction,
  useTransactions,
} from '../api/useTransactions';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import TransactionListItem from '../components/TransactionListItem';
import TrxFilterModal from '../components/TrxFilterModal';
import TrxListHeader from '../components/TrxListHeader';
import type { RootStackParamList } from '../Router';

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

  const renderItem: ListRenderItem<Transaction> = useCallback(
    ({ item }) => {
      return (
        <TransactionListItem
          item={item}
          onPress={() =>
            navigation.navigate('TransactionDetailScreen', { trx: item })
          }
        />
      );
    },
    [navigation],
  );

  const keyExtractor = useCallback<(trx: Transaction) => string>(
    item => item.id,
    [],
  );

  return (
    <SafeAreaView style={styles.flex1}>
      <TrxFilterModal
        show={modalVisible}
        closeModal={() => setModalVisible(false)}
        setCurrentSort={v => setCurrentSort(v)}
        currentSort={currentSort}
      />
      <FlatList
        data={trxs.data ?? []}
        refreshing={trxs.isRefetching}
        onRefresh={trxs.refetch}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.ph4}
        style={[styles.bgGrey, styles.flex1]}
        ListHeaderComponent={
          <TrxListHeader
            onSortClick={() => setModalVisible(true)}
            onChangeText={v => setSearchText(v)}
            currentSort={currentSort}
          />
        }
        ItemSeparatorComponent={() => <View style={styles.h8} />}
        ListFooterComponent={() => <View style={styles.h8} />}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  h8: {
    height: 8,
  },
  bgGrey: {
    backgroundColor: Colors.gray,
  },
  bgWhite: {
    backgroundColor: Colors.white,
  },
  ph4: { paddingHorizontal: 4 },
});
