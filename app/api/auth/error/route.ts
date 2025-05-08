import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // Get the error parameter from the URL
    const { searchParams } = new URL(request.url)
    const error = searchParams.get("error")

    // If accessed directly without an error parameter
    if (!error) {
      return NextResponse.json(
        {
          status: "info",
          message: "This is the NextAuth error API endpoint",
          usage: "Access with ?error=[ERROR_TYPE] to see specific error details",
          examples: {
            credentialsSignin: "/api/auth/error?error=CredentialsSignin",
            accessDenied: "/api/auth/error?error=AccessDenied",
            configuration: "/api/auth/error?error=Configuration",
          },
          documentation: "https://next-auth.js.org/errors",
        },
        { status: 200 },
      )
    }

    // Handle specific error types
    let errorMessage = "An unknown authentication error occurred"
    let errorDetails = null
    let statusCode = 400

    switch (error) {
      case "Configuration":
        errorMessage = "There is a problem with the server authentication configuration."
        errorDetails = "Check your NextAuth configuration and environment variables."
        statusCode = 500
        break
      case "AccessDenied":
        errorMessage = "You do not have permission to sign in."
        errorDetails = "Your account may not have the necessary permissions."
        statusCode = 403
        break
      case "Verification":
        errorMessage = "The verification link may have been used or has expired."
        errorDetails = "Request a new verification link."
        statusCode = 400
        break
      case "CredentialsSignin":
        errorMessage = "The email or password you entered is incorrect."
        errorDetails = "Check your credentials and try again."
        statusCode = 401
        break
      case "OAuthSignin":
        errorMessage = "Error occurred while signing in with OAuth provider."
        errorDetails = "There was a problem with the OAuth sign-in process."
        statusCode = 500
        break
      case "OAuthCallback":
        errorMessage = "Error occurred while processing the OAuth callback."
        errorDetails = "There was a problem completing the OAuth authentication."
        statusCode = 500
        break
      case "SessionRequired":
        errorMessage = "You must be signed in to access this page."
        errorDetails = "Please sign in to continue."
        statusCode = 401
        break
      default:
        errorMessage = `Authentication error: ${error}`
        errorDetails = "An unspecified authentication error occurred."
        statusCode = 400
    }

    // Return a proper JSON response with the error
    return NextResponse.json(
      {
        status: "error",
        code: error,
        message: errorMessage,
        details: errorDetails,
      },
      { status: statusCode },
    )
  } catch (err) {
    console.error("Error in auth error route:", err)
    // Make sure we return a valid JSON response even in case of error
    return NextResponse.json(
      {
        status: "error",
        code: "server_error",
        message: "Internal server error in auth error handler",
        details: err instanceof Error ? err.message : "Unknown server error",
      },
      { status: 500 },
    )
  }
}
