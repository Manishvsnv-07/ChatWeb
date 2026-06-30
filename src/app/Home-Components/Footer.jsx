import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-transparent py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500">
        
        {/* Brand */}
        <span className="font-semibold text-black tracking-wide">
          ChatWeb
        </span>

        {/* Links */}
        <div className="flex items-center gap-5">
          <a href="/about" className="hover:text-black transition-colors">About</a>
          <a href="/privacy" className="hover:text-black transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-black transition-colors">Terms</a>
          <a href="/contact" className="hover:text-black transition-colors">Contact</a>
        </div>

        {/* Copyright */}
        <span>© {new Date().getFullYear()} ChatWeb. All rights reserved.</span>

      </div>
    </footer>
  )
}

export default Footer
