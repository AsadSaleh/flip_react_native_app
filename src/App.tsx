import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TransactionListScreen from './screens/TransactionListScreen';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionListScreen />
    </QueryClientProvider>
  );
}
