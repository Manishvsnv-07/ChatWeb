import React from 'react'

const SideviewCreate = () => {
  return (
    <div className='relative w-1/2 lg:w-2/3 hidden sm:block h-full overflow-hidden'>

      {/* Background image */}
      <div className='absolute inset-0 bg-[url(/imgs/createAccount2.png)] bg-cover bg-center scale-105 blur-[2px]' />

      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black/50' />

      {/* Glow orbs */}
      <div className='absolute top-[-80px] left-[-60px] w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse' />
      <div className='absolute bottom-[-60px] right-[-40px] w-56 h-56 bg-emerald-300/15 rounded-full blur-2xl animate-pulse delay-1000' />

      {/* Content */}
      <div className='relative z-10 flex flex-col justify-between h-full px-10 py-12'>

        {/* Top — Logo + Brand */}
        <div className='flex items-center gap-3'>
          <img
            src='/imgs/logo.png'
            className='w-15 h-15 rounded-full'
            alt='ChatWeb logo'
          />
          <span className='text-white font-semibold text-lg tracking-wide'>ChatWeb</span>
        </div>

        {/* Middle — Main copy */}
        <div className='flex flex-col gap-4'>
          <div className='w-10 h-[3px] bg-green-400 rounded-full' />
          <h1 className='text-white text-5xl font-bold leading-tight tracking-tight'>
            Connect.<br />
            Share.<br />
            <span className='text-green-400'>Be you.</span>
          </h1>
          <p className='text-white/60 text-sm max-w-xs leading-relaxed'>
            Join thousands of people already sharing their world on ChatWeb.
          </p>
        </div>

        {/* Bottom — Social proof */}
        <div className='flex items-center gap-3'>
          <div className='flex -space-x-2'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='w-8 h-8 rounded-full bg-gradient-to-br from-green-300 to-emerald-600 ring-2 ring-black/40'
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

export default SideviewCreate