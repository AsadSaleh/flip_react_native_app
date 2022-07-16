import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionDetailScreen from './screens/TransactionDetailScreen';
import TransactionListScreen from './screens/TransactionListScreen';
import type { Transaction } from './useQueries';

export type RootStackParamList = {
  TransactionListScreen: undefined;
  TransactionDetailScreen: { trx: Transaction };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TransactionListScreen">
        <Stack.Screen
          name="TransactionListScreen"
          component={TransactionListScreen}
        />
        <Stack.Screen
          name="TransactionDetailScreen"
          component={TransactionDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
