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

export default function PrincipleCard({
  principle,
  onEdit,
  onDelete,
}: PrincipleCardProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const [editContent, setEditContent] = useState(principle.content)
  const [editSource, setEditSource] = useState(principle.source ?? "")
  const [editTags, setEditTags] = useState(principle.tags?.join(", ") ?? "")

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

  return (
    <>

      <Card className="group flex flex-col justify-between gap-3 p-5 transition-colors hover:border-primary/20 bg-card border-border">
        <CardContent className="p-0 space-y-3">

         
          <p className="font-serif text-sm leading-relaxed text-foreground">
            {principle.content}
          </p>

          {principle.source && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-sans">
              <BookOpen className="h-3.5 w-3.5 shrink-0 text-primary/60" />
              <span className="truncate">{principle.source}</span>
            </div>
          )}

          {principle.tags && principle.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {principle.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs font-sans"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-0 flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-sans">
            {new Date(principle.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={handleCopy}
              title="Copy principle"
            >
              
              {copied ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>

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
                <DropdownMenuItem onClick={() => setEditOpen(true)} className="font-sans">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDeleteOpen(true)}
                  className="text-destructive focus:text-destructive font-sans"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      </Card>

      {/* ── Edit Dialog ── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            
            <DialogTitle className="font-serif font-normal text-xl">
              Edit principle
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="edit-content" className="text-sm text-muted-foreground font-sans">
                Principle
              </Label>
              <Textarea
                id="edit-content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={4}
                placeholder="Write your principle..."
                className="resize-none bg-muted/40 border-border text-foreground placeholder:text-muted-foreground font-sans focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-source" className="text-sm text-muted-foreground font-sans">
                Source{" "}
                <span className="text-muted-foreground/60 font-normal">(optional)</span>
              </Label>
              <Input
                id="edit-source"
                value={editSource}
                onChange={(e) => setEditSource(e.target.value)}
                placeholder="e.g. Meditations, Huberman podcast..."
                className="bg-muted/40 border-border text-foreground placeholder:text-muted-foreground font-sans focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-tags" className="text-sm text-muted-foreground font-sans">
                Tags{" "}
                <span className="text-muted-foreground/60 font-normal">(comma separated)</span>
              </Label>
              <Input
                id="edit-tags"
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                placeholder="e.g. mindset, work, health"
                className="bg-muted/40 border-border text-foreground placeholder:text-muted-foreground font-sans focus-visible:ring-primary"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="font-sans rounded-full border-border text-muted-foreground hover:text-foreground">
                Cancel
              </Button>
            </DialogClose>
           
            <Button
              onClick={handleEditSave}
              disabled={!editContent.trim()}
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Dialog ── */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif font-normal text-xl">
              Delete principle?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground font-sans">
            This principle will be permanently deleted. This action cannot be
            undone.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="font-sans rounded-full border-border text-muted-foreground hover:text-foreground">
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDelete} className="rounded-full font-sans font-semibold">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}