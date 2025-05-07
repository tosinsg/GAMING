"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [errorDescription, setErrorDescription] = useState<string>("An error occurred during authentication.")

  useEffect(() => {
    const errorParam = searchParams.get("error")
    setError(errorParam)

    // Set a more descriptive error message based on the error type
    if (errorParam === "Configuration") {
      setErrorDescription("There is a problem with the server configuration.")
    } else if (errorParam === "AccessDenied") {
      setErrorDescription("You do not have permission to sign in.")
    } else if (errorParam === "Verification") {
      setErrorDescription("The verification link may have been used or has expired.")
    } else if (errorParam === "OAuthSignin" || errorParam === "OAuthCallback" || errorParam === "OAuthCreateAccount") {
      setErrorDescription("There was a problem with the OAuth provider authentication.")
    } else if (errorParam === "EmailCreateAccount") {
      setErrorDescription("There was a problem creating your account with this email.")
    } else if (errorParam === "Callback") {
      setErrorDescription("There was a problem with the authentication callback.")
    } else if (errorParam === "OAuthAccountNotLinked") {
      setErrorDescription("This email is already associated with another account.")
    } else if (errorParam === "EmailSignin") {
      setErrorDescription("There was a problem sending the email for sign in.")
    } else if (errorParam === "CredentialsSignin") {
      setErrorDescription("The email or password you entered is incorrect.")
    } else {
      setErrorDescription("An unknown error occurred during authentication.")
    }
  }, [searchParams])

  return (
    <div className="py-12 bg-black min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gray-800 border-red-500/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-gaming text-white">Authentication Error</CardTitle>
            <CardDescription className="text-gray-400">
              {error ? `Error: ${error}` : "An error occurred"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-red-900/50 text-red-400 p-4 rounded-md mb-6">
              <p>{errorDescription}</p>
            </div>
            <p className="text-gray-300 mb-6">Please try again or contact support if the problem persists.</p>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-700 p-6">
            <Button asChild variant="outline" className="border-gray-700 text-gray-300">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/login">Try Again</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
