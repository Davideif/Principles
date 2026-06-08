
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* ── Video background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/video.mp4"
      />

      {/* ── Dark overlay — preserves your dark aesthetic over the video ── */}
      <div className="absolute inset-0 bg-black/70" />

      
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-28 text-center">

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
      </div>

    </section>
  )
}