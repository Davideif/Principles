import { Brain } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground/60 font-sans">
            Principles — live by your own rules
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-muted-foreground/60 font-sans">
          <Link href="/privacy" className="hover:text-muted-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-muted-foreground transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-muted-foreground transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer