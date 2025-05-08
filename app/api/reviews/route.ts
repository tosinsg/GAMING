import { NextResponse } from "next/server"

// Mock database for reviews
const reviews: {
  id: string
  rating: number
  name: string
  email: string
  content: string
  createdAt: string
}[] = []

export async function GET(request: Request) {
  try {
    // Return all reviews
    return NextResponse.json(reviews)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { rating, name, email, content } = data

    // Validate the data
    if (!rating || !name || !email || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    // Create a new review
    const newReview = {
      id: Date.now().toString(),
      rating,
      name,
      email,
      content,
      createdAt: new Date().toISOString(),
    }

    // Add to our mock database
    reviews.push(newReview)

    return NextResponse.json({ success: true, review: newReview })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
