import React, { useState } from 'react'
import { Star, MessageCircle, ThumbsUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TopNavigation from './navigation/TopNavigation'
import LeftSidebar from './navigation/LeftSidebar'
import RightSidebar from './navigation/RightSidebar'

export default function CommunityPage() {
  const [reviews, setReviews] = useState([
    { id: 1, user: 'AnimeGuru', avatar: '/placeholder.svg?height=40&width=40', anime: 'Attack on Titan', rating: 5, content: 'Absolutely mind-blowing! The plot twists keep you on the edge of your seat.', likes: 42, comments: 15 },
    { id: 2, user: 'OtakuQueen', avatar: '/placeholder.svg?height=40&width=40', anime: 'My Hero Academia', rating: 4, content: 'Great character development and exciting action scenes!', likes: 38, comments: 10 },
  ])

  const [newReview, setNewReview] = useState({ anime: '', rating: 0, content: '' })

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReview.anime && newReview.rating && newReview.content) {
      setReviews([...reviews, { id: reviews.length + 1, user: 'CurrentUser', avatar: '/placeholder.svg?height=40&width=40', ...newReview, likes: 0, comments: 0 }])
      setNewReview({ anime: '', rating: 0, content: '' })
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <LeftSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation />
        <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-900 to-gray-800 p-8">
          <h1 className="text-3xl font-bold text-red-500 mb-8">Anime Community</h1>

          <Card className="mb-8 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-red-500">Share Your Thoughts</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <Input
                  placeholder="Anime Title"
                  value={newReview.anime}
                  onChange={(e) => setNewReview({ ...newReview, anime: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`cursor-pointer ${newReview.rating >= star ? 'text-yellow-500' : 'text-gray-500'}`}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                    />
                  ))}
                </div>
                <Textarea
                  placeholder="Write your review..."
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">Post Review</Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={review.avatar} alt={review.user} />
                      <AvatarFallback>{review.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-red-400">{review.user}</h3>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${review.rating >= star ? 'text-yellow-500' : 'text-gray-500'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{review.anime}</p>
                      <p className="mt-2 text-gray-300">{review.content}</p>
                      <div className="flex items-center space-x-4 mt-4">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          {review.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {review.comments}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  )
}