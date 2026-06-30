import Image from 'next/image'
import React from 'react'

const Sideview = () => {
  return (
    <div className='relative hidden sm:block sm:w-1/2 lg:w-2/3 h-full overflow-hidden'>
    <div className="absolute inset-0 -z-10">
  <Image
    src="/imgs/bg2.webp"
    alt=""
    fill
    priority
    quality={75}
    sizes="65vw"
    className="object-cover scale-105 blur-[1px] saturate-250"
  />
</div>
      <div className='absolute inset-0 bg-black/50' />

      <div className='absolute top-[-80px] left-[-60px] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse' />
      <div className='absolute bottom-[-60px] right-[-40px] w-56 h-56 bg-emerald-300/15 rounded-full blur-2xl animate-pulse delay-1000' />

      <div className='relative z-10 flex flex-col justify-between h-full px-10 py-12'>
    
        <div className='flex items-center gap-3'>
          <img
            src='/imgs/logo.png'
            className='w-15 h-15 rounded-full'
            alt='ChatWeb logo'
          />
          <span className='text-white font-semibold text-lg tracking-wide'>ChatWeb</span>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='w-10 h-[3px] bg-[#8ee4cd] rounded-full' />
          <h1 className='text-white text-5xl font-bold leading-tight tracking-tight'>
            Connect.<br />
            Share.<br />
            <span className='text-[#8ee4cd]'>Be you.</span>
          </h1>
          <p className='text-white/60 text-sm max-w-xs leading-relaxed'>
            Join thousands of people already sharing their world on ChatWeb.
          </p>
        </div>
        
        <div className='flex items-center gap-3'>
          <div className='flex -space-x-2'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='w-8 h-8 rounded-full bg-gradient-to-br from-[#8ee4cd] to-[#8ee4cd] ring-2 ring-black/40'
              />
            ))}
          </div>
          <p className='text-white/50 text-xs'>
            1,000+ people joined this week
          </p>
        </div>

      </div>
    </div>
  )
}

export default Sideview
