"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

const categories = [
  { value: "food", label: "Food & Dining" },
  { value: "transportation", label: "Transportation" },
  { value: "utilities", label: "Utilities" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
];

type Budget = {
  id?: string;
  category: string;
  amount: number;
  period: string;
  userid?: string;
};

export function AddBudgetDialog({
  open,
  onOpenChange,
  userId,
  budget,
  onBudgetSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  budget?: Budget;
  onBudgetSaved: (budget: Budget) => void;
}) {
  const form = useForm<Budget>({
    defaultValues: budget || {
      category: "",
      amount: 0,
      period: "monthly",
    },
  });

  // Reset form whenever budget changes (for editing)
  useEffect(() => {
    form.reset(budget || { category: "", amount: 0, period: "monthly" });
  }, [budget, form]);

  function onSubmit(values: Budget) {
    // Append the userId to the values
    const payload = { ...values, userid: userId };

    if (budget && budget.id) {
      // Update budget via PUT
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/budgets/${budget.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to update budget");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Budget updated:", data);
          onBudgetSaved(data);
        })
        .catch((error) => {
          console.error("Error updating budget:", error);
        });
    } else {
      // Add new budget via POST
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/budgets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to add budget");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Budget added:", data);
          onBudgetSaved(data);
        })
        .catch((error) => {
          console.error("Error adding budget:", error);
        });
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{budget ? "Edit Budget" : "Add Budget"}</DialogTitle>
          <DialogDescription>
            {budget
              ? "Update your budget details."
              : "Set a new budget for a category."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Period</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{budget ? "Update Budget" : "Add Budget"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
