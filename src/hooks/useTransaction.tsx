import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  value: number;
  category: string;
  type: string;
  createdAt: Date;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextProps {
  transactions: Transaction[];
  createTransaction: (data: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext({} as TransactionsContextProps);

const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const createTransaction = async (data: TransactionInput) => {
    try {
      const newTransaction = await api.post('/transactions', {
        ...data,
        createdAt: new Date(),
      });
      setTransactions((currentTransactions) => [
        ...currentTransactions,
        newTransaction.data.transaction,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    api
      .get('/transactions')
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

const useTransaction = () => {
  const context = useContext(TransactionsContext);
  return context;
};

export { TransactionsProvider, useTransaction };
