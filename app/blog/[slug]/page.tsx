import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getBlogPosts } from "@/lib/blog"
import { CommentForm } from "@/components/comment-form"

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const posts = getBlogPosts()
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="py-12 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-red-500 hover:text-red-400 mb-8 inline-block">
          ← Back to Blog
        </Link>

        <Card className="bg-gray-800 border-red-500/20 overflow-hidden">
          <div className="h-64 bg-gray-700 relative">
            {post.image ? (
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-500">Featured Image</span>
              </div>
            )}
          </div>
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="text-red-500 text-sm mb-2">{post.date}</div>
              <h1 className="font-gaming text-3xl md:text-4xl text-white mb-4">{post.title}</h1>
              <div className="text-gray-400">By {post.author}</div>
            </div>

            <div className="prose prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-gray-300 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-700">
              <h3 className="font-gaming text-xl text-white mb-4">Share this post</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-red-500">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500">
                  <span className="sr-only">WhatsApp</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M21.105 4.893C18.856 2.644 15.823 1.368 12.633 1.36c-6.374 0-11.569 5.195-11.569 11.569 0 2.015.521 3.98 1.511 5.713L1.393 25l6.55-1.715c1.68.914 3.565 1.397 5.485 1.397h.005c6.374 0 11.569-5.195 11.569-11.569 0-3.091-1.202-5.996-3.388-8.182l-.51-.038zM12.633 22.42h-.004a9.59 9.59 0 01-4.908-1.347l-.353-.21-3.65.956.975-3.558-.23-.366a9.57 9.57 0 01-1.465-5.097c0-5.298 4.312-9.61 9.614-9.61 2.572.002 4.987 1.003 6.802 2.821a9.55 9.55 0 012.806 6.795c0 5.298-4.312 9.61-9.61 9.61l.023-.004zm5.264-7.194c-.29-.145-1.716-.847-1.982-.944-.266-.097-.46-.145-.653.145-.193.29-.75.944-.919 1.138-.169.194-.338.218-.628.073-.29-.145-1.225-.452-2.332-1.44-.862-.768-1.443-1.718-1.612-2.008-.169-.29-.018-.447.127-.591.13-.13.29-.338.435-.507.145-.169.193-.29.29-.484.097-.194.048-.362-.024-.507-.073-.145-.653-1.573-.895-2.154-.236-.567-.476-.49-.653-.5-.169-.008-.362-.01-.556-.01-.193 0-.507.073-.773.362-.266.29-1.016 1.005-1.016 2.433 0 1.427 1.04 2.806 1.185 3 .145.193 2.04 3.12 4.947 4.373.692.298 1.232.476 1.655.61.695.221 1.328.19 1.83.115.558-.084 1.716-.702 1.958-1.38.242-.678.242-1.26.169-1.38-.073-.121-.266-.193-.556-.338l-.024.004z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <CommentForm blogId={params.slug} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
