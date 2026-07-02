"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { createClient } from "@/lib/supabase/client"
import {
  SOURCES,
  getPrinciplesForSources,
  Source,
} from "@/lib/sources"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Check, Loader2, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"
import { toast } from "sonner"

interface PhilosopherPickerProps {
  onDone?: () => void
}

type Step = "philosophers" | "principles"

// ── Main component ────────────────────────────────────────────────────────────

export default function PhilosopherPicker({ onDone }: PhilosopherPickerProps) {
  const { data: session } = useSession()
  const [step, setStep] = useState<Step>("philosophers")
  const [selectedPhilosophers, setSelectedPhilosophers] = useState<Set<string>>(new Set())
  const [selectedPrinciples, setSelectedPrinciples] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  // ── Step 1 — toggle philosopher ───────────────────────────────────────────

  function togglePhilosopher(id: string) {
    setSelectedPhilosophers((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        // deselect their principles too
        setSelectedPrinciples((prevP) => {
          const nextP = new Set(prevP)
          const source = SOURCES.find((s) => s.id === id)
          source?.principles.forEach((p) => nextP.delete(p.id))
          return nextP
        })
      } else {
        next.add(id)
      }
      return next
    })
  }

  // ── Step 2 — toggle principle ─────────────────────────────────────────────

  function togglePrinciple(id: string) {
    setSelectedPrinciples((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // ── Select all principles from a philosopher ──────────────────────────────

  function toggleAllFromPhilosopher(source: Source) {
    const ids = source.principles.map((p) => p.id)
    const allSelected = ids.every((id) => selectedPrinciples.has(id))
    setSelectedPrinciples((prev) => {
      const next = new Set(prev)
      if (allSelected) {
        ids.forEach((id) => next.delete(id))
      } else {
        ids.forEach((id) => next.add(id))
      }
      return next
    })
  }

  // ── Go to step 2 — auto-select all principles ─────────────────────────────

  function goToPrinciples() {
    // Auto-select all principles from chosen philosophers
    const allPrincipleIds = getPrinciplesForSources(
      Array.from(selectedPhilosophers)
    ).map(({ principle }) => principle.id)
    setSelectedPrinciples(new Set(allPrincipleIds))
    setStep("principles")
  }

  // ── Save to Supabase ──────────────────────────────────────────────────────

  async function handleSave() {
    if (!session?.user?.id || selectedPrinciples.size === 0) return

    setLoading(true)
    const supabase = createClient()
    const userId = session.user.id

    // Build insert payload
    const allPrinciples = getPrinciplesForSources(
      Array.from(selectedPhilosophers)
    )

    const toInsert = allPrinciples
      .filter(({ principle }) => selectedPrinciples.has(principle.id))
      .map(({ principle, source }) => ({
        user_id: userId,
        content: principle.content,
        source: source.name,
        tags: principle.tags,
      }))

    const { error } = await supabase.from("principles").insert(toInsert)

    if (error) {
      toast.error("Failed to save principles. Please try again.")
    } else {
      toast.success(
        `${toInsert.length} principle${toInsert.length > 1 ? "s" : ""} added to your library.`
      )
      onDone?.()
    }

    setLoading(false)
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="w-full space-y-6">
      {step === "philosophers" ? (
        <StepOne
          selected={selectedPhilosophers}
          onToggle={togglePhilosopher}
          onNext={goToPrinciples}
          onSkip={onDone}
        />
      ) : (
        <StepTwo
          selectedPhilosophers={selectedPhilosophers}
          selectedPrinciples={selectedPrinciples}
          onTogglePrinciple={togglePrinciple}
          onToggleAll={toggleAllFromPhilosopher}
          onBack={() => setStep("philosophers")}
          onSave={handleSave}
          onSkip={onDone}
          loading={loading}
        />
      )}
    </div>
  )
}

// ── Step 1 — Philosopher selection ────────────────────────────────────────────

function StepOne({
  selected,
  onToggle,
  onNext,
  onSkip,
}: {
  selected: Set<string>
  onToggle: (id: string) => void
  onNext: () => void
  onSkip?: () => void
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Choose your teachers</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Pick the minds that resonate with you. You will choose which of their
          principles to keep in the next step.
        </p>
      </div>

      {/* Step indicator */}
      <StepIndicator current={1} />

      {/* Philosopher grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SOURCES.map((source) => {
          const isSelected = selected.has(source.id)
          return (
            <button
              key={source.id}
              onClick={() => onToggle(source.id)}
              className={cn(
                "w-full text-left rounded-xl border p-4 transition-all",
                isSelected
                  ? "border-primary/50 bg-primary/5"
                  : "border-border bg-card hover:border-border/80 hover:bg-muted/30"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{source.emoji}</span>
                    <span className="text-sm font-semibold">
                      {source.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {source.tradition} · {source.era}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {source.tagline}
                  </p>
                  <p className="text-xs text-muted-foreground/60">
                    {source.principles.length} principles
                  </p>
                </div>

                {/* Checkbox */}
                <div
                  className={cn(
                    "mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  )}
                >
                  {isSelected && (
                    <Check className="h-3 w-3 text-primary-foreground" />
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t">
        <span className="text-sm text-muted-foreground">
          {selected.size > 0
            ? `${selected.size} teacher${selected.size > 1 ? "s" : ""} selected`
            : "Select at least one"}
        </span>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onSkip}>
            Skip
          </Button>
          <Button
            size="sm"
            onClick={onNext}
            disabled={selected.size === 0}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Step 2 — Principle selection ──────────────────────────────────────────────

function StepTwo({
  selectedPhilosophers,
  selectedPrinciples,
  onTogglePrinciple,
  onToggleAll,
  onBack,
  onSave,
  onSkip,
  loading,
}: {
  selectedPhilosophers: Set<string>
  selectedPrinciples: Set<string>
  onTogglePrinciple: (id: string) => void
  onToggleAll: (source: Source) => void
  onBack: () => void
  onSave: () => void
  onSkip?: () => void
  loading: boolean
}) {
  const sources = SOURCES.filter((s) =>
    selectedPhilosophers.has(s.id)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Pick your principles</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          All principles from your chosen teachers are pre-selected. Deselect
          any that do not resonate with you.
        </p>
      </div>

      {/* Step indicator */}
      <StepIndicator current={2} />

      {/* Principles grouped by philosopher */}
      <div className="space-y-6">
        {sources.map((source) => {
          const allSelected = source.principles.every((p) =>
            selectedPrinciples.has(p.id)
          )
          const someSelected = source.principles.some((p) =>
            selectedPrinciples.has(p.id)
          )

          return (
            <div key={source.id} className="space-y-3">
              {/* Philosopher header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{source.emoji}</span>
                  <span className="text-sm font-semibold">
                    {source.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {source.tradition}
                  </Badge>
                </div>
                <button
                  onClick={() => onToggleAll(source)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {allSelected ? "Deselect all" : someSelected ? "Select all" : "Select all"}
                </button>
              </div>

              {/* Principles */}
              <div className="grid grid-cols-1 gap-2">
                {source.principles.map((principle) => {
                  const isSelected = selectedPrinciples.has(principle.id)
                  return (
                    <button
                      key={principle.id}
                      onClick={() => onTogglePrinciple(principle.id)}
                      className={cn(
                        "w-full text-left rounded-xl border p-4 transition-all",
                        isSelected
                          ? "border-primary/50 bg-primary/5"
                          : "border-border bg-card hover:border-border/80 hover:bg-muted/30"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-2 flex-1">
                          <p className="text-sm leading-relaxed">
                            {principle.content}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {principle.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Checkbox */}
                        <div
                          className={cn(
                            "mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors",
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-muted-foreground/30"
                          )}
                        >
                          {isSelected && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t">
        <span className="text-sm text-muted-foreground">
          {selectedPrinciples.size > 0
            ? `${selectedPrinciples.size} principle${selectedPrinciples.size > 1 ? "s" : ""} selected`
            : "None selected"}
        </span>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button variant="ghost" size="sm" onClick={onSkip}>
            Skip
          </Button>
          <Button
            size="sm"
            onClick={onSave}
            disabled={selectedPrinciples.size === 0 || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                Add {selectedPrinciples.size} to library
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: 1 | 2 }) {
  return (
    <div className="flex items-center gap-2">
      {[
        { n: 1, label: "Choose teachers" },
        { n: 2, label: "Pick principles" },
      ].map(({ n, label }, i) => (
        <div key={n} className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div
              className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                current === n
                  ? "bg-primary text-primary-foreground"
                  : current > n
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {current > n ? <Check className="h-3 w-3" /> : n}
            </div>
            <span
              className={cn(
                "text-xs",
                current === n
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </div>
          {i === 0 && (
            <div className="h-px w-8 bg-border" />
          )}
        </div>
      ))}
    </div>
  )
}