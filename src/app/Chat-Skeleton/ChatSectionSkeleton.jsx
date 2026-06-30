import React from 'react'

const ChatSectionSkeleton = () => {
  return (
    <div className="w-full sm:w-3/4 border border-black flex flex-col h-full">
    

    <div className="w-full h-1/10 flex gap-4 text-white border-b border-zinc-400 justify-between items-center px-5 animate-pulse">
      <div className="flex gap-4 items-center">

        <div className="w-11 h-11 rounded-full bg-zinc-500 shrink-0" />
        <div className="flex flex-col gap-2">
          <div className="h-3 bg-zinc-500 rounded w-28" />
          <div className="h-2 bg-zinc-500 rounded w-16" />
        </div>
      </div>

      <div className="w-6 h-6 rounded bg-zinc-500" />
    </div>

    <div className="w-full h-4/5 p-4 overflow-auto flex flex-col gap-3 animate-pulse">
      <div className="h-8 bg-zinc-500 rounded-md w-1/3 self-start" />
      <div className="h-8 bg-zinc-500 rounded-md w-2/5 self-end" />
      <div className="h-8 bg-zinc-500 rounded-md w-1/4 self-start" />
      <div className="h-8 bg-zinc-500 rounded-md w-1/3 self-end" />
      <div className="h-10 bg-zinc-500 rounded-md w-2/5 self-start" />
      <div className="h-8 bg-zinc-500 rounded-md w-1/4 self-end" />
      <div className="h-8 bg-zinc-500 rounded-md w-1/3 self-start" />
      <div className="h-8 bg-zinc-500 rounded-md w-2/5 self-end" />
    </div>


    <div className="w-full h-1/10 pb-1 px-2 flex items-center animate-pulse">
      <div className="w-full h-10 bg-zinc-500 rounded-md" />
    </div>
  </div>
  )
}

export default ChatSectionSkeleton
