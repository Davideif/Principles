"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { createClient } from "@/lib/supabase/client"
import PrincipleCard, { Principle } from "@/components/principles/PrincipleCard"
import { Skeleton } from "@/components/ui/skeleton"

interface PrincipleListProps {
  refreshKey?: number
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function PrincipleList({ refreshKey = 0 }: PrincipleListProps) {
  const { data: session, status } = useSession()

  const [principles, setPrinciples] = useState<Principle[]>([])
  const [loading, setLoading] = useState(true)

  // ── Fetch principles on mount ─────────────────────────────────────────────

  useEffect(() => {
  if (status !== "authenticated") return
  fetchPrinciples()
}, [status,session?.user?.id, refreshKey])

  async function fetchPrinciples() {
  setLoading(true)

  const { data, error } = await createClient()
    .from("principles")
    .select("*")
    .eq("user_id", session!.user!.id)
    .order("created_at", { ascending: false })


  if (!error && data) {
  setPrinciples(data.map(p => ({
    ...p,
    tags: Array.isArray(p.tags)
      ? p.tags
      : typeof p.tags === "string"
        ? p.tags.replace(/^{|}$/g, "").split(",").filter(Boolean)
        : [],
  })) as Principle[])
}

  setLoading(false)
}

  // ── Edit handler ──────────────────────────────────────────────────────────

  async function handleEdit(updated: Principle) {
    
    const { error } = await createClient()
      .from("principles")
      .update({
        content: updated.content,
        source: updated.source,
        tags: updated.tags,
      })
      .eq("id", updated.id)

    if (!error) {
      setPrinciples((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      )
    }
  }

  // ── Delete handler ────────────────────────────────────────────────────────

  async function handleDelete(id: string) {
    
    const { error } = await createClient()
      .from("principles")
      .delete()
      .eq("id", id)

    if (!error) {
      setPrinciples((prev) => prev.filter((p) => p.id !== id))
    }
  }

  // ── Loading state ─────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-xl" />
        ))}
      </div>
    )
  }

  // ── Empty state ───────────────────────────────────────────────────────────

  if (principles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <p className="text-sm font-medium text-foreground">No principles yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your first principle above to get started.
        </p>
      </div>
    )
  }

  // ── Principles list ───────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-3">
      {principles.map((principle) => (
        <PrincipleCard
          key={principle.id}
          principle={principle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}