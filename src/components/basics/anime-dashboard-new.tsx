'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import { Star, ArrowLeft, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import type { AnimeData, ApiResponse } from "@/lib/types/jikan-anime-response"
import { generateMembers, generateModerators } from "@/lib/utils/generate-users"
import { Anime3DCard } from "@/components/anime-3d-card"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchAnimeData } from "@/lib/api/fetch-anime-data"

const moderators = generateModerators(3);
const MAX_PAGES = 2;

export default function AnimeDashboardNew() {
    const [selectedAnime, setSelectedAnime] = useState<AnimeData | null>(null)
    const [view, setView] = useState<"grid" | "detail">("grid")
    const [selectedTab, setSelectedTab] = useState<string>("all")
    const [tabListData, setTabListData] = useState<string[]>([])
    const [displayedPages, setDisplayedPages] = useState<AnimeData[][]>([])
    const [filters, setFilters] = useState<{
        status: string[],
        rating: string[]
    }>({
        status: [],
        rating: []
    })
    
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery<ApiResponse, Error>({
        queryKey: ['animeData', selectedTab],
        queryFn: ({ pageParam = 1 }) => fetchAnimeData(pageParam as number, selectedTab),
        getNextPageParam: (lastPage) => lastPage.pagination.has_next_page ? lastPage.pagination.current_page + 1 : undefined,
        initialPageParam: 1,
    })

    useEffect(() => {
        if (data?.pages) {
            setDisplayedPages(prevPages => {
                const newPages = [...prevPages, ...data.pages.slice(prevPages.length).map(page => page.data)]
                if (newPages.length > MAX_PAGES) {
                    return newPages.slice(-MAX_PAGES)
                }
                return newPages
            })
        }
    }, [data?.pages])

    useEffect(() => {
        if ((data?.pages[0] as ApiResponse)?.data) {
            const types = new Set((data?.pages[0] as ApiResponse)?.data.map(anime => anime.type?.toLowerCase() ?? "N/A"))
            setTabListData(["all", ...types])
        }
    }, [data])

    const observer = useRef<IntersectionObserver>()
    const lastAnimeElementRef = useCallback((node: HTMLDivElement | null) => {
        if (isFetchingNextPage) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage()
            }
        })
        if (node) observer.current.observe(node)
    }, [isFetchingNextPage, fetchNextPage, hasNextPage])

    const handleRequestToJoin = (id: number, event: React.MouseEvent) => {
        event.stopPropagation()
        setDisplayedPages(prevPages =>
            prevPages.map(page =>
                page.map(anime =>
                    anime.mal_id === id
                        ? { ...anime, joined: !anime.joined, pendingRequests: ((anime.pendingRequests || 0) + (anime.joined ? -1 : 1)) }
                        : anime
                )
            )
        )
    }

    const filteredAnimeList = displayedPages.flatMap(page => 
        page.filter(anime => 
            (selectedTab === "all" || anime.type?.toLowerCase() === selectedTab) &&
            (filters.status.length === 0 || filters.status.includes(anime.status || "")) &&
            (filters.rating.length === 0 || filters.rating.includes(anime.rating || ""))
        )
    )

    const handleFilterChange = (filterType: 'status' | 'rating', value: string) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: prev[filterType].includes(value)
                ? prev[filterType].filter(item => item !== value)
                : [...prev[filterType], value]
        }))
    }

    return (
        <div className="min-h-screen text-gray-100">
            <nav className="border-b border-gray-800/50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Tabs value={selectedTab} className="w-full">
                            <TabsList className="inline-flex h-9 items-center justify-start rounded-none p-0 bg-transparent">
                                {tabListData.map((tab) => (
                                    <TabsTrigger
                                        key={tab}
                                        value={tab}
                                        className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-red-500 hover:text-red-400"
                                        onClick={function(){setSelectedTab(tab)}}
                                    >
                                        {tab.toUpperCase()}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-4">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filters
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {["Airing", "Completed", "Upcoming"].map((status) => (
                                    <DropdownMenuCheckboxItem
                                        key={status}
                                        checked={filters.status.includes(status)}
                                        onCheckedChange={() => handleFilterChange('status', status)}
                                    >
                                        {status}
                                    </DropdownMenuCheckboxItem>
                                ))}
                                <DropdownMenuLabel>Rating</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {["G", "PG", "PG-13", "R", "R+"].map((rating) => (
                                    <DropdownMenuCheckboxItem
                                        key={rating}
                                        checked={filters.rating.includes(rating)}
                                        onCheckedChange={() => handleFilterChange('rating', rating)}
                                    >
                                        {rating}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                {status === 'pending' ? (
                    <div className="text-center">Loading...</div>
                ) : status === 'error' ? (
                    <div className="text-center">Error fetching anime data</div>
                ) : view === "grid" ? (
                    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3">
                        {filteredAnimeList.map((anime: AnimeData, index: number) => (
                            <div 
                                key={anime.mal_id} 
                                className="w-full" 
                                onClick={function(){
                                    setSelectedAnime(anime)
                                    setView("detail")
                                }}
                                ref={index === filteredAnimeList.length - 1 ? lastAnimeElementRef : null}
                            >
                                <Anime3DCard anime={anime} onRequestToJoin={handleRequestToJoin} />
                            </div>
                        ))}
                        {isFetchingNextPage && <div className="col-span-full text-center py-4">Loading more...</div>}
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
                        <p className="text-gray-
300 leading-relaxed text-sm">{selectedAnime.synopsis}</p>
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

