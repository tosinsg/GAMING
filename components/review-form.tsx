"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Review {
  id: string
  name: string
  rating: number
  content: string
  createdAt: string
}

export function ReviewForm() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    content: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews")
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error("Error fetching reviews:", error)
    }
  }

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === "rating" ? Number.parseInt(value) : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Your review has been posted!")
        setFormData({
          name: "",
          email: "",
          rating: 5,
          content: "",
        })
        // Refresh reviews
        fetchReviews()
      } else {
        setError(data.error || "Failed to post review")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-5 w-5 ${star <= rating ? "text-yellow-400" : "text-gray-400"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-gaming text-2xl text-white mb-6">Game Reviews</h3>

        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-red-500/20 text-red-500">{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-medium">{review.name}</h4>
                      <span className="text-gray-400 text-sm">{formatDate(review.createdAt)}</span>
                    </div>
                    <div className="mt-1">{renderStars(review.rating)}</div>
                    <p className="text-gray-300 mt-2">{review.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No reviews yet. Be the first to review!</p>
        )}
      </div>

      <div className="border-t border-gray-700 pt-8">
        <h3 className="font-gaming text-xl text-white mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <div>
            <label htmlFor="rating" className="block text-gray-300 mb-2">
              Rating
            </label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
            >
              <option value="5">5 Stars - Excellent</option>
              <option value="4">4 Stars - Very Good</option>
              <option value="3">3 Stars - Good</option>
              <option value="2">2 Stars - Fair</option>
              <option value="1">1 Star - Poor</option>
            </select>
          </div>
          <div>
            <label htmlFor="content" className="block text-gray-300 mb-2">
              Your Review
            </label>
            <Textarea
              id="content"
              name="content"
              rows={4}
              value={formData.content}
              onChange={handleChange}
              required
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          {error && <div className="bg-red-900/50 text-red-400 p-3 rounded-md">{error}</div>}
          {success && <div className="bg-green-900/50 text-green-400 p-3 rounded-md">{success}</div>}

          <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700 text-white">
            {isLoading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </div>
    </div>
  )
}
