const AboutUsersSkeleton = () => {
  return (
    <div className="AboutUsers w-full h-full flex flex-col">
      

      <div className="w-full h-1/2 bg-[#75d1bc9b] flex justify-center items-center gap-11">
        
        <div className="w-50 h-50 rounded-full skeleton-shimmer" />
        <div className="flex flex-col gap-5">
          <div className="w-36 h-10 rounded-md skeleton-shimmer" />
          <div className="w-36 h-10 rounded-md skeleton-shimmer" />
          <div className="w-36 h-10 rounded-md skeleton-shimmer" />
          <div className="w-36 h-10 rounded-md skeleton-shimmer" />
          <div className="w-36 h-10 rounded-md skeleton-shimmer" />
        </div>
      </div>

      <div className="h-1/2 bg-white flex flex-col">

        <div className="w-full h-1/5 flex justify-center items-center gap-5">
          <div className="w-28 h-6 rounded skeleton-shimmer" />
          <div className="w-20 h-8 rounded-md skeleton-shimmer" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='h-15 px-5 py-2 bg-[#75d1bc54] rounded-md flex justify-between items-center'>

              <div className='w-11 h-11 rounded-full skeleton-shimmer' />

              <div className='flex flex-col gap-2'>
                <div className='w-20 h-4 rounded skeleton-shimmer' />
                <div className='w-14 h-3 rounded skeleton-shimmer' />
              </div>
              <div className='w-7 h-7 rounded-full skeleton-shimmer' />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default AboutUsersSkeleton