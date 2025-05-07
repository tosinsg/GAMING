import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DownloadPage() {
  return (
    <div className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-gaming text-4xl md:text-5xl text-white mb-8">
          Download <span className="text-red-500">Free Fire</span>
        </h1>
        <p className="text-gray-300 mb-12 text-lg max-w-3xl">
          Download Free Fire for your device and join millions of players worldwide in the ultimate battle royale
          experience!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gray-800 border-red-500/20 overflow-hidden">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v18m0 0l-5.5-5.5M9 21l5.5-5.5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v18m0 0l-5.5-5.5M9 21l5.5-5.5"
                  />
                </svg>
              </div>
              <h2 className="font-gaming text-2xl text-white mb-4">Android Download</h2>
              <p className="text-gray-400 mb-6">Download Free Fire for Android devices from the Google Play Store.</p>
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-gaming text-lg download-button w-full"
              >
                <a
                  href="https://play.google.com/store/apps/details?id=com.dts.freefireth"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download for Android
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-red-500/20 overflow-hidden">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="font-gaming text-2xl text-white mb-4">iOS Download</h2>
              <p className="text-gray-400 mb-6">Download Free Fire for iPhone and iPad from the App Store.</p>
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-gaming text-lg download-button w-full"
              >
                <a href="https://apps.apple.com/app/id1300146617" target="_blank" rel="noopener noreferrer">
                  Download for iOS
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 border border-red-500/20">
          <h2 className="font-gaming text-2xl text-white mb-4">System Requirements</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-gaming text-xl text-red-500 mb-2">Android Requirements</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Android 4.1 or higher</li>
                <li>• At least 2GB RAM</li>
                <li>• 4GB free storage space</li>
                <li>• Stable internet connection</li>
              </ul>
            </div>

            <div>
              <h3 className="font-gaming text-xl text-red-500 mb-2">iOS Requirements</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• iOS 11.0 or higher</li>
                <li>• iPhone 6s or newer</li>
                <li>• 4GB free storage space</li>
                <li>• Stable internet connection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
