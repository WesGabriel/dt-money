import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransaction() {
    const response = await fetch("http://localhost:3000/transactions");
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
