"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Comment {
  id: string
  name: string
  content: string
  createdAt: string
}

interface CommentFormProps {
  blogId: string
}

export function CommentForm({ blogId }: CommentFormProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?blogId=${blogId}`)
      const data = await response.json()
      setComments(data)
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  // Fetch comments on component mount
  useEffect(() => {
    fetchComments()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId,
          ...formData,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Your comment has been posted!")
        setFormData({
          name: "",
          email: "",
          content: "",
        })
        // Refresh comments
        fetchComments()
      } else {
        setError(data.error || "Failed to post comment")
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

  return (
    <div className="mt-12 space-y-8">
      <div className="border-t border-gray-700 pt-8">
        <h3 className="font-gaming text-2xl text-white mb-6">Comments</h3>

        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-red-500/20 text-red-500">{comment.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">{comment.name}</h4>
                    <span className="text-gray-400 text-sm">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-gray-300 mt-2">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No comments yet. Be the first to comment!</p>
        )}
      </div>

      <div className="border-t border-gray-700 pt-8">
        <h3 className="font-gaming text-xl text-white mb-4">Leave a Comment</h3>
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
            <label htmlFor="content" className="block text-gray-300 mb-2">
              Your Comment
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
            {isLoading ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      </div>
    </div>
  )
}
