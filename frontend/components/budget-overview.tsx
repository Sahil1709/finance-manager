"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@clerk/nextjs";

type Budget = {
  category: string;
  spent: number;
  total: number;
};

type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
};

export function BudgetOverview() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    async function fetchBudgets() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/budgets?userid=${userId}`);
        const data = await response.json();
        setBudgets(data);
      } catch (error) {
        console.error("Failed to fetch budgets:", error);
      }
    }

    fetchBudgets();
  }, [userId]);

  // Fetch transactions for the current user
  useEffect(() => {
    async function fetchTransactions() {
      if (!userId) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions?userid=${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    fetchTransactions();
  }, [userId]);

  // Compute the spent amount for each budget by summing amounts of expense transactions
  const budgetsWithSpent = budgets.map((budget) => {
    const spent = transactions
      .filter(
        (tx) =>
          tx.category.toLowerCase() === budget.category.toLowerCase() &&
          tx.type === "expense"
      )
      .reduce((acc: number, tx: any) => acc + tx.amount, 0);
    return { ...budget, spent };
  });


  return (
    <div className="space-y-4">
      {budgetsWithSpent.map((budget) => (
        <div key={budget.category} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{budget.category}</span>
            <span>
              ${budget.spent} / ${budget.amount}
            </span>
          </div>
          <Progress value={(budget.spent / budget.amount) * 100} className="h-2" />
        </div>
      ))}
    </div>
  );
}