import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TransactionDetailScreen from './screens/TransactionDetailScreen';
// import TransactionListScreen from './screens/TransactionListScreen';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionDetailScreen />
      <Toast />
    </QueryClientProvider>
  );
}
