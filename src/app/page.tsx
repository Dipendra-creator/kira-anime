"use client";
import React, { useState } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import RightSidebar from "./navigation/RightSidebar";
import LeftSidebar from "./navigation/LeftSidebar";
import TopNavigation from "./navigation/TopNavigation";
import Image from "next/image";

import DemonSlayer from "@/app/assets/DemonSlayer.jpg";
import AttackOnTitan from "@/app/assets/AttackOnTitan.jpg";
import Hikuyu from "@/app/assets/Hikuyu.jpg";
import OnePiece from "@/app/assets/OnePiece.jpeg";
import Random from "@/app/assets/Random.png";

export default function Dashboard() {
  const [hoveredAnime, setHoveredAnime] = useState<string | null>(null);

  const ContinueWatching = [
    {
      title: "Attack on Titan",
      season: 1,
      episode: 1,
      progress: 65,
      imageUrl: "https://img.opencritic.com/game/1570/o/lweuUjuF.jpg",
    },
    {
      title: "My Hero Academia",
      season: 2,
      episode: 3,
      progress: 40,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjEX0s917H7BSbavg7Y9_IaqTjRVXk9EHjtye46N6SychnR6zLVe0nF3wvilzq99Tqfc&usqp=CAU",
    },
    {
      title: "One Punch Man",
      season: 3,
      episode: 2,
      progress: 80,
      imageUrl:
        "https://static.bandainamcoent.eu/high/one-punch-man/one-punch-man-a-hero-nobody-knows/00-page-setup/opm_game-thumbnail.jpg",
    },
  ];

  const ForYou = [
    { title: "Haikyu!!", imageUrl: Hikuyu },
    { title: "Death Note", imageUrl: Random },
    { title: "Fullmetal Alchemist", imageUrl: AttackOnTitan },
    { title: "One Piece", imageUrl: OnePiece },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto bg-gradient-to-br from-gray-900 to-gray-800">
        <TopNavigation />

        {/* Trending section remains unchanged */}
        <h2 className="text-2xl font-bold mb-4 text-red-500">Trending</h2>
        <Card className="mb-8 bg-gradient-to-r from-red-600 to-pink-600 text-white overflow-hidden relative group">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-4xl mb-2">Demon Slayer</CardTitle>
                <CardDescription className="text-gray-200">
                  Adventure, Action, Supernatural
                </CardDescription>
              </div>
              <Button className="bg-white text-red-600 hover:bg-gray-200 transition-colors z-10">
                Watch Now
              </Button>
            </div>
          </CardContent>
          <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-background-3-MVsbvCnXvVB8F8xSyibezfc1Weih5t.jpg')] bg-cover bg-center opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
        </Card>

        {/* Updated Continue Watching section */}
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
                <img
                  src={anime.imageUrl}
                  alt={anime.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-semibold text-white mb-1">{anime.title}</h3>
                <p className="text-sm text-gray-300 mb-2">
                  S{anime.season} : E{anime.episode}
                </p>
                <Progress value={anime.progress} className="h-1 mb-2" />
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
                  className="text-white bg-red-500/80 hover:bg-red-600/80 transition-colors rounded-full p-3"
                >
                  <Play className="w-8 h-8" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* For You section remains unchanged */}
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
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
}