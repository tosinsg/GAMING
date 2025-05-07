import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const error = searchParams.get("error")

  // Log the error for debugging
  console.error("Auth error:", error)

  // Return a proper JSON response
  return NextResponse.json({ error: error || "Unknown error" }, { status: 400 })
}
