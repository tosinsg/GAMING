"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Gallery images with real content
const galleryImages = [
  {
    id: 1,
    title: "Free Fire Battle Royale",
    description: "Epic battle scene from the latest tournament",
    image: "/images/gallery/battle-royale.png",
  },
  {
    id: 2,
    title: "Character Showcase: Alok",
    description: "The popular DJ character with his special abilities",
    image: "/images/gallery/alok.png",
  },
  {
    id: 3,
    title: "Bermuda Map Overview",
    description: "Aerial view of the classic Bermuda map",
    image: "/images/gallery/bermuda.png",
  },
  {
    id: 4,
    title: "Weapon Collection",
    description: "The most powerful weapons in Free Fire",
    image: "/images/gallery/weapons.png",
  },
  {
    id: 5,
    title: "Squad Victory",
    description: "Celebrating a Booyah with the squad",
    image: "/images/gallery/victory.png",
  },
  {
    id: 6,
    title: "Character Abilities",
    description: "Comparison of different character abilities",
    image: "/images/gallery/abilities.png",
  },
  {
    id: 7,
    title: "Gloo Wall Tactics",
    description: "Advanced gloo wall usage in combat",
    image: "/images/gallery/gloo-wall.png",
  },
  {
    id: 8,
    title: "Pet Companions",
    description: "All available pet companions and their abilities",
    image: "/images/gallery/pets.png",
  },
  {
    id: 9,
    title: "Emote Collection",
    description: "Rare and popular emotes from recent events",
    image: "/images/gallery/emotes.png",
  },
]

export default function GalleryPage() {
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    image: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUploadForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm((prev) => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      // For local development, we'll simulate a successful upload
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitResult({
        success: true,
        message: "Your image has been uploaded successfully! It will be reviewed before being added to the gallery.",
      })
      setUploadForm({
        title: "",
        description: "",
        image: null,
      })
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "There was an error uploading your image. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-gaming text-4xl md:text-5xl text-white mb-8">
          FF Arena <span className="text-red-500">Gallery</span>
        </h1>
        <p className="text-gray-300 mb-12 text-lg max-w-3xl">
          Browse our collection of Free Fire screenshots, fan art, and gameplay moments. Upload your own content to
          share with the community!
        </p>

        <div className="gallery-grid mb-16">
          {galleryImages.map((image) => (
            <Card
              key={image.id}
              className="bg-gray-800 border-red-500/20 overflow-hidden hover:border-red-500/50 transition-colors"
            >
              <div className="aspect-square bg-gray-700 relative">
                <img src={image.image || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-gaming text-lg text-white">{image.title}</h3>
                <p className="text-gray-400 text-sm">{image.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card className="bg-gray-800 border-red-500/20 overflow-hidden max-w-md mx-auto">
            <div className="p-6">
              <h3 className="font-gaming text-2xl text-white mb-4 text-center">Upload Your Image</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Select an image to upload:</label>
                  <Input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="w-full bg-gray-700 border-gray-600 text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Title:</label>
                  <Input
                    type="text"
                    name="title"
                    value={uploadForm.title}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Description:</label>
                  <Textarea
                    name="description"
                    value={uploadForm.description}
                    onChange={handleChange}
                    rows={3}
                    required
                    className="w-full bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-gaming"
                >
                  {isSubmitting ? "Uploading..." : "Upload Image"}
                </Button>

                {submitResult && (
                  <div
                    className={`p-4 rounded-md ${
                      submitResult.success ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"
                    }`}
                  >
                    {submitResult.message}
                  </div>
                )}
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
