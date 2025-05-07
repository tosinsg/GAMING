import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getBlogPosts } from "@/lib/blog"

export default function BlogPage() {
  const blogPosts = getBlogPosts()

  return (
    <div className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-gaming text-4xl md:text-5xl text-white mb-8">
          FF Arena <span className="text-red-500">Blog</span>
        </h1>
        <p className="text-gray-300 mb-12 text-lg max-w-3xl">
          Stay updated with the latest Free Fire news, tips, strategies, and community events. Our blog is regularly
          updated with fresh content for all Free Fire enthusiasts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-gray-800 border-red-500/20 overflow-hidden blog-card">
              <div className="h-48 bg-gray-700 relative">
                {post.image ? (
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500">Featured Image</span>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="text-red-500 text-sm mb-2">{post.date}</div>
                <h3 className="font-gaming text-xl text-white mb-2">{post.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-red-500 hover:text-red-400 font-medium">
                  Read More →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
