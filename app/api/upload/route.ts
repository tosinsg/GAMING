import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File
    const title = formData.get("title") as string
    const description = formData.get("description") as string

    if (!image || !title) {
      return NextResponse.json({ error: "Image and title are required" }, { status: 400 })
    }

    // Instead of trying to write to the file system, just log the upload
    console.log("Received image upload:", {
      filename: image.name,
      size: image.size,
      type: image.type,
      title,
      description,
    })

    // Return a mock success response
    const mockMetadata = {
      id: Date.now(),
      filename: image.name,
      title,
      description,
      uploadDate: new Date().toISOString(),
      path: `/uploads/${Date.now()}-${image.name}`,
    }

    return NextResponse.json({ success: true, image: mockMetadata })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
