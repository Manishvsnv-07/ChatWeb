import React from 'react'

const AlluserSkeleton = () => {
  return (
    <div className="flex items-center gap-3 p-2 animate-pulse">
    <div className="w-10 h-10 rounded-full bg-gray-500 shrink-0" />
    <div className="flex flex-col gap-2 flex-1">
      <div className="h-3 bg-gray-500 rounded w-1/2" />
      <div className="h-2 bg-gray-500 rounded w-1/3" />
    </div>
    <div className="h-2 bg-gray-500 rounded w-8 shrink-0" />
  </div>
  )
}

export default AlluserSkeleton
