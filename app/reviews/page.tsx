import { ReviewForm } from "@/components/review-form"

export default function ReviewsPage() {
  return (
    <div className="py-12 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-gaming text-4xl md:text-5xl text-white mb-8">
          Free Fire <span className="text-red-500">Reviews</span>
        </h1>
        <p className="text-gray-300 mb-12 text-lg max-w-3xl">
          Share your thoughts and experiences with Free Fire. Read what other players think about the game, characters,
          and features.
        </p>

        <ReviewForm />
      </div>
    </div>
  )
}
