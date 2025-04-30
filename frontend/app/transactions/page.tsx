"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionsTable } from "@/components/transactions/transactions-table";
import { AddTransactionDialog } from "@/components/transactions/add-transaction-dialog";
import { useAuth } from "@clerk/nextjs";

type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
};

export default function TransactionsPage() {
  const [data, setData] = useState<Transaction[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Partial<Transaction> | null>(null);

  const { userId } = useAuth();

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions?userid=${userId}`
        );
        const transactions = await response.json();
        setData((prevData) => {
          // Only update state if data has changed
          return JSON.stringify(prevData) !== JSON.stringify(transactions)
            ? transactions
            : prevData;
        });
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    }

    fetchTransactions();
  }, [userId]);

  const handleDelete = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/${id}/`, {
      method: "DELETE",
    });
    setData((prevData) =>
      prevData.filter((transaction) => transaction.id !== id)
    );
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingTransaction(null);
  };

  const handleDialogSubmit = async (
    updatedTransaction: Partial<Transaction>
  ) => {
    try {
      if (editingTransaction?.id) {
        // Update existing transaction
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/${editingTransaction.id}/`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTransaction),
          }
        );
        const updatedData = await response.json();
        setData(data.map((t) => (t.id === updatedData.id ? updatedData : t)));
      } else {
        // Add new transaction
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...updatedTransaction, userid: userId }), 
          }
        );
        const newTransaction = await response.json();
        setData((prev) => [...prev, newTransaction]);
      }
      handleDialogClose();
    } catch (error) {
      console.error("Failed to save transaction:", error);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </div>
      </div>
      <TransactionsTable
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AddTransactionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        transaction={editingTransaction}
        onSubmit={handleDialogSubmit}
      />
    </div>
  );
}