import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  ScrollText,
  Sparkles,
  Check,
  ArrowRight,
} from "lucide-react"


export default async function HomePage() {
  // If already signed in, go straight to dashboard
  const session = await getServerSession(authOptions)
  if (session) redirect("/dashboard")

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0ece4] font-['Georgia',serif] overflow-x-hidden">

      {/* ── Noise texture overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Hero ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-28 text-center">

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-[#c9a96e]/40" />
          <span className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-sans">
            Personal wisdom
          </span>
          <div className="h-px w-16 bg-[#c9a96e]/40" />
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold leading-[1.05] tracking-tight text-[#f0ece4] mb-6">
          Your wisdom.
          <br />
          <span className="text-[#c9a96e]">When you need it most.</span>
        </h1>

        <p className="text-lg sm:text-xl text-[#a09880] max-w-xl mx-auto leading-relaxed mb-10 font-sans font-light">
          Collect principles from books, podcasts and life experience.
          When something happens, get guidance from your own beliefs —
          not generic AI advice.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-[#c9a96e] hover:bg-[#b8945a] text-[#0a0a0a] font-semibold rounded-full px-8 text-base"
          >
            <Link href="/sign-in">
              Start for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <span className="text-xs text-[#5a5446] font-sans">
            No credit card required
          </span>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#c9a96e]/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* ── Divider ── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2520] to-transparent" />
      </div>

      {/* ── How it works ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-sans mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0ece4]">
            Three steps to live by your own rules
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              icon: BookOpen,
              number: "01",
              title: "Collect your principles",
              description:
                "As you read books, listen to podcasts, or learn from experience — add the lessons that resonate with you in your own words.",
            },
            {
              icon: ScrollText,
              number: "02",
              title: "Log a situation",
              description:
                "When something happens — a setback, a decision, a conflict — write it down. Describe what you are facing honestly.",
            },
            {
              icon: Sparkles,
              number: "03",
              title: "Hear your own wisdom",
              description:
                "The app finds the 2–3 principles you already believe in that apply right now. Your own words, reflected back when it matters.",
            },
          ].map(({ icon: Icon, number, title, description }) => (
            <div key={number} className="relative">
              <div className="text-6xl font-bold text-[#1a1814] absolute -top-4 -left-2 font-sans select-none">
                {number}
              </div>
              <div className="relative pt-6 pl-2">
                <div className="w-10 h-10 rounded-xl bg-[#1a1814] border border-[#2a2520] flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-[#c9a96e]" />
                </div>
                <h3 className="text-lg font-semibold text-[#f0ece4] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[#7a7060] leading-relaxed font-sans font-light">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2520] to-transparent" />
      </div>

      {/* ── Why not ChatGPT ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-sans mb-4">
              The honest question
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0ece4] mb-6 leading-tight">
              Why not just ask ChatGPT?
            </h2>
            <p className="text-[#7a7060] text-sm leading-relaxed font-sans font-light mb-4">
              ChatGPT gives everyone the same advice. It does not know what
              you believe, what you have learned, or what kind of person you
              are trying to become.
            </p>
            <p className="text-[#7a7060] text-sm leading-relaxed font-sans font-light">
              Principles remembers everything you have ever learned and
              reflects it back to you — in your words, through your
              worldview. After six months, you have a map of your own mind
              that no AI can give you.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Advice filtered through your specific worldview",
              "Remembers your principles across every session",
              "Detects patterns in how you think and struggle",
              "Grows more valuable the more you use it",
              "Your wisdom — not a stranger's opinion",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-[#c9a96e]" />
                </div>
                <p className="text-sm text-[#a09880] font-sans">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2520] to-transparent" />
      </div>

      {/* ── Pricing ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-sans mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0ece4]">
            Simple and honest
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* Free */}
          <div className="rounded-2xl border border-[#2a2520] bg-[#0f0e0c] p-8">
            <p className="text-sm font-semibold text-[#a09880] font-sans mb-1">Free</p>
            <p className="text-4xl font-bold text-[#f0ece4] mb-1">$0</p>
            <p className="text-xs text-[#5a5446] font-sans mb-8">Forever</p>
            <div className="space-y-3 mb-8">
              {[
                "Up to 20 principles",
                "Unlimited situation logs",
                "AI wisdom responses",
                "Basic log history",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#c9a96e] shrink-0" />
                  <span className="text-sm text-[#7a7060] font-sans">{f}</span>
                </div>
              ))}
            </div>
            <Button
              asChild
              variant="outline"
              className="w-full rounded-full border-[#2a2520] text-[#a09880] hover:text-[#f0ece4] hover:border-[#3a3530] bg-transparent font-sans"
            >
              <Link href="/sign-in">Get started</Link>
            </Button>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-[#c9a96e]/30 bg-[#0f0e0c] p-8 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a96e]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-[#c9a96e] font-sans">Pro</p>
              <span className="text-xs bg-[#c9a96e]/10 text-[#c9a96e] px-2 py-0.5 rounded-full font-sans">
                Most popular
              </span>
            </div>
            <p className="text-4xl font-bold text-[#f0ece4] mb-1">$6</p>
            <p className="text-xs text-[#5a5446] font-sans mb-8">per month</p>
            <div className="space-y-3 mb-8">
              {[
                "Unlimited principles",
                "Unlimited situation logs",
                "AI wisdom responses",
                "Full log history",
                "Weekly AI digest email",
                "Pattern & gap detection",
                "Semantic search",
                "Daily principle nudge",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#c9a96e] shrink-0" />
                  <span className="text-sm text-[#a09880] font-sans">{f}</span>
                </div>
              ))}
            </div>
            <Button
              asChild
              className="w-full rounded-full bg-[#c9a96e] hover:bg-[#b8945a] text-[#0a0a0a] font-semibold font-sans"
            >
              <Link href="/sign-in">Get started</Link>
            </Button>
          </div>

        </div>
      </section>

   
    </div>
  )
}