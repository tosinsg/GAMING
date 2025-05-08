"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>("An unknown error occurred")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const error = searchParams.get("error")
    setIsLoading(false)

    // If no error parameter is provided, show a generic message
    if (!error) {
      setErrorMessage("No specific error was provided. This page handles authentication errors.")
      return
    }

    switch (error) {
      case "Configuration":
        setErrorMessage("There is a problem with the server configuration.")
        break
      case "AccessDenied":
        setErrorMessage("You do not have permission to sign in.")
        break
      case "Verification":
        setErrorMessage("The verification link may have been used or has expired.")
        break
      case "CredentialsSignin":
        setErrorMessage("The email or password you entered is incorrect.")
        break
      case "OAuthSignin":
        setErrorMessage("Error occurred while signing in with OAuth provider.")
        break
      case "OAuthCallback":
        setErrorMessage("Error occurred while processing the OAuth callback.")
        break
      case "OAuthCreateAccount":
        setErrorMessage("Error occurred while creating an account using OAuth provider.")
        break
      case "EmailCreateAccount":
        setErrorMessage("Error occurred while creating an account using email provider.")
        break
      case "Callback":
        setErrorMessage("Error occurred during the authentication callback.")
        break
      case "OAuthAccountNotLinked":
        setErrorMessage("This email is already associated with another account.")
        break
      case "EmailSignin":
        setErrorMessage("Error sending the email for sign in.")
        break
      case "SessionRequired":
        setErrorMessage("You must be signed in to access this page.")
        break
      default:
        setErrorMessage(`Authentication error: ${error}`)
    }
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="py-12 bg-black min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-black min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gray-800 border-red-500/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-gaming text-white">Authentication Error</CardTitle>
            <CardDescription className="text-gray-400">There was a problem with your authentication</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-red-900/50 text-red-400 p-4 rounded-md mb-6">
              <p>{errorMessage}</p>
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
