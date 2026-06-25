import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-200 px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-zinc-500 mb-10 text-sm">Last updated: June 2025</p>

        <div className="space-y-8 text-zinc-400 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">1. Acceptance</h2>
            <p>
              By using ChatWeb, you agree to these terms. If you don't agree, please don't
              use the platform.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">2. Your Account</h2>
            <p>
              You are responsible for maintaining the security of your account. Do not share
              your credentials. You must be at least 13 years old to use ChatWeb.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">3. Content Rules</h2>
            <p>
              You own the content you post. However, by posting on ChatWeb, you grant us a
              license to display it on the platform. Do not post illegal, harmful, or
              hateful content. Violations may result in account suspension.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">4. Prohibited Activity</h2>
            <p>
              Spam, harassment, impersonation, scraping, and any form of abuse are strictly
              prohibited and will result in immediate account termination.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">5. Termination</h2>
            <p>
              We reserve the right to suspend or delete accounts that violate these terms
              without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">6. Changes</h2>
            <p>
              We may update these terms occasionally. Continued use of ChatWeb after changes
              means you accept the new terms.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page