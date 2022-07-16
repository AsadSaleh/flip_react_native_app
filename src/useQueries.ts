import { useQuery } from 'react-query';

export interface TransactionResponse {
  id: string;
  amount: number;
  unique_code: number;
  status: string;
  sender_bank: string;
  account_number: string;
  beneficiary_name: string;
  beneficiary_bank: string;
  remark: string;
  created_at: string;
  completed_at: string;
  fee: number;
}

export enum TransactionStatus {
  SUCCESS = 'success',
  PENDING = 'pending',
  FAILED = 'failed',
}

export interface Transaction {
  id: string;
  amount: number;
  unique_code: number;
  status: TransactionStatus;
  sender_bank: string;
  account_number: string;
  beneficiary_name: string;
  beneficiary_bank: string;
  remark: string;
  created_at: string;
  completed_at: string;
  fee: number;
}

export enum SortDirection {
  ASC = 'ascending',
  DESC = 'descending',
}

export enum SortBy {
  NAME,
  DATE,
}

export interface SortOption {
  by: SortBy;
  direction: SortDirection;
}

export type ApiResponse = { [key: string]: TransactionResponse };

const BASE_URL = 'https://recruitment-test.flip.id/frontend-test';

function convertToTransaction(trx: TransactionResponse): Transaction {
  const status = trx.status.toLocaleLowerCase().includes('success')
    ? TransactionStatus.SUCCESS
    : trx.status.toLowerCase().includes('pending')
    ? TransactionStatus.PENDING
    : TransactionStatus.FAILED;
  return {
    ...trx,
    status,
    // Fix the dates by replacing space with "T":
    created_at: trx.created_at.split(' ').join('T'),
    completed_at: trx.completed_at.split(' ').join('T'),
  };
}

async function getTransactions({
  search,
  sort,
}: {
  search?: string;
  sort?: SortOption;
}): Promise<Transaction[]> {
  try {
    const r = await fetch(`${BASE_URL}`);
    const r_1 = await (r.json() as Promise<ApiResponse>);
    let trxs = Object.values(r_1).map(convertToTransaction) ?? [];

    // Apply filter:
    if (search) {
      const testMatch = search.toLowerCase();
      trxs = trxs.filter(trx => {
        if (trx.beneficiary_name.toLowerCase().includes(testMatch)) {
          return true;
        }
        if (trx.beneficiary_bank.toLowerCase().includes(testMatch)) {
          return true;
        }
        if (trx.sender_bank.toLowerCase().includes(testMatch)) {
          return true;
        }
        if (trx.amount.toString().includes(testMatch)) {
          return true;
        }
        return false;
      });
    }

    // Apply sort:
    if (sort) {
      trxs = [...trxs];
      if (sort.by === SortBy.DATE) {
        trxs = trxs.sort((a, b) => {
          if (sort.direction === SortDirection.ASC) {
            return (
              new Date(a.completed_at).getTime() -
              new Date(b.completed_at).getTime()
            );
          }
          return (
            new Date(b.completed_at).getTime() -
            new Date(a.completed_at).getTime()
          );
        });
      } else {
        // sort.by === SortBy.NAME
        trxs = trxs.sort((a_1, b_1) => {
          if (sort.direction === SortDirection.ASC) {
            return a_1.beneficiary_name.localeCompare(b_1.beneficiary_name);
          }
          return b_1.beneficiary_name.localeCompare(a_1.beneficiary_name);
        });
      }
    }

    return trxs;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

// async function getTransactionById(id: string): Promise<Transaction> {
//   try {
//     const r = await fetch(`${BASE_URL}`);
//     const r_1 = await (r.json() as Promise<ApiResponse>);
//     console.log('ADA++? ', r_1);
//     console.log('id? ', id);
//     const rawTrx = r_1[id];
//     console.log('ADA--? ', rawTrx);
//     return convertToTransaction(rawTrx ?? {});
//   } catch (e) {
//     console.log(e);
//     throw e;
//   }
// }

export function useTransactions({
  search,
  sort,
}: {
  search?: string;
  sort?: SortOption;
}) {
  return useQuery<Transaction[], Error>(
    ['transaction', 'list', { search, sort }],
    () => getTransactions({ search, sort }),
  );
}

// export function useTransactionById(id: string) {
//   return useQuery<Transaction, Error>(['transactions', 'detail', id], () =>
//     getTransactionById(id),
//   );
// }
