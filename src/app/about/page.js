import React from 'react'

const page = () => {
  return (
    <main className="min-h-dvh bg-zinc-950 text-zinc-200 px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">About ChatWeb</h1>
        <p className="text-zinc-500 mb-10 text-sm">Who we are and what we're building</p>

        <div className="space-y-8 text-zinc-400 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">What is ChatWeb?</h2>
            <p>
              ChatWeb is a modern social media platform where people connect, share moments,
              and build communities. Whether it's photos, thoughts, or real-time conversations —
              ChatWeb is your space to express yourself.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">Our Mission</h2>
            <p>
              We believe in open, authentic connections. Our goal is to build a platform that
              puts people first — no algorithmic manipulation, no ads in your face, just genuine
              social interaction.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">Built by</h2>
            <p>
              ChatWeb is independently built and maintained by a passionate developer focused
              on creating meaningful digital experiences.
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">Creator</h2>
            <div className="space-y-1 text-sm">
              <p className="text-zinc-300">
                <span className="text-zinc-500">Name:</span> Manish Vaishnav
              </p>
              <p className="text-zinc-300">
                <span className="text-zinc-500">Profession:</span> Student
              </p>
              <p className="text-zinc-300">
                <span className="text-zinc-500">Contact:</span>{' '}
                <a href="tel:+919521278385" className="text-[#abe3d6] hover:underline">
                  +91 95212 78385
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page