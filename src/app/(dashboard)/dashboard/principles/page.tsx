"use client"

import { useState } from "react"
import AddPrincipleForm from "@/components/principles/AddPrincipleForm"
import PrincipleList from "@/components/principles/PrincipleList"
import CuratedPicker from "@/components/principles/CuratedPicker"

export default function PrinciplesPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My Principles</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Lessons you have collected from books, podcasts, and life.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-8 items-start">
        {/* Left — Add form */}
        <div className="lg:sticky lg:top-8">
          <AddPrincipleForm onSuccess={() => setRefreshKey(k => k + 1)} />
        </div>

        {/* Right — List + CuratedPicker always visible */}
        <div className="flex flex-col gap-6">
          <CuratedPicker onDone={() => setRefreshKey(k => k + 1)} />
          <PrincipleList refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  )
}