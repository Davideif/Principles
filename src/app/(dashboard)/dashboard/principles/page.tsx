"use client"

import { useState } from "react"
import AddPrincipleForm from "@/components/principles/AddPrincipleForm"
import PrincipleList from "@/components/principles/PrincipleList"

export default function PrinciplesPage() {

  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My Principles</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Lessons you have collected from books, podcasts, and life.
        </p>
      </div>

      <AddPrincipleForm onSuccess={() => setRefreshKey(k => k + 1)} />
      <PrincipleList refreshKey={refreshKey} />
    </div>
  )
}