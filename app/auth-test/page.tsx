"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AuthTestPage() {
  const [testResult, setTestResult] = useState<{ success: boolean; data?: any; error?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorType, setErrorType] = useState("")

  const testAuthErrorEndpoint = async (specificError?: string) => {
    setIsLoading(true)
    setTestResult(null)

    try {
      const url = specificError ? `/api/auth/error?error=${encodeURIComponent(specificError)}` : "/api/auth/error"

      const response = await fetch(url)
      const data = await response.json()

      setTestResult({
        success: true,
        data,
      })
    } catch (error) {
      console.error("Error testing auth endpoint:", error)
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="py-12 bg-black min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-gaming text-3xl md:text-4xl text-white mb-8">
          Auth API <span className="text-red-500">Test</span>
        </h1>

        <Card className="bg-gray-800 border-red-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Test Auth Error Endpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Button
                  onClick={() => testAuthErrorEndpoint()}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {isLoading ? "Testing..." : "Test Default (No Error Parameter)"}
                </Button>
              </div>

              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <Label htmlFor="errorType" className="text-gray-300 mb-2 block">
                    Error Type
                  </Label>
                  <Input
                    id="errorType"
                    value={errorType}
                    onChange={(e) => setErrorType(e.target.value)}
                    placeholder="e.g. CredentialsSignin"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <Button
                  onClick={() => testAuthErrorEndpoint(errorType)}
                  disabled={isLoading || !errorType}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Test With Error
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-gray-300">Common error types to test:</p>
                <div className="flex flex-wrap gap-2">
                  {["CredentialsSignin", "AccessDenied", "Configuration", "SessionRequired"].map((type) => (
                    <Button
                      key={type}
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300"
                      onClick={() => {
                        setErrorType(type)
                        testAuthErrorEndpoint(type)
                      }}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {testResult && (
              <div className="mt-6">
                <h3 className="text-white font-medium mb-2">Result:</h3>
                <div className={`p-4 rounded-md ${testResult.success ? "bg-gray-700" : "bg-red-900/50"}`}>
                  {testResult.success ? (
                    <div>
                      <p className="text-green-400 mb-2">Success! Endpoint returned valid JSON:</p>
                      <pre className="bg-gray-900 p-3 rounded text-gray-300 overflow-auto max-h-96">
                        {JSON.stringify(testResult.data, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-red-400">{testResult.error}</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
