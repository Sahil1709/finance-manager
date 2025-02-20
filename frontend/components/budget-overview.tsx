import { Progress } from "@/components/ui/progress"

const budgets = [
  {
    category: "Food & Dining",
    spent: 450,
    total: 600,
  },
  {
    category: "Transportation",
    spent: 200,
    total: 300,
  },
  {
    category: "Entertainment",
    spent: 150,
    total: 200,
  },
]

export function BudgetOverview() {
  return (
    <div className="space-y-4">
      {budgets.map((budget) => (
        <div key={budget.category} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{budget.category}</span>
            <span>
              ${budget.spent} / ${budget.total}
            </span>
          </div>
          <Progress value={(budget.spent / budget.total) * 100} className="h-2" />
        </div>
      ))}
    </div>
  )
}

