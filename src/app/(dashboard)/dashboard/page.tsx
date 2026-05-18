"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles, BookMarked, ScrollText, Tag } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

interface Stats {
  totalPrinciples: number
  totalLogs: number
  topTag: string | null
}

interface RecentLog {
  id: string
  title: string | null
  content: string
  ai_response: string
  created_at: string
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentLogs, setRecentLogs] = useState<RecentLog[]>([])
  const [loading, setLoading] = useState(true)

  const firstName = session?.user?.name?.split(" ")[0] ?? "there"

  useEffect(() => {
    if (!session?.user?.id) return
    fetchDashboardData()
  }, [session])

  // ── Fetch all data ──────────────────────────────────────────────────────────

  async function fetchDashboardData() {
    setLoading(true)
    const supabase = createClient()
    const userId = session!.user!.id

    // Fetch principles
    const { data: principles } = await supabase
      .from("principles")
      .select("tags")
      .eq("user_id", userId)

    // Fetch logs count
    const { count: logsCount } = await supabase
      .from("logs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)

    // Fetch last 3 logs
    const { data: logs } = await supabase
      .from("logs")
      .select("id, title, content, ai_response, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(3)

    // Calculate top tag from all principles
    const tagCounts: Record<string, number> = {}
    principles?.forEach((p) => {
      let tags: string[] = []
      try {
        const parsed = typeof p.tags === "string" ? JSON.parse(p.tags) : p.tags
        tags = Array.isArray(parsed) ? parsed : []
      } catch {
        tags = []
      }

      tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] ?? 0) + 1
      })
    })
    const topTag =
      Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null

    setStats({
      totalPrinciples: principles?.length ?? 0,
      totalLogs: logsCount ?? 0,
      topTag,
    })

    setRecentLogs((logs as RecentLog[]) ?? [])
    setLoading(false)
  }

  // ── Greeting ────────────────────────────────────────────────────────────────

  function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  // ── Loading ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    )
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">

      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-semibold">
          {getGreeting()}, {firstName}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here is where you stand today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-5 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookMarked className="h-4 w-4" />
              <Link href="/dashboard/principles" className="text-xs">
                Principles
              </Link>
            </div>
            <p className="text-2xl font-bold">{stats?.totalPrinciples ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ScrollText className="h-4 w-4" />
              <Link href="/dashboard/log" className="text-xs">
                Logs
              </Link>
            </div>
            <p className="text-2xl font-bold">{stats?.totalLogs ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Tag className="h-4 w-4" />
              <span className="text-xs">Top tag</span>
            </div>
            <p className="text-sm font-semibold truncate">
              {stats?.topTag ?? "—"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Log a situation CTA */}
      <Button asChild className="w-full" size="lg">
        <Link href="/dashboard/log">
          <Sparkles className="mr-2 h-4 w-4" />
          Log a situation
        </Link>
      </Button>

      {/* Recent logs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Recent logs</h2>
          <Link
            href="/dashboard/log"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all →
          </Link>
        </div>

        {recentLogs.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-sm text-muted-foreground">
                No logs yet. Log your first situation to see your principles in action.
              </p>
            </CardContent>
          </Card>
        ) : (
          recentLogs.map((log) => (
            <Card key={log.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {log.title || "Untitled situation"}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {new Date(log.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Situation */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {log.content}
                </p>

                {/* AI response */}
                <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">
                      Your principles said
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-foreground line-clamp-3">
                    {log.ai_response}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

    </div>
  )
}