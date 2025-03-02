"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AddBudgetDialog } from "@/components/budgets/add-budget-dialog";
import { useAuth } from "@clerk/nextjs";

export default function BudgetsPage() {
  const { userId } = useAuth();
  const [budgets, setBudgets] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<any | null>(null);

  // Fetch budgets for the current user
  useEffect(() => {
    async function fetchBudgets() {
      if (!userId) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/budgets?userid=${userId}/`
        );
        if (!response.ok) throw new Error("Failed to fetch budgets");
        const data = await response.json();
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions?userid=${userId}/`
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

  const handleDelete = async (budgetId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/budgets/${budgetId}/`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete budget");
      setBudgets(budgets.filter((budget) => budget.id !== budgetId));
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  const handleEdit = (budget: any) => {
    setEditingBudget(budget);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingBudget(null);
  };

  const handleBudgetSaved = (budget: any) => {
    if (editingBudget) {
      // Update existing budget in state
      setBudgets(budgets.map((b) => (b.id === budget.id ? budget : b)));
    } else {
      // Append new budget to state
      setBudgets([...budgets, budget]);
    }
    handleDialogClose();
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Budget
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgetsWithSpent.length > 0 ? (
          budgetsWithSpent.map((budget) => (
            <Card key={budget.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {budget.category}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  ${budget.spent} / ${budget.amount}
                </span>
              </CardHeader>
              <CardContent>
                <Progress
                  value={(budget.spent / budget.amount) * 100}
                  className="h-2"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  {Math.round((budget.spent / budget.amount) * 100)}% of budget
                  used
                </p>
                <div className="flex space-x-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(budget)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(budget.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center">No budgets found.</div>
        )}
      </div>
      <AddBudgetDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        userId={userId ?? ""}
        budget={editingBudget || undefined}
        onBudgetSaved={handleBudgetSaved}
      />
    </div>
  );
}
