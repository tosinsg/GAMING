import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg relative py-20 md:py-32">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-gaming text-4xl md:text-6xl lg:text-7xl text-white mb-6">
            Welcome to <span className="text-red-500">FF ARENA</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            The ultimate destination for Free Fire gamers and fans
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white font-gaming text-lg">
              <Link href="/download">Download Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-red-500 text-red-500 hover:bg-red-500/10 font-gaming text-lg"
            >
              <Link href="/signup">Join Community</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-gaming text-3xl md:text-4xl text-center text-white mb-12">
            Why Join <span className="text-red-500">FF ARENA</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-red-500/20 hover:border-red-500/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="font-gaming text-xl text-white mb-2">Latest Strategies</h3>
                <p className="text-gray-400">
                  Access exclusive tips, tricks, and strategies from top Free Fire players.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-red-500/20 hover:border-red-500/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-gaming text-xl text-white mb-2">Community Events</h3>
                <p className="text-gray-400">
                  Join tournaments, challenges, and events with other Free Fire enthusiasts.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-red-500/20 hover:border-red-500/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="font-gaming text-xl text-white mb-2">Exclusive Content</h3>
                <p className="text-gray-400">Get access to exclusive wallpapers, guides, and in-game content.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-gaming text-3xl md:text-4xl text-white">
              Latest <span className="text-red-500">Blog Posts</span>
            </h2>
            <Link href="/blog" className="text-red-500 hover:text-red-400 font-gaming">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-red-500/20 overflow-hidden blog-card">
              <div className="h-48 bg-gray-700 relative">
                <img
                  src="/images/blog/update-features.png"
                  alt="Latest Free Fire Update"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="text-red-500 text-sm mb-2">May 5, 2025</div>
                <h3 className="font-gaming text-xl text-white mb-2">
                  Latest Free Fire Update: New Features and Characters
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  Explore the newest additions to Free Fire in the latest update, including new characters, weapons, and
                  game modes.
                </p>
                <Link href="/blog/latest-update-features" className="text-red-500 hover:text-red-400 font-medium">
                  Read More →
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-red-500/20 overflow-hidden blog-card">
              <div className="h-48 bg-gray-700 relative">
                <img src="/images/blog/top-weapons.png" alt="Top Weapons" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="text-red-500 text-sm mb-2">May 3, 2025</div>
                <h3 className="font-gaming text-xl text-white mb-2">Top 10 Weapons for Ranked Matches in Free Fire</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  Discover the most effective weapons to use in ranked matches to climb the leaderboards and dominate
                  your opponents.
                </p>
                <Link href="/blog/top-weapons-ranked" className="text-red-500 hover:text-red-400 font-medium">
                  Read More →
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-red-500/20 overflow-hidden blog-card">
              <div className="h-48 bg-gray-700 relative">
                <img
                  src="/images/blog/character-combinations.png"
                  alt="Character Combinations"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="text-red-500 text-sm mb-2">April 29, 2025</div>
                <h3 className="font-gaming text-xl text-white mb-2">
                  Best Character Combinations for Different Play Styles
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  Learn which character combinations work best for aggressive, defensive, or support play styles in Free
                  Fire.
                </p>
                <Link href="/blog/character-combinations" className="text-red-500 hover:text-red-400 font-medium">
                  Read More →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-gaming text-3xl md:text-4xl text-center text-white mb-12">
            Join Our <span className="text-red-500">Community</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gray-800 border-red-500/20 overflow-hidden">
              <CardContent className="p-8">
                <h3 className="font-gaming text-2xl text-white mb-4">Create Your Account</h3>
                <p className="text-gray-400 mb-6">
                  Sign up to become a member of the FF Arena community. Get access to exclusive content, participate in
                  discussions, and connect with other Free Fire players.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 text-red-500 mr-3">✓</div>
                    <p className="text-gray-300">Personalized game statistics tracking</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 text-red-500 mr-3">✓</div>
                    <p className="text-gray-300">Join tournaments and community events</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 text-red-500 mr-3">✓</div>
                    <p className="text-gray-300">Connect with other Free Fire players</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 text-red-500 mr-3">✓</div>
                    <p className="text-gray-300">Access to premium guides and strategies</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white font-gaming">
                    <Link href="/signup">Create Account</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-red-500/20 overflow-hidden">
              <CardContent className="p-8">
                <h3 className="font-gaming text-2xl text-white mb-4">Already a Member?</h3>
                <p className="text-gray-400 mb-6">
                  Log in to your FF Arena account to access your profile, track your stats, and connect with the
                  community.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 text-red-500 mr-3">✓</div>
                    <p className="text-gray-300">View your game statistics and progress</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 text-red-500 mr-3">✓</div>
                    <p className="text-gray-300">Participate in community discussions</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 text-red-500 mr-3">✓</div>
                    <p className="text-gray-300">Upload screenshots to the gallery</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 text-red-500 mr-3">✓</div>
                    <p className="text-gray-300">Customize your profile and settings</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Button asChild className="w-full bg-gray-700 hover:bg-gray-600 text-white font-gaming">
                    <Link href="/login">Login to Account</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-900/50 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-gaming text-3xl md:text-4xl text-white mb-6">
            Ready to Join the <span className="text-red-500">Battle</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Download Free Fire now and become part of our growing community of gamers!
          </p>
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white font-gaming text-lg glow-effect">
            <Link href="/download">Download Free Fire</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
