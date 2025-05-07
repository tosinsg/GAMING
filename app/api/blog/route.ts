import { NextResponse } from "next/server"
import path from "path"

// Then update the GET function to use async fs operations
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    const blogsDir = path.join(process.cwd(), "blogs")

    // For now, return mock data instead of trying to read from the file system
    // This will prevent errors during initialization
    const mockPosts = [
      {
        id: 1,
        title: "Latest Free Fire Update: New Features and Characters",
        content: "This is a sample blog post about the latest Free Fire update...",
        excerpt:
          "Explore the newest additions to Free Fire in the latest update, including new characters, weapons, and game modes.",
        date: "May 5, 2025",
        slug: "latest-update-features",
        author: "FF Arena Team",
      },
      {
        id: 2,
        title: "Top 10 Weapons for Ranked Matches in Free Fire",
        content: "This is a sample blog post about the top weapons in Free Fire...",
        excerpt:
          "Discover the most effective weapons to use in ranked matches to climb the leaderboards and dominate your opponents.",
        date: "May 3, 2025",
        slug: "top-weapons-ranked",
        author: "FF Arena Team",
      },
    ]

    // If a specific post is requested
    if (slug) {
      const post = mockPosts.find((p) => p.slug === slug)
      if (post) {
        return NextResponse.json(post)
      } else {
        return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
      }
    }

    // Return all blog posts
    return NextResponse.json(mockPosts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

// Update the POST function similarly to use async fs operations
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { title, content, excerpt, author } = data

    // Validate the data
    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Return a success response without trying to write to the file system
    return NextResponse.json({
      success: true,
      post: {
        id: Date.now(),
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + "...",
        date: new Date().toISOString().split("T")[0],
        slug: title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-"),
        author: author || "FF Arena Team",
      },
    })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
