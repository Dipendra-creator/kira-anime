'use client'

import React, { useState } from "react"
import { Play, Pause, Home, Tv, User, List, Upload, Settings, HelpCircle, LogOut, Grid, Bell, Star, MessageSquare, ThumbsUp, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardCommunity from "@/components/basics/dashboard-community"
import AnimeDashboard from "@/components/basics/anime-dashboard"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const [hoveredAnime, setHoveredAnime] = useState<string | null>(null)
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "AnimeEnthusiast",
      avatar: "/placeholder.svg?height=40&width=40&text=AE",
      title: "Just finished Attack on Titan!",
      content: "What an incredible journey! The ending left me speechless. What did you all think?",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AttackOnTitan-bx7dJ4l2aVU9YJQGIXDyhJ9Hdx3Hd1.jpg",
      likes: 24,
      comments: [
        { user: "TitanFan", content: "I know right? That finale was mind-blowing!" },
        { user: "MangaReader", content: "The anime did justice to the manga. Loved every second of it!" }
      ],
      shares: 5,
    },
    {
      id: 2,
      user: "SportsAnimeGuy",
      avatar: "/placeholder.svg?height=40&width=40&text=SG",
      title: "Haikyuu!! is the best sports anime ever!",
      content: "The character development and intense matches keep me on the edge of my seat. What's your favorite sports anime?",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hikuyu-5a8ES9Ie4r6EDsZHIMAv2MBDDH6beV.jpg",
      likes: 18,
      comments: [
        { user: "VolleyballLover", content: "Couldn't agree more! The teamwork in Haikyuu is unmatched." },
        { user: "SlamDunk4Ever", content: "It's great, but have you watched Slam Dunk? Classic basketball anime!" }
      ],
      shares: 3,
    },
  ])
  const [newPost, setNewPost] = useState({ title: "", content: "" })

  const ContinueWatching = [
    {
      title: "Attack on Titan",
      season: 1,
      episode: 1,
      progress: 65,
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AttackOnTitan-bx7dJ4l2aVU9YJQGIXDyhJ9Hdx3Hd1.jpg",
    },
    {
      title: "Haikyuu!!",
      season: 2,
      episode: 3,
      progress: 40,
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hikuyu-5a8ES9Ie4r6EDsZHIMAv2MBDDH6beV.jpg",
    },
    {
      title: "Kaguya-sama: Love Is War",
      season: 3,
      episode: 2,
      progress: 80,
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Random-18c49dcME3qIA0hHxPVBN5Hlnh5toW.png",
    },
  ]

  const ForYou = [
    { title: "Haikyuu!!", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hikuyu-5a8ES9Ie4r6EDsZHIMAv2MBDDH6beV.jpg" },
    { title: "Kaguya-sama: Love Is War", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Random-18c49dcME3qIA0hHxPVBN5Hlnh5toW.png" },
    { title: "Attack on Titan", imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AttackOnTitan-bx7dJ4l2aVU9YJQGIXDyhJ9Hdx3Hd1.jpg" },
    { title: "One Piece", imageUrl: "/placeholder.svg?height=300&width=200&text=One+Piece" },
  ]

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const post = {
      id: posts.length + 1,
      user: "CurrentUser",
      avatar: "/placeholder.svg?height=40&width=40&text=CU",
      title: newPost.title,
      content: newPost.content,
      image: "",
      likes: 0,
      comments: [],
      shares: 0,
    }
    setPosts([post, ...posts])
    setNewPost({ title: "", content: "" })
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 p-4 flex flex-col">
        <div className="flex items-center mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-xDxKIwL6pL82JMIPzX2rqreFRXl05i.png"
            alt="AnimeHub Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <h1 className="text-xl font-bold text-red-500">AnimeHub</h1>
        </div>
        <nav className="flex-1">
          <h2 className="text-sm font-semibold text-gray-400 mb-2">MENU</h2>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-1 transition-colors hover:bg-red-500 hover:text-white ${
              activeTab === "home" ? "text-red-500" : ""
            }`}
            onClick={() => setActiveTab("home")}
          >
            <Home className="mr-2 h-4 w-4"/>
            Home
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-1 transition-colors hover:bg-red-500 hover:text-white ${
              activeTab === "discovery" ? "text-red-500" : ""
            }`}
            onClick={() => setActiveTab("discovery")}
          >
            <Tv className="mr-2 h-4 w-4"/>
            Discovery
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-1 transition-colors hover:bg-red-500 hover:text-white ${
              activeTab === "community" ? "text-red-500" : ""
            }`}
            onClick={() => setActiveTab("community")}
          >
            <User className="mr-2 h-4 w-4"/>
            Community
          </Button>
          <h2 className="text-sm font-semibold text-gray-400 mb-2">LIBRARY</h2>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-1 transition-colors hover:bg-red-500 hover:text-white ${
              activeTab === "recent" ? "text-red-500" : ""
            }`}
            onClick={() => setActiveTab("recent")}
          >
            <Play className="mr-2 h-4 w-4"/>
            Recent
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-1 transition-colors hover:bg-red-500 hover:text-white ${
              activeTab === "my-list" ? "text-red-500" : ""
            }`}
            onClick={() => setActiveTab("my-list")}
          >
            <List className="mr-2 h-4 w-4"/>
            My List
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-1 transition-colors hover:bg-red-500 hover:text-white ${
              activeTab === "downloads" ? "text-red-500" : ""
            }`}
            onClick={() => setActiveTab("downloads")}
          >
            <Upload className="mr-2 h-4 w-4"/>
            Download
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-1 transition-colors hover:bg-red-500 hover:text-white ${
              activeTab === "settings" ? "text-red-500" : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-2 h-4 w-4"/>
            Settings
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-1 transition-colors hover:bg-red-500 hover:text-white ${
              activeTab === "help" ? "text-red-500" : ""
            }`}
            onClick={() => setActiveTab("help")}
          >
            <HelpCircle className="mr-2 h-4 w-4"/>
            Help
          </Button>
        </nav>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:bg-red-500 hover:text-white transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4"/>
          Logout
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="flex justify-between items-center mb-8">
          <div className="space-x-4">
            <Button
              variant="ghost"
              className="text-red-500 hover:bg-red-500 hover:text-white transition-colors"
            >
              Series
            </Button>
            <Button
              variant="ghost"
              className={"hover:bg-red-500 hover:text-white transition-colors"}
            >
              Movie
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Input
              className="w-64 bg-gray-700 border-gray-600 text-white"
              placeholder="Search..."
            />
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-red-500 hover:text-white transition-colors"
            >
              <Grid className="h-4 w-4"/>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-red-500 hover:text-white transition-colors"
            >
              <Bell className="h-4 w-4"/>
            </Button>
            <Avatar>
              <AvatarImage src="https://i.pinimg.com/736x/5e/67/f8/5e67f80556e7b6b96825e08b6a052487.jpg" alt="User"/>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {activeTab === "home" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-red-500">Trending</h2>
            <Card className="mb-8 bg-gradient-to-r from-red-600 to-pink-600 text-white overflow-hidden relative group">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-4xl mb-2">Attack on Titan</CardTitle>
                    <CardDescription className="text-gray-200">
                      Action, Dark Fantasy, Post-apocalyptic
                    </CardDescription>
                  </div>
                  <Button className="bg-white text-red-600 hover:bg-gray-200 transition-colors z-10">
                    Watch Now
                  </Button>
                </div>
              </CardContent>
              <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AttackOnTitan-bx7dJ4l2aVU9YJQGIXDyhJ9Hdx3Hd1.jpg')] bg-cover bg-center opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            </Card>

            <h2 className="text-2xl font-bold mb-4 text-red-500">
              Continue Watching
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {ContinueWatching.map((anime, i) => (
                <div
                  key={anime.title}
                  className="relative group overflow-hidden rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative h-48">
                    <Image
                      src={anime.imageUrl}
                      alt={anime.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold text-white mb-1">{anime.title}</h3>
                    <p className="text-sm text-gray-300 mb-2">
                      S{anime.season} : E{anime.episode}
                    </p>
                    <Progress value={anime.progress} className="h-1 mb-2"/>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-300">{anime.progress}% completed</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:text-red-500 transition-colors"
                      >
                        <Play className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="lg"
                      variant="ghost"
                      className="text-white  bg-red-500/80 hover:bg-red-600/80 transition-colors rounded-full p-3"
                    >
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4 text-red-500">For You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ForYou.map((anime) => (
                <div
                  key={anime.title}
                  className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
                  onMouseEnter={() => setHoveredAnime(anime.title)}
                  onMouseLeave={() => setHoveredAnime(null)}
                >
                  <Image
                    src={anime.imageUrl}
                    alt={anime.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm bg-black/30">
                    <h3 className="text-lg font-semibold text-white">{anime.title}</h3>
                  </div>
                  {hoveredAnime === anime.title && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "discovery" && (
          <>
          {/* TODO: HERE */}
           {/* <DashboardCommunity /> */}
           <AnimeDashboard />
          </>
        )}

        {activeTab === "community" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-6 text-red-500">Anime Community</h1>

            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="create">Create Post</TabsTrigger>
              </TabsList>
              <TabsContent value="feed">
                <div className="space-y-6">
                  {posts.map((post) => (
                    <Card key={post.id} className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={post.avatar} alt={post.user} />
                            <AvatarFallback>{post.user.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg font-semibold text-white">{post.title}</CardTitle>
                            <CardDescription className="text-gray-400">Posted by {post.user}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-4">{post.content}</p>
                        {post.image && (
                          <Image
                            src={post.image}
                            alt="Post image"
                            width={500}
                            height={300}
                            className="rounded-lg mb-4"
                          />
                        )}
                        <div className="flex items-center space-x-4 text-gray-400">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                            <Heart className="w-4 h-4 mr-2" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            {post.comments.length}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                            <Share2 className="w-4 h-4 mr-2" />
                            {post.shares}
                          </Button>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="w-full space-y-4">
                          {post.comments.map((comment, index) => (
                            <div key={index} className="flex items-start space-x-4">
                              <Avatar>
                                <AvatarFallback>{comment.user.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-300">{comment.user}</p>
                                <p className="text-gray-400">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                          <div className="flex items-center space-x-2">
                            <Avatar>
                              <AvatarImage src="https://i.pinimg.com/736x/5e/67/f8/5e67f80556e7b6b96825e08b6a052487.jpg" alt="Your Avatar" />
                              <AvatarFallback>YA</AvatarFallback>
                            </Avatar>
                            <Input placeholder="Add a comment..." className="flex-1 bg-gray-700 border-gray-600 text-white" />
                            <Button>Post</Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="create">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Create a New Post</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePostSubmit} className="space-y-4">
                      <Input
                        placeholder="Post Title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <Textarea
                        placeholder="What's on your mind?"
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <Button type="submit" className="w-full">Create Post</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeTab !== "home" && activeTab !== "community" && activeTab !== "discovery" && (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold mb-4 text-red-500">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Page</h2>
            <p className="text-gray-400">This page is under construction. Check back soon for updates!</p>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-gray-800 p-4">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Top This Week</h2>
        <ScrollArea className="h-[300px] mb-8">
          {[
            "Attack on Titan",
            "Haikyuu!!",
            "Kaguya-sama: Love Is War",
            "My Hero Academia",
            "Demon Slayer",
          ].map((anime, index) => (
            <div
              key={anime}
              className="flex items-center mb-4 hover:bg-gray-700 p-2 rounded transition-colors"
            >
              <Image
                src={ForYou[index % ForYou.length].imageUrl}
                alt={anime}
                width={60}
                height={60}
                className="object-cover rounded mr-4"
              />
              <div>
                <h3 className="font-semibold text-red-400">{anime}</h3>
                <p className="text-sm text-gray-400">
                  Adventure, Action, Fantasy
                </p>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{(9.8 - index * 0.1).toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>

        <h2 className="text-2xl font-bold mb-4 text-red-500">Top Movies</h2>
        <ScrollArea className="h-[300px]">
          {[
            "Your Name",
            "Spirited Away",
            "A Silent Voice",
            "Howl's Moving Castle",
            "Princess Mononoke",
          ].map((movie, index) => (
            <div
              key={movie}
              className="flex items-center mb-4 hover:bg-gray-700 p-2 rounded transition-colors"
            >
              <Image
                src={`/placeholder.svg?height=60&width=60&text=${index + 1}`}
                alt={movie}
                width={60}
                height={60}
                className="object-cover rounded mr-4"
              />
              <div>
                <h3 className="font-semibold text-red-400">{movie}</h3>
                <p className="text-sm text-gray-400">
                  Adventure, Fantasy, Romance
                </p>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{(9.8 - index * 0.1).toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}