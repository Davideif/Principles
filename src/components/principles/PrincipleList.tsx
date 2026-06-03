"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { createClient } from "@/lib/supabase/client"
import PrincipleCard, { Principle } from "@/components/principles/PrincipleCard"
import PhilosopherPicker from "@/components/principles/PhilosopherPicker"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Sparkles } from "lucide-react"

// ── Component ─────────────────────────────────────────────────────────────────

export default function PrincipleList() {
  const { data: session } = useSession()
  const [principles, setPrinciples] = useState<Principle[]>([])
  const [loading, setLoading] = useState(true)
  const [showPicker, setShowPicker] = useState(false)

  useEffect(() => {
    if (!session?.user?.id) return
    fetchPrinciples()
  }, [session])

  // ── Fetch ─────────────────────────────────────────────────────────────────

  async function fetchPrinciples() {
    setLoading(true)
    const supabase = createClient()

    const { data, error } = await supabase
      .from("principles")
      .select("*")
      .eq("user_id", session!.user!.id)
      .order("created_at", { ascending: false })

    if (!error && data) {
      setPrinciples(data as Principle[])
    }

    setLoading(false)
  }

  // ── Edit ──────────────────────────────────────────────────────────────────

  async function handleEdit(updated: Principle) {
    const supabase = createClient()

    const { error } = await supabase
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

  // ── Delete ────────────────────────────────────────────────────────────────

  async function handleDelete(id: string) {
    const supabase = createClient()

    const { error } = await supabase
      .from("principles")
      .delete()
      .eq("id", id)

    if (!error) {
      setPrinciples((prev) => prev.filter((p) => p.id !== id))
    }
  }

  // ── Picker done ───────────────────────────────────────────────────────────

  function handlePickerDone() {
    setShowPicker(false)
    fetchPrinciples()
  }

  // ── Loading ───────────────────────────────────────────────────────────────

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
      <>
        <PhilosopherPicker onDone={handlePickerDone} />

        <Dialog open={showPicker} onOpenChange={setShowPicker}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <PhilosopherPicker onDone={handlePickerDone} />
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // ── List ──────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Browse philosophers button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPicker(true)}
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Browse philosophers
        </Button>
      </div>

      {/* Principles */}
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

      {/* Picker dialog */}
      <Dialog open={showPicker} onOpenChange={setShowPicker}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <PhilosopherPicker onDone={handlePickerDone} />
        </DialogContent>
      </Dialog>
    </>
  )
}