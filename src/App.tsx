import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TransactionDetailScreen from './screens/TransactionDetailScreen';
// import TransactionListScreen from './screens/TransactionListScreen';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionDetailScreen />
    </QueryClientProvider>
  );
}
