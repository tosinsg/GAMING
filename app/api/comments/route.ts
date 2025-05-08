import { NextResponse } from "next/server"

// Mock database for comments
const comments: {
  id: string
  blogId: string
  name: string
  email: string
  content: string
  createdAt: string
}[] = []

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const blogId = searchParams.get("blogId")

    if (!blogId) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 })
    }

    // Filter comments by blog ID
    const blogComments = comments.filter((comment) => comment.blogId === blogId)

    return NextResponse.json(blogComments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { blogId, name, email, content } = data

    // Validate the data
    if (!blogId || !name || !email || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a new comment
    const newComment = {
      id: Date.now().toString(),
      blogId,
      name,
      email,
      content,
      createdAt: new Date().toISOString(),
    }

    // Add to our mock database
    comments.push(newComment)

    return NextResponse.json({ success: true, comment: newComment })
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
  }
}
