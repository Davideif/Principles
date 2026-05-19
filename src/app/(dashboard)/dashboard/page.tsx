"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles, BookMarked, ScrollText, Tag } from "lucide-react"

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

  async function fetchDashboardData() {
    setLoading(true)
    const supabase = createClient()
    const userId = session!.user!.id

    const { data: principles } = await supabase
      .from("principles")
      .select("tags")
      .eq("user_id", userId)

    const { count: logsCount } = await supabase
      .from("logs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)

    const { data: logs } = await supabase
      .from("logs")
      .select("id, title, content, ai_response, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(3)

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

  function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">

        {/* Greeting */}
        <div>
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-xs tracking-[0.2em] uppercase text-primary font-sans">
              Dashboard
            </span>
          </div>
          <h1 className="font-serif font-normal text-3xl text-foreground">
            {getGreeting()}, {firstName}
          </h1>
          <p className="text-sm text-muted-foreground font-sans mt-2">
            Here is where you stand today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-5 space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookMarked className="h-4 w-4 text-primary/60" />
                <Link href="/dashboard/principles" className="text-xs font-sans hover:text-foreground transition-colors">
                  Principles
                </Link>
              </div>
              <p className="text-2xl font-bold text-foreground font-sans">
                {stats?.totalPrinciples ?? 0}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-5 space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ScrollText className="h-4 w-4 text-primary/60" />
                <Link href="/dashboard/log" className="text-xs font-sans hover:text-foreground transition-colors">
                  Logs
                </Link>
              </div>
              <p className="text-2xl font-bold text-foreground font-sans">
                {stats?.totalLogs ?? 0}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-5 space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Tag className="h-4 w-4 text-primary/60" />
                <span className="text-xs font-sans">Top tag</span>
              </div>
              <p className="text-sm font-semibold truncate text-foreground font-sans">
                {stats?.topTag ?? "—"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Button
          asChild
          size="lg"
          className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold font-sans"
        >
          <Link href="/dashboard/log">
            <Sparkles className="mr-2 h-4 w-4" />
            Log a situation
          </Link>
        </Button>

        {/* Recent logs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground font-sans">
              Recent logs
            </h2>
            <Link
              href="/dashboard/log"
              className="text-xs text-muted-foreground hover:text-primary transition-colors font-sans"
            >
              View all →
            </Link>
          </div>

          {recentLogs.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-10 text-center">
                <p className="text-sm text-muted-foreground font-sans">
                  No logs yet. Log your first situation to see your principles in action.
                </p>
              </CardContent>
            </Card>
          ) : (
            recentLogs.map((log) => (
              <Card key={log.id} className="bg-card border-border hover:border-primary/20 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif font-normal text-base text-foreground">
                    {log.title || "Untitled situation"}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground font-sans">
                    {new Date(log.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground font-sans line-clamp-2">
                    {log.content}
                  </p>
                  <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-medium text-primary font-sans">
                        Your principles said
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground font-serif line-clamp-3">
                      {log.ai_response}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

      </div>
    </div>
  )
}