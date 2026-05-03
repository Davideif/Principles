"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Copy,
  BookOpen,
  Check,
} from "lucide-react"

// ── Types ────────────────────────────────────────────────────────────────────

export interface Principle {
  id: string
  content: string
  source?: string
  tags?: string[]
  created_at: string
}

interface PrincipleCardProps {
  principle: Principle
  onEdit: (updated: Principle) => void
  onDelete: (id: string) => void
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function PrincipleCard({
  principle,
  onEdit,
  onDelete,
}: PrincipleCardProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Edit form state — pre-filled with current values
  const [editContent, setEditContent] = useState(principle.content)
  const [editSource, setEditSource] = useState(principle.source ?? "")
  const [editTags, setEditTags] = useState(principle.tags?.join(", ") ?? "")

  // ── Handlers ───────────────────────────────────────────────────────────────

  function handleCopy() {
    navigator.clipboard.writeText(principle.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleEditSave() {
    const updatedPrinciple: Principle = {
      ...principle,
      content: editContent.trim(),
      source: editSource.trim() || undefined,
      tags: editTags
        ? editTags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    }
    onEdit(updatedPrinciple)
    setEditOpen(false)
  }

  function handleDelete() {
    onDelete(principle.id)
    setDeleteOpen(false)
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <Card className="group flex flex-col justify-between gap-3 p-5 transition-shadow hover:shadow-md">
        <CardContent className="p-0 space-y-3">
          {/* Principle text */}
          <p className="text-sm leading-relaxed text-foreground">
            {principle.content}
          </p>

          {/* Source */}
          {principle.source && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{principle.source}</span>
            </div>
          )}

          {/* Tags */}
          {principle.tags && principle.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {principle.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-0 flex items-center justify-between">
          {/* Date */}
          <span className="text-xs text-muted-foreground">
            {new Date(principle.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Copy button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={handleCopy}
              title="Copy principle"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>

            {/* More options dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  title="More options"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setEditOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDeleteOpen(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      </Card>

      {/* ── Edit Dialog ──────────────────────────────────────────────────────── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit principle</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="edit-content">Principle</Label>
              <Textarea
                id="edit-content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={4}
                placeholder="Write your principle..."
                className="resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-source">
                Source{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Input
                id="edit-source"
                value={editSource}
                onChange={(e) => setEditSource(e.target.value)}
                placeholder="e.g. Meditations, Huberman podcast..."
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-tags">
                Tags{" "}
                <span className="text-muted-foreground font-normal">
                  (comma separated)
                </span>
              </Label>
              <Input
                id="edit-tags"
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                placeholder="e.g. mindset, work, health"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditSave} disabled={!editContent.trim()}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ────────────────────────────────────────── */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete principle?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This principle will be permanently deleted. This action cannot be
            undone.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}