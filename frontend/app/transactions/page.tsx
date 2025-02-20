"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TransactionsTable } from "@/components/transactions/transactions-table"
import { AddTransactionDialog } from "@/components/transactions/add-transaction-dialog"

export default function TransactionsPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </div>
      </div>
      <TransactionsTable />
      <AddTransactionDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}

