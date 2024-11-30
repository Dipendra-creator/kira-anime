import Image from "next/image"
import { Star } from 'lucide-react'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import type { AnimeData } from "@/lib/types/jikan-anime-response"

interface Anime3DCardProps {
    anime: AnimeData;
    onRequestToJoin: (id: number, event: React.MouseEvent) => void;
}

export const Anime3DCard = ({ anime, onRequestToJoin }: Anime3DCardProps) => (
    <CardContainer className="w-full">
        <CardBody className="bg-[#151921]
group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-gray-800/30 hover:border-red-500/50 w-full h-[400px] rounded-xl p-6 border transition-all duration-200">
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
                    onClick={(e: React.MouseEvent) => onRequestToJoin(anime.mal_id, e)}
                >
                    {anime.joined ? "Requested" : "Join"}
                </CardItem>
            </div>
        </CardBody>
    </CardContainer>
)

