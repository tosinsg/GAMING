import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, subject, message } = data

    // Validate the data
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a message object with timestamp
    const messageObj = {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    }

    // Instead of trying to write to the file system, just log the message
    console.log("Received contact form submission:", messageObj)

    // Return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
