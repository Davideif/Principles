"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

interface Log {
  id: string
  situation: string
  ai_response: string
  created_at: string
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function LogHistory({ refresh }: { refresh: number }) {
  const { data: session } = useSession()
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.user?.id) return
    fetchLogs()
  }, [session, refresh])

  async function fetchLogs() {
    setLoading(true)
    const supabase = createClient()

    const { data, error } = await supabase
      .from("logs")
      .select("id, situation, ai_response, created_at")
      .eq("user_id", session!.user!.id)
      .order("created_at", { ascending: false })

    if (!error && data) {
      setLogs(data as Log[])
    }

    setLoading(false)
  }

  // ── Loading ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    )
  }

  // ── Empty ─────────────────────────────────────────────────────────────────

  if (logs.length === 0) {
     return <p>You haven't written a log yet</p>
  }

  // ── List ──────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">

      {/* Section header */}
      <div className="flex items-center gap-4">
        <div className="h-px w-8 bg-primary/40" />
        <span className="text-xs tracking-[0.2em] uppercase text-primary font-sans">
          Past logs
        </span>
      </div>

      {logs.map((log) => (
        <Card key={log.id} className="w-full border-border bg-card">
          <CardHeader className="pb-2">
            {/* Date */}
            <p className="text-xs text-muted-foreground font-sans">
              {new Date(log.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Situation */}
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground/60 font-sans">
                Situation
              </p>
              <p className="text-sm leading-relaxed text-foreground font-sans whitespace-pre-wrap">
                {log.situation}
              </p>
            </div>

            {/* AI response */}
            {log.ai_response && (
              <div className="rounded-xl bg-primary/5 border border-primary/10 p-4 space-y-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary font-sans">
                    Your principles said
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground font-sans whitespace-pre-wrap">
                  {log.ai_response}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}