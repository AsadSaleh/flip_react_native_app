import React from 'react';
import { Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import Colors from '../theme/colors';
import { SortBy, SortDirection, SortOption } from '../api/useTransactions';
import RadioButton from './RadioButton';

interface TrxFilterModalProps {
  show: boolean;
  closeModal: () => void;
  currentSort?: SortOption;
  setCurrentSort: (v: SortOption | undefined) => void;
}
export default function TrxFilterModal({
  show,
  closeModal,
  currentSort,
  setCurrentSort,
}: TrxFilterModalProps) {
  return (
    <Modal
      animationType="slide"
      visible={show}
      transparent
      onRequestClose={() => {
        closeModal();
      }}>
      <SafeAreaView style={styles.flex1}>
        <View style={styles.modalOuter}>
          <View style={styles.modalInner}>
            <RadioButton
              label="URUTKAN"
              selected={currentSort === undefined}
              onPress={() => {
                setCurrentSort(undefined);
                closeModal();
              }}
            />
            <RadioButton
              label="Nama A - Z"
              selected={
                currentSort?.by === SortBy.NAME &&
                currentSort.direction === SortDirection.ASC
              }
              onPress={() => {
                setCurrentSort({
                  by: SortBy.NAME,
                  direction: SortDirection.ASC,
                });
                closeModal();
              }}
            />
            <RadioButton
              label="Nama Z - A"
              selected={
                currentSort?.by === SortBy.NAME &&
                currentSort.direction === SortDirection.DESC
              }
              onPress={() => {
                setCurrentSort({
                  by: SortBy.NAME,
                  direction: SortDirection.DESC,
                });
                closeModal();
              }}
            />
            <RadioButton
              label="Tanggal Terbaru"
              selected={
                currentSort?.by === SortBy.DATE &&
                currentSort.direction === SortDirection.ASC
              }
              onPress={() => {
                setCurrentSort({
                  by: SortBy.DATE,
                  direction: SortDirection.ASC,
                });
                closeModal();
              }}
            />
            <RadioButton
              label="Tanggal Terlama"
              selected={
                currentSort?.by === SortBy.DATE &&
                currentSort.direction === SortDirection.DESC
              }
              onPress={() => {
                setCurrentSort({
                  by: SortBy.DATE,
                  direction: SortDirection.DESC,
                });
                closeModal();
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOuter: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    backgroundColor: Colors.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: '80%',
    height: '50%',
    justifyContent: 'space-around',
  },
  flex1: {
    flex: 1,
  },
});
