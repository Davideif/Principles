"use client"

import { useState } from "react"
import LogForm from "@/components/logs/LogForm"
import LogHistory from "@/components/logs/LogHistory"

export default function LogsPage() {
  const [refresh, setRefresh] = useState(0)

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">

        {/* Header */}
        <div>
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-xs tracking-[0.2em] uppercase text-primary font-sans">
              Your situation
            </span>
          </div>
          <h1 className="font-serif font-normal text-3xl text-foreground">
            Situation Log
          </h1>
          <p className="text-sm text-muted-foreground font-sans mt-2">
            Describe what is happening and your principles will guide you.
          </p>
        </div>

        {/* Form — triggers refresh after successful submit */}
        <LogForm onSuccess={() => setRefresh((r) => r + 1)} />

        {/* History — re-fetches when refresh changes */}
        <LogHistory refresh={refresh} />

      </div>
    </div>
  )
}