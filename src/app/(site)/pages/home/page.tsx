"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Play } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const HomePage = () => {
  const [hoveredAnime, setHoveredAnime] = useState<string | null>(null);
  const ContinueWatching = [
    {
      title: "Attack on Titan",
      season: 1,
      episode: 1,
      progress: 65,
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AttackOnTitan-bx7dJ4l2aVU9YJQGIXDyhJ9Hdx3Hd1.jpg",
    },
    {
      title: "Haikyuu!!",
      season: 2,
      episode: 3,
      progress: 40,
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hikuyu-5a8ES9Ie4r6EDsZHIMAv2MBDDH6beV.jpg",
    },
    {
      title: "Kaguya-sama: Love Is War",
      season: 3,
      episode: 2,
      progress: 80,
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Random-18c49dcME3qIA0hHxPVBN5Hlnh5toW.png",
    },
  ];

  const ForYou = [
    {
      title: "Haikyuu!!",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hikuyu-5a8ES9Ie4r6EDsZHIMAv2MBDDH6beV.jpg",
    },
    {
      title: "Kaguya-sama: Love Is War",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Random-18c49dcME3qIA0hHxPVBN5Hlnh5toW.png",
    },
    {
      title: "Attack on Titan",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AttackOnTitan-bx7dJ4l2aVU9YJQGIXDyhJ9Hdx3Hd1.jpg",
    },
    {
      title: "One Piece",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OnePiece.jpg",
    },
  ];

  return (
    <ScrollArea className="flex-1 p-6 space-y-6 pt-0">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg font-semibold text-white mb-1">
                {anime.title}
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                S{anime.season} : E{anime.episode}
              </p>
              <Progress value={anime.progress} className="h-1 mb-2" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-300">
                  {anime.progress}% completed
                </span>
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
              <h3 className="text-lg font-semibold text-white">
                {anime.title}
              </h3>
            </div>
            {hoveredAnime === anime.title && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                <Play className="w-16 h-16 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default HomePage;
