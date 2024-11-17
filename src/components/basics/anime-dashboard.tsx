'use client'

import { useState, useEffect } from "react"
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
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image, { StaticImageData } from "next/image"
import type { AnimeData } from "@/lib/types/jikan-anime-response"
// import images
import key0 from "@/app/assets/key(0).jpeg"
import key1 from "@/app/assets/key(1).jpeg"
import key2 from "@/app/assets/key(2).jpeg"
import key3 from "@/app/assets/key(3).jpeg"
import key4 from "@/app/assets/key(4).jpeg"
import key5 from "@/app/assets/key(5).jpeg"
import key6 from "@/app/assets/key(6).jpeg"
import key7 from "@/app/assets/key(7).jpeg"
import key8 from "@/app/assets/key(8).jpeg"
import key9 from "@/app/assets/key(9).jpeg"
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
interface Member {
    id: number;
    name: string;
    avatar: StaticImageData;
}

interface Moderator {
    id: number;
    name: string;
    avatar: StaticImageData;
    role: string;
}

const avatars = [key0, key1, key2, key3, key4, key5, key6, key7, key8, key9];

const generateMembers = (count: number): Member[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Member ${i + 1}`,
        avatar: avatars[i % avatars.length],
    }));
};

const generateModerators = (count: number): Moderator[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Moderator ${i + 1}`,
        avatar: avatars[i % avatars.length],
        role: i === 0 ? 'Admin' : 'Moderator',
    }));
};

const moderators = generateModerators(3);

export default function AnimeDashboard() {
    const [animeData, setAnimeData] = useState<AnimeData[]>([])
    const [selectedAnime, setSelectedAnime] = useState<AnimeData | null>(null)
    const [view, setView] = useState<"grid" | "detail">("grid")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchAnimeData = async () => {
            try {
                const response = await fetch('https://api.jikan.moe/v4/anime')
                const data = await response.json()
                setAnimeData(data.data)
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching anime data:', error)
                setIsLoading(false)
            }
        }

        fetchAnimeData()
    }, [])

    const handleRequestToJoin = (id: number, event: React.MouseEvent) => {
        event.stopPropagation()
        setAnimeData(prevData =>
            prevData.map(anime =>
                anime.mal_id === id
                    ? { ...anime, joined: !anime.joined, pendingRequests: (anime.pendingRequests || 0) + (anime.joined ? -1 : 1) }
                    : anime
            )
        )
    }

    const Anime3DCard = ({ anime }: { anime: AnimeData }) => (
        <CardContainer className="w-full">
            <CardBody className="bg-[#151921] group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-gray-800/30 hover:border-red-500/50 w-full h-[400px] rounded-xl p-6 border transition-all duration-200">
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-white mb-2"
                >
                    {anime.title}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-gray-400 text-sm line-clamp-2 mb-4"
                >
                    {anime.synopsis}
                </CardItem>
                <CardItem translateZ="100" className="w-full h-48 relative mb-4">
                    <Image
                        src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl group-hover/card:shadow-xl"
                        alt={anime.title}
                    />
                </CardItem>
                <div className="flex justify-between items-center mt-auto mb-0">
                    <CardItem
                        translateZ={20}
                        className="flex items-center text-gray-300"
                    >
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                        {anime.score}
                    </CardItem>
                    <CardItem
                        translateZ={20}
                        as="button"
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                            anime.joined
                                ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                        onClick={(e) => handleRequestToJoin(anime.mal_id, e)}
                    >
                        {anime.joined ? "Requested" : "Join"}
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    )

    return (
        <div className="min-h-screen text-gray-100">
            {/* Navigation */}
            <nav className="border-b border-gray-800/50">
                <div className="container mx-auto px-4 py-4">
                    <Tabs defaultValue="anime" className="w-full">
                        <TabsList className="w-full inline-flex h-9 items-center justify-start rounded-none p-0 bg-transparent">
                            <TabsTrigger
                                value="anime"
                                className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-red-500 hover:text-red-400"
                            >
                                Anime
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="text-center">Loading...</div>
                ) : view === "grid" ? (
                    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3">
                        {animeData.map((anime: AnimeData) => (
                            <div key={anime.mal_id} className="w-full" onClick={() => {
                                setSelectedAnime(anime)
                                setView("detail")
                            }}>
                                <Anime3DCard anime={anime} />
                            </div>
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
                                            src={selectedAnime.images.jpg.large_image_url || selectedAnime.images.jpg.image_url}
                                            alt={selectedAnime.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="bg-[#151921] p-4 rounded-lg border border-gray-800/30">
                                        <h3 className="text-lg font-medium mb-3">Anime Info</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between items-center py-1">
                                                <span className="text-gray-400">Type</span>
                                                <span className="font-medium">{selectedAnime.type}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-1">
                                                <span className="text-gray-400">Episodes</span>
                                                <span className="font-medium">{selectedAnime.episodes || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-1">
                                                <span className="text-gray-400">Status</span>
                                                <span className="font-medium">{selectedAnime.status}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-1">
                                                <span className="text-gray-400">Aired</span>
                                                <span className="font-medium">{selectedAnime.aired.string}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-1">
                                                <span className="text-gray-400">Rating</span>
                                                <span className="font-medium">{selectedAnime.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#151921] p-4 rounded-lg border border-gray-800/30">
                                        <h3 className="text-lg font-medium mb-3">Community Info</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between items-center py-1">
                                                <span className="text-gray-400">Members</span>
                                                <span className="font-medium">{selectedAnime.members?.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-1">
                                                <span className="text-gray-400">Favorites</span>
                                                <span className="font-medium">{selectedAnime.favorites?.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-1">
                                                <span className="text-gray-400">Popularity Rank</span>
                                                <span className="font-medium">{selectedAnime.popularity}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#151921] p-4 rounded-lg border border-gray-800/30">
                                        <h3 className="text-lg font-medium mb-3">Moderators</h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            {moderators.map((mod) => (
                                                <TooltipProvider key={mod.id}>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="flex flex-col items-center">
                                                                <Avatar className="w-16 h-16 border-2 border-gray-800/50">
                                                                    <AvatarImage src={mod.avatar.src} alt={mod.name} />
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
                                                {selectedAnime.score}
                                            </div>
                                            <span className="text-gray-400">{selectedAnime.rating}</span>
                                            <span className="text-gray-400">{selectedAnime.year}</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#151921] p-4 rounded-lg border border-gray-800/30">
                                        <h2 className="text-lg font-medium mb-2">Synopsis</h2>
                                        <p className="text-gray-300 leading-relaxed text-sm">{selectedAnime.synopsis}</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <Button
                                            className={`px-8 ${selectedAnime.joined
                                                    ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                                    : 'bg-red-500 hover:bg-red-600 text-white'
                                                }`}
                                            onClick={(e) => handleRequestToJoin(selectedAnime.mal_id, e)}
                                        >
                                            {selectedAnime.joined ? "Requested" : "Join"}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-gray-800 bg-[#151921] hover:bg-[#1A1F29] text-gray-300"
                                            onClick={() => window.open(selectedAnime.url, '_blank')}
                                        >
                                            View on MAL
                                        </Button>
                                    </div>
                                    {selectedAnime.genres && (
                                        <div className="bg-[#151921] p-4 rounded-lg border border-gray-800/30">
                                            <h3 className="text-lg font-medium mb-3">Genres</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedAnime.genres.map((genre) => (
                                                    <span key={genre.mal_id} className="px-2 py-1 bg-[#1A1F29] rounded-full text-xs text-gray-300">
                                                        {genre.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="bg-[#151921] p-4 rounded-lg border border-gray-800/30">
                                        <h3 className="text-lg font-medium mb-3">Members</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {generateMembers(10).map((member) => (
                                                <Avatar key={member.id} className="w-8 h-8 border border-gray-800/50">
                                                    <AvatarImage src={member.avatar.src} alt={member.name} />
                                                    <AvatarFallback className="bg-[#1A1F29]">{member.name.slice(0, 2)}</AvatarFallback>
                                                </Avatar>
                                            ))}
                                            {selectedAnime.members && selectedAnime.members > 10 && (
                                                <div className="flex items-center justify-center w-8 h-8 bg-[#1A1F29] rounded-full text-gray-400 border border-gray-800/50">
                                                    <span className="text-xs">+{selectedAnime.members - 10}</span>
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