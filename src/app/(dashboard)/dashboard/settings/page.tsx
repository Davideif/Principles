"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const { data: session } = useSession()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [deleting, setDeleting] = useState(false)

  const userName = session?.user?.name ?? "User"
  const userEmail = session?.user?.email ?? ""
  const userImage = session?.user?.image ?? undefined
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  // ── Delete account ──────────────────────────────────────────────────────────

  async function handleDeleteAccount() {
    setDeleting(true)

    try {
      const res = await fetch("/api/account", { method: "DELETE" })

      if (!res.ok) {
        toast.error("Failed to delete account. Please try again.")
        setDeleting(false)
        return
      }

      toast.success("Your account and all data have been deleted.")
      // Sign out and redirect to landing page
      await signOut({ callbackUrl: "/" })
    } catch {
      toast.error("An error occurred. Please try again.")
      setDeleting(false)
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-4 mb-3">
          <div className="h-px w-8 bg-primary/40" />
          <span className="text-xs tracking-[0.2em] uppercase text-primary font-sans">
            Your account
          </span>
        </div>
        <h1 className="font-serif font-normal text-3xl text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground font-sans mt-2">
          Manage your account and data.
        </p>
      </div>

      {/* ── Account info ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account</CardTitle>
          <CardDescription>
            Your account is linked to Google. Name and email come from your
            Google profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={userImage} alt={userName} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-sm text-muted-foreground truncate">
                {userEmail}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Danger zone ── */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-base text-destructive">
            Danger zone
          </CardTitle>
          <CardDescription>
            Permanently delete your account, all your principles, and all your
            logs. This cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={() => setDeleteOpen(true)}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete account
          </Button>
        </CardContent>
      </Card>

      {/* ── Delete confirmation dialog ── */}
      <Dialog open={deleteOpen} onOpenChange={(open) => {
        setDeleteOpen(open)
        if (!open) setConfirmText("")
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This will permanently delete your account, including all your
              principles and situation logs. This action cannot be undone.
            </p>

            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-sm">
                Type <span className="font-semibold">delete</span> to confirm
              </Label>
              <Input
                id="confirm"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="delete"
                autoComplete="off"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={deleting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={confirmText !== "delete" || deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete forever"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}