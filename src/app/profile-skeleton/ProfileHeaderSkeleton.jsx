import React from 'react'

const ProfileHeaderSkeleton = () => {
  return (
    <div className="w-full h-15 bg-[#75d1bc9b] flex items-center justify-between p-5">
      <div className="flex items-center gap-7">
        <div className="w-11 h-11 rounded-full skeleton-shimmer" />
        <div className="w-28 h-9 rounded-2xl skeleton-shimmer" />
      </div>
      <div className="flex items-center gap-7">
        <div className="w-28 h-9 rounded-2xl skeleton-shimmer" />
        <div className="w-8 h-8 rounded-full skeleton-shimmer" />
      </div>
    </div>
  )
}

export default ProfileHeaderSkeleton
