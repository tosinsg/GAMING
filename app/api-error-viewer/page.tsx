"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ApiErrorViewer() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [errorData, setErrorData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [customError, setCustomError] = useState("")

  const errorType = searchParams.get("error") || ""

  useEffect(() => {
    async function fetchErrorInfo() {
      try {
        setLoading(true)
        setError(null)

        const url = errorType ? `/api/auth/error?error=${encodeURIComponent(errorType)}` : "/api/auth/error"

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setErrorData(data)
      } catch (err) {
        console.error("Error fetching error info:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchErrorInfo()
  }, [errorType])

  const updateErrorType = (newErrorType: string) => {
    const params = new URLSearchParams(searchParams)
    if (newErrorType) {
      params.set("error", newErrorType)
    } else {
      params.delete("error")
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="py-12 bg-black min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-gaming text-3xl md:text-4xl text-white mb-8">
          API Error <span className="text-red-500">Viewer</span>
        </h1>

        <Card className="bg-gray-800 border-red-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white">
              {errorType ? `Testing Error: ${errorType}` : "Default Error Response"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-gray-400 py-4">Loading error information...</div>
            ) : error ? (
              <div className="bg-red-900/50 text-red-400 p-4 rounded-md">{error}</div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-md overflow-auto">
                  <pre className="text-white whitespace-pre-wrap max-h-96 overflow-auto">
                    {JSON.stringify(errorData, null, 2)}
                  </pre>
                </div>

                <div className="text-gray-300">
                  <p>This is a debugging tool to view how the API error endpoint responds to different error types.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-red-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Test Different Error Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  "",
                  "CredentialsSignin",
                  "AccessDenied",
                  "Configuration",
                  "Verification",
                  "OAuthSignin",
                  "SessionRequired",
                ].map((type) => (
                  <Button
                    key={type}
                    variant={errorType === type ? "default" : "outline"}
                    className={errorType === type ? "bg-red-600" : "border-gray-700 text-gray-300"}
                    onClick={() => updateErrorType(type)}
                  >
                    {type || "Default"}
                  </Button>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-700">
                <Label htmlFor="customError" className="text-gray-300 mb-2 block">
                  Custom Error Type
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="customError"
                    value={customError}
                    onChange={(e) => setCustomError(e.target.value)}
                    placeholder="Enter custom error type"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <Button
                    onClick={() => updateErrorType(customError)}
                    disabled={!customError}
                    className="bg-red-600 hover:bg-red-700 text-white whitespace-nowrap"
                  >
                    Test Custom
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
