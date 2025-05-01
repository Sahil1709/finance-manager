"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SignIn, SignOutButton } from '@clerk/nextjs'
import { Overview } from "@/components/overview"
import { RecentTransactions } from "@/components/recent-transactions"
import { BudgetOverview } from "@/components/budget-overview"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { userId } = useAuth()
  const [summary, setSummary] = useState({ total_income: 0, total_expenses: 0, total_balance: 0 })

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/summary/${userId}/`)
        const data = await response.json()
        setSummary(data)
      } catch (error) {
        console.error("Failed to fetch summary:", error)
      }
    }

    if (userId) {
      fetchSummary()
    }
  }, [userId])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summary.total_balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summary.total_income.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summary.total_expenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">-4.1% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetOverview />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}