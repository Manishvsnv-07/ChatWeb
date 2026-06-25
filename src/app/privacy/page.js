import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-200 px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-zinc-500 mb-10 text-sm">Last updated: June 2025</p>

        <div className="space-y-8 text-zinc-400 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">Information We Collect</h2>
            <p>
              We collect information you provide directly — such as your name, email, profile
              picture, and any content you post. We also collect basic usage data to improve
              the platform experience.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">How We Use It</h2>
            <p>
              Your data is used solely to operate and improve ChatWeb. We do not sell your
              personal information to third parties. Ever.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">Cookies</h2>
            <p>
              We use httpOnly cookies for secure authentication. These cookies are necessary
              for the app to function and cannot be used to track you across other websites.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">Your Rights</h2>
            <p>
              You can request deletion of your account and all associated data at any time
              by contacting us. We will process your request within 7 days.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">Contact</h2>
            <p>
              Questions about privacy? Reach us at{" "}
              <a href="mailto:privacy@chatweb.com" className="text-blue-400 hover:underline">
                privacy@chatweb.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page