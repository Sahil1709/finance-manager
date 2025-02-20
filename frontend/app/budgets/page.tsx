"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AddBudgetDialog } from "@/components/budgets/add-budget-dialog"
import { useState } from "react"

const budgets = [
  {
    category: "Food & Dining",
    spent: 450,
    total: 600,
    color: "bg-blue-500",
  },
  {
    category: "Transportation",
    spent: 200,
    total: 300,
    color: "bg-green-500",
  },
  {
    category: "Entertainment",
    spent: 150,
    total: 200,
    color: "bg-purple-500",
  },
  {
    category: "Shopping",
    spent: 300,
    total: 400,
    color: "bg-yellow-500",
  },
  {
    category: "Utilities",
    spent: 180,
    total: 250,
    color: "bg-red-500",
  },
]

export default function BudgetsPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Budget
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => (
          <Card key={budget.category}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{budget.category}</CardTitle>
              <span className="text-sm text-muted-foreground">
                ${budget.spent} / ${budget.total}
              </span>
            </CardHeader>
            <CardContent>
              <Progress value={(budget.spent / budget.total) * 100} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                {Math.round((budget.spent / budget.total) * 100)}% of budget used
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <AddBudgetDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}

