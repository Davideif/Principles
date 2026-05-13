import { Brain, Link } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (

      <footer className="relative z-10 border-t border-[#1a1814] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-[#c9a96e]" />
            <span className="text-sm text-[#5a5446] font-sans">
              Principles — live by your own rules
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-[#5a5446] font-sans">
            <Link href="/privacy" className="hover:text-[#a09880] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#a09880] transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-[#a09880] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>

  )
}

export default Footer       
