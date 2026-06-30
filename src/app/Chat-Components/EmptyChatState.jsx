import React from 'react'

const EmptyChatState = () => {
  return (
    <div className="w-3/4 hidden sm:flex border border-zinc-800 bg-zinc-950 items-center justify-center relative overflow-hidden">

      <div className="absolute w-96 h-96 bg-[#abe3d6]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute w-72 h-72 bg-[#abe3d6]/5 rounded-full blur-3xl top-1/3 left-1/3 animate-pulse delay-700" />

      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#abe3d6 1px, transparent 1px), linear-gradient(90deg, #abe3d6 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="absolute top-16 left-20 animate-float">
        <div className="bg-zinc-900 border border-[#abe3d6]/20 rounded-2xl rounded-bl-none px-4 py-2 text-zinc-300 text-sm shadow-lg shadow-[#abe3d6]/5">
          Hey! 👋
        </div>
      </div>

      <div className="absolute bottom-24 right-24 animate-float-delayed">
        <div className="bg-zinc-900 border border-[#abe3d6]/20 rounded-2xl rounded-br-none px-4 py-2 text-zinc-300 text-sm shadow-lg shadow-[#abe3d6]/5">
          What's up?
        </div>
      </div>

      <div className="absolute top-1/3 right-16 animate-float-slow">
        <div className="bg-zinc-900 border border-[#abe3d6]/20 rounded-full px-3 py-2 text-[#abe3d6]/70 shadow-lg shadow-[#abe3d6]/5">
          •••
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
        <div className="w-16 h-16 rounded-full bg-zinc-900 border border-[#abe3d6]/30 flex items-center justify-center mb-2 animate-bounce-slow shadow-lg shadow-[#abe3d6]/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#abe3d6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white">
          Let's start <span className="text-[#abe3d6]">chatting!</span>
        </h1>
        <p className="text-zinc-500 text-sm max-w-xs">
          Select a friend from the list to begin a conversation, or find someone new to connect with.
        </p>

        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#abe3d6]/50 to-transparent mt-1" />
      </div>

      <div className="absolute top-10 right-10 text-[#abe3d6]/30 text-xl animate-pulse">✦</div>
      <div className="absolute bottom-16 left-16 text-[#abe3d6]/20 text-lg animate-pulse delay-500">✦</div>
    </div>
  )
}

export default EmptyChatState