"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { createClient } from "@/lib/supabase/client"
import {
  CURATED_PRINCIPLES,
  CURATED_CATEGORIES,
  CuratedPrinciple,
} from "@/lib/curated-principles"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Check, Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"

interface CuratedPickerProps {
  onDone?: () => void // called after user saves — parent can refresh list
}

export default function CuratedPicker({ onDone }: CuratedPickerProps) {
  const { data: session } = useSession()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [activeCategory, setActiveCategory] = useState<string>(CURATED_CATEGORIES[0])
  const [loading, setLoading] = useState(false)

  // ── Toggle selection ───────────────────────────────────────────────────────

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // ── Save selected to Supabase ──────────────────────────────────────────────

  async function handleSave() {
    if (!session?.user?.id || selected.size === 0) return

    setLoading(true)

    const supabase = createClient()
    const userId = session.user.id

    const toInsert = CURATED_PRINCIPLES.filter((p) => selected.has(p.id)).map(
      (p) => ({
        user_id: userId,
        content: p.content,
        source: p.source,
        tags: p.tags,
      })
    )

    const { error } = await supabase.from("principles").insert(toInsert)

    if (error) {
      toast.error("Failed to save principles. Please try again.")
    } else {
      toast.success(
        `${selected.size} principle${selected.size > 1 ? "s" : ""} added to your library.`
      )
      onDone?.()
    }

    setLoading(false)
  }

  // ── Filtered principles by active category ─────────────────────────────────

  const filtered = CURATED_PRINCIPLES.filter(
    (p) => p.category === activeCategory
  )

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="w-full space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Start with the greats
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select any principles that resonate with you. They will be added to
          your library instantly.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CURATED_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
              activeCategory === cat
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Principles grid */}
      <div className="grid grid-cols-1 gap-3">
        {filtered.map((principle) => {
          const isSelected = selected.has(principle.id)
          return (
            <PrincipleOption
              key={principle.id}
              principle={principle}
              isSelected={isSelected}
              onToggle={() => toggle(principle.id)}
            />
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t">
        <span className="text-sm text-muted-foreground">
          {selected.size > 0
            ? `${selected.size} selected`
            : "None selected yet"}
        </span>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onDone}>
            Skip
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={selected.size === 0 || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                Add {selected.size > 0 ? selected.size : ""} to my library
              </>
            )}
          </Button>
        </div>
      </div>

    </div>
  )
}

// ── Single principle option ────────────────────────────────────────────────────

function PrincipleOption({
  principle,
  isSelected,
  onToggle,
}: {
  principle: CuratedPrinciple
  isSelected: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full text-left rounded-xl border p-4 transition-all",
        isSelected
          ? "border-primary/50 bg-primary/5"
          : "border-border bg-card hover:border-border/80 hover:bg-muted/30"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2 flex-1">
          <p className="text-sm leading-relaxed text-foreground">
            {principle.content}
          </p>
          <p className="text-xs text-muted-foreground">{principle.source}</p>
          <div className="flex flex-wrap gap-1">
            {principle.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Checkbox indicator */}
        <div
          className={cn(
            "mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors",
            isSelected
              ? "border-primary bg-primary"
              : "border-muted-foreground/30"
          )}
        >
          {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
        </div>
      </div>
    </button>
  )
}