'use client'

import { useState } from "react"
import { ChevronLeft, Filter, Search, Star, Users, Clock, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

interface Member {
  id: number;
  name: string;
  avatar: string;
}

interface Moderator {
  id: number;
  name: string;
  avatar: string;
  role: string;
}

export interface Anime {
  id: number;
  title: string;
  image: string;
  rating: number;
  year: number;
  genre: string;
  synopsis: string;
  join: boolean;
  moderators: Moderator[];
  totalMembers: number;
  pendingRequests: number;
  members: Member[];
}

const generateMembers = (count: number): Member[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Member ${i + 1}`,
    avatar: `/placeholder.svg?height=32&width=32&text=M${i + 1}`,
  }));
};

const generateModerators = (count: number): Moderator[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Moderator ${i + 1}`,
    avatar: `/placeholder.svg?height=64&width=64&text=Mod${i + 1}`,
    role: i === 0 ? 'Admin' : 'Moderator',
  }));
};

const animeData: Anime[] = [
  {
    id: 1,
    title: "Bleach: Thousand-Year Blood War",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AttackOnTitan-bx7dJ4l2aVU9YJQGIXDyhJ9Hdx3Hd1.jpg",
    rating: 9,
    year: 2014,
    genre: "Action",
    synopsis: "After an awe-inspiring battle with Ichibei Hyousube—leader of the Soul Society's Royal Guard—the powerful Yhwach moves into the final stage of his master plan. He aims to create a new world order by unifying the Soul Society, Hueco Mundo, and the Human World.",
    join: false,
    moderators: generateModerators(3),
    totalMembers: 15000,
    pendingRequests: 42,
    members: generateMembers(150),
  },
  {
    id: 2,
    title: "Re:ZERO -Starting Life in Another World",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Random-18c49dcME3qIA0hHxPVBN5Hlnh5toW.png",
    rating: 8.9,
    year: 2016,
    genre: "Fantasy",
    synopsis: "When Subaru Natsuki leaves the convenience store, the last thing he expects is to be wrenched from his everyday life and dropped into a fantasy world.",
    join: false,
    moderators: generateModerators(2),
    totalMembers: 12000,
    pendingRequests: 28,
    members: generateMembers(120),
  },
  {
    id: 3,
    title: "One Piece",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hikuyu-5a8ES9Ie4r6EDsZHIMAv2MBDDH6beV.jpg",
    rating: 9.5,
    year: 1999,
    genre: "Adventure",
    synopsis: "Gol D. Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line.",
    join: false,
    moderators: generateModerators(4),
    totalMembers: 50000,
    pendingRequests: 137,
    members: generateMembers(200),
  },
  {
    id: 4,
    title: "Alien Stage",
    image: "/placeholder.svg?height=400&width=300&text=Alien+Stage",
    rating: 8.7,
    year: 2023,
    genre: "Sci-fi",
    synopsis: "A mysterious stage appears in the city, bringing otherworldly performances that captivate audiences.",
    join: false,
    moderators: generateModerators(2),
    totalMembers: 5000,
    pendingRequests: 15,
    members: generateMembers(80),
  },
]

const mangaData: Anime[] = [
  {
    id: 5,
    title: "Berserk",
    image: "/placeholder.svg?height=400&width=300&text=Berserk",
    rating: 9.4,
    year: 1989,
    genre: "Dark Fantasy",
    synopsis: "Guts, a former mercenary now known as the 'Black Swordsman,' is out for revenge.",
    join: false,
    moderators: generateModerators(3),
    totalMembers: 30000,
    pendingRequests: 89,
    members: generateMembers(180),
  },
  {
    id: 6,
    title: "Vagabond",
    image: "/placeholder.svg?height=400&width=300&text=Vagabond",
    rating: 9.2,
    year: 1998,
    genre: "Historical",
    synopsis: "A reimagining of the life of Japanese swordsman Musashi Miyamoto.",
    join: false,
    moderators: generateModerators(2),
    totalMembers: 25000,
    pendingRequests: 62,
    members: generateMembers(150),
  },
]

const manhwaData: Anime[] = [
  {
    id: 7,
    title: "Solo Leveling",
    image: "/placeholder.svg?height=400&width=300&text=Solo+Leveling",
    rating: 8.9,
    year: 2018,
    genre: "Action",
    synopsis: "In a world where hunters must battle deadly monsters to protect humanity, Sung Jin-Woo, the weakest of hunters, finds himself in a perilous situation.",
    join: false,
    moderators: generateModerators(3),
    totalMembers: 40000,
    pendingRequests: 112,
    members: generateMembers(200),
  },
  {
    id: 8,
    title: "Tower of God",
    image: "/placeholder.svg?height=400&width=300&text=Tower+of+God",
    rating: 8.7,
    year: 2010,
    genre: "Fantasy",
    synopsis: "Follow Bam as he climbs the Tower in search of his friend Rachel.",
    join: false,
    moderators: generateModerators(2),
    totalMembers: 35000,
    pendingRequests: 95,
    members: generateMembers(180),
  },
]

const manhuaData: Anime[] = [
  {
    id: 9,
    title: "The King's Avatar",
    image: "/placeholder.svg?height=400&width=300&text=The+King's+Avatar",
    rating: 8.6,
    year: 2016,
    genre: "Gaming",
    synopsis: "Ye Xiu, a top-tier player in the online game Glory, is forced to retire and starts anew.",
    join: false,
    moderators: generateModerators(2),
    totalMembers: 20000,
    pendingRequests: 53,
    members: generateMembers(120),
  },
  {
    id: 10,
    title: "Tales of Demons and Gods",
    image: "/placeholder.svg?height=400&width=300&text=Tales+of+Demons+and+Gods",
    rating: 8.4,
    year: 2015,
    genre: "Fantasy",
    synopsis: "Nie Li, the strongest Demon Spiritist, stands at the pinnacle of the martial world. However, he lost his life during the battle with Sage Emperor and six deity-ranked beasts.",
    join: false,
    moderators: generateModerators(2),
    totalMembers: 18000,
    pendingRequests: 47,
    members: generateMembers(110),
  },
]

export default function DashboardCommunity() {
  const [selectedTab, setSelectedTab] = useState("anime")
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)
  const [view, setView] = useState<"grid" | "detail">("grid")

  const getDataForTab = (tab: string) => {
    switch (tab) {
      case "anime":
        return animeData;
      case "manga":
        return mangaData;
      case "manhwa":
        return manhwaData;
      case "manhua":
        return manhuaData;
      default:
        return animeData;
    }
  }

  function handleRequestToJoin(id: number, event: React.MouseEvent) {
    event.stopPropagation()
    const currentData = getDataForTab(selectedTab)
    const updatedData = currentData.map((item) => {
      if (item.id === id) {
        return { ...item, join: !item.join, pendingRequests: item.join ? item.pendingRequests - 1 : item.pendingRequests + 1 };
      }
      return item;
    })
    
    // Update the correct data array based on the selected tab
    switch (selectedTab) {
      case "anime":
        animeData.splice(0, animeData.length, ...updatedData);
        break;
      case "manga":
        mangaData.splice(0, mangaData.length, ...updatedData);
        break;
      case "manhwa":
        manhwaData.splice(0, manhwaData.length, ...updatedData);
        break;
      case "manhua":
        manhuaData.splice(0, manhuaData.length, ...updatedData);
        break;
    }

    // If the selected anime is the one being updated, update it as well
    if (selectedAnime && selectedAnime.id === id) {
      setSelectedAnime(updatedData.find(item => item.id === id) || null);
    }
  }

  return (
    <div className="min-h-screen text-gray-100">
      {/* Navigation */}
      <nav className="border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-4">
          <Tabs defaultValue="anime" className="w-full" onValueChange={(value) => setSelectedTab(value)}>
            <TabsList className="w-full inline-flex h-9 items-center justify-start rounded-none p-0 bg-transparent">
              <TabsTrigger 
                value="anime" 
                className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-red-500 hover:text-red-400"
              >
                Anime
              </TabsTrigger>
              <TabsTrigger 
                value="manga"
                className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-red-500 hover:text-gray-300"
              >
                Manga
              </TabsTrigger>
              <TabsTrigger 
                value="manhwa"
                className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-red-500 hover:text-gray-300"
              >
                Manhwa
              </TabsTrigger>
              <TabsTrigger 
                value="manhua"
                className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-red-500 hover:text-gray-300"
              >
                Manhua
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {view === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {getDataForTab(selectedTab).map((item: Anime) => (
              <Card
                key={item.id}
                className="bg-[#151921] border-gray-800/30 hover:border-red-500/50 transition-colors cursor-pointer flex flex-col overflow-hidden"
                onClick={() => {
                  setSelectedAnime(item)
                  setView("detail")
                }}
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg mb-2 line-clamp-2 font-medium">{item.title}</CardTitle>
                </CardContent>
                <CardFooter className="p-4 bg-[#1A1F29]">
                  <div className="w-full flex flex-col space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{item.genre}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                        {item.rating}
                      </div>
                    </div>
                    <Button 
                      className={`w-full ${
                        item.join 
                          ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' 
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                      onClick={(e) => handleRequestToJoin(item.id, e)}
                    >
                      {item.join ? "Requested" : "Join"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <Button
              variant="ghost"
              className="mb-6 text-gray-400 hover:text-white group"
              onClick={() => setView("grid")}
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Discovery
            </Button>
            {selectedAnime && (
              <div className="grid md:grid-cols-[300px,1fr] gap-8">
                <div className="space-y-6">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image
                      src={selectedAnime.image}
                      alt={selectedAnime.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-[#151921] p-4 rounded-lg border border-gray-800/30">
                    <h3 className="text-lg font-medium mb-3">Community Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-400">Total Members</span>
                        <span className="font-medium">{selectedAnime.totalMembers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-400">Pending Requests</span>
                        <span className="font-medium">{selectedAnime.pendingRequests}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#151921] p-4 rounded-lg border border-gray-800/30">
                    <h3 className="text-lg font-medium mb-3">Moderators</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedAnime.moderators.map((mod) => (
                        <TooltipProvider key={mod.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex flex-col items-center">
                                <Avatar className="w-16 h-16 border-2 border-gray-800/50">
                                  <AvatarImage src={mod.avatar} alt={mod.name} />
                                  <AvatarFallback className="bg-[#1A1F29]">{mod.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs mt-2 text-gray-400">{mod.name}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-medium">{mod.role}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-4">{selectedAnime.title}</h1>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                        {selectedAnime.rating}
                      </div>
                      <span className="text-gray-400">{selectedAnime.genre}</span>
                      <span className="text-gray-400">{selectedAnime.year}</span>
                    </div>
                  </div>
                  <div className="bg-[#151921] p-4 rounded-lg border border-gray-800/30">
                    <h2 className="text-lg font-medium mb-2">Synopsis</h2>
                    <p className="text-gray-300 leading-relaxed text-sm">{selectedAnime.synopsis}</p>
                  </div>
                  <div className="flex space-x-4">
                    <Button 
                      className={`px-8 ${
                        selectedAnime.join 
                          ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' 
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                      onClick={(e) => handleRequestToJoin(selectedAnime.id, e)}
                    >
                      {selectedAnime.join ? "Requested" : "Join"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-gray-800 bg-[#151921] hover:bg-[#1A1F29] text-gray-300"
                    >
                      View on MAL
                    </Button>
                  </div>
                  <div className="bg-[#151921] p-4 rounded-lg border border-gray-800/30">
                    <h3 className="text-lg font-medium mb-3">Members</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAnime.members.slice(0, 10).map((member) => (
                        <Avatar key={member.id} className="w-8 h-8 border border-gray-800/50">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-[#1A1F29]">{member.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {selectedAnime.members.length > 10 && (
                        <div className="flex items-center justify-center w-8 h-8 bg-[#1A1F29] rounded-full text-gray-400 border border-gray-800/50">
                          <span className="text-xs">+{selectedAnime.members.length - 10}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}