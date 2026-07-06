// app/api/account/route.ts
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function DELETE() {
  try {
    // 1. Verify the user is logged in
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // 2. Delete all user data — order does not matter since tables are independent
    const [principlesResult, logsResult, plansResult] = await Promise.all([
      supabaseAdmin.from("principles").delete().eq("user_id", userId),
      supabaseAdmin.from("logs").delete().eq("user_id", userId),
      supabaseAdmin.from("user_plans").delete().eq("user_id", userId),
    ])

    // 3. Check if any deletion failed
    const errors = [
      principlesResult.error,
      logsResult.error,
      plansResult.error,
    ].filter(Boolean)

    if (errors.length > 0) {
      console.error("Account deletion errors:", errors)
      return NextResponse.json(
        { error: "Failed to delete some data. Please contact support." },
        { status: 500 }
      )
    }

    // 4. Done — the client will handle signOut
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Account deletion failed:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}