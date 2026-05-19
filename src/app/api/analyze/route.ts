import { supabaseAdmin } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

function validateBody(body: unknown): { situation: string } | { validationError: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { validationError: "Request body must be a JSON object" }
  }

  const { situation } = body as Record<string, unknown>

  if (situation === undefined) {
    return { validationError: "situation is required" }
  }
  if (typeof situation !== "string") {
    return { validationError: "situation must be a string" }
  }
  if (!situation.trim()) {
    return { validationError: "situation cannot be empty" }
  }
  if (situation.length > 2000) {
    return { validationError: "situation must be 2000 characters or fewer" }
  }

  return { situation: situation.trim() }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Get the logged in user
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 2. Parse + validate request body
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    const validated = validateBody(body)
    if ("validationError" in validated) {
      return NextResponse.json({ error: validated.validationError }, { status: 400 })
    }

    const { situation } = validated

    // 3. Fetch the user's principles from Supabase
    const { data: principles, error: principlesError } = await supabaseAdmin
      .from("principles")
      .select("content, source, tags")
      .eq("user_id", session.user.id)

    if (principlesError) {
      return NextResponse.json(
        { error: principlesError.message },
        { status: 500 }
      )
    }

    // 4. Build the prompt
    let aiResponse = ""

    if (!principles || principles.length === 0) {
      aiResponse =
        "You have no principles saved yet. Add some principles from books, podcasts, or personal experience and I will reflect them back to you when you need them."
    } else {
      const principlesList = principles
        .map((p, i) => {
          const source = p.source ? ` (from: ${p.source})` : ""
          return `${i + 1}. ${p.content}${source}`
        })
        .join("\n")

      const prompt = `
You are a personal wisdom coach. The user has built a library of personal principles they believe in.
When they describe a situation, respond using ONLY their own principles — never give generic advice.
Be direct, honest, and specific. Do not invent new principles.

Their principles:
${principlesList}

Their situation:
${situation}

Find the 2-3 most relevant principles and explain specifically how each one applies to this situation.
If no principles are relevant, say so honestly and suggest what kind of principle might help.
      `.trim()

      // 5. Call Gemini
      try {
        const result = await genAI.models.generateContent({
          model: "gemini-2.5-flash-lite",
          contents: prompt,
        });
        aiResponse = result.text ?? "";
      } catch (err: any) {
        if (err?.status === 429) {
          return NextResponse.json(
            { error: "AI is rate limited. Please wait a minute and try again." },
            { status: 429 }
          )
        }
        if (err?.status === 404) {
          return NextResponse.json(
            { error: "AI model unavailable. Please contact support." },
            { status: 503 }
          )
        }
        throw err
      }
    }

    // 6. Store the log + AI response in Supabase
    const { data, error } = await supabaseAdmin
      .from("logs")
      .insert({
        user_id: session.user.id,
        situation,
        ai_response: aiResponse,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // 7. Return the log with the AI response
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error("Unexpected error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}