"use client";

import React, { ReactNode, useState } from "react";
import {
  HelpCircle,
  LogOut,
  Grid,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define the type for the images
type AnimeImages = {
  [key: string]: StaticImageData;
};

// Import images
import key0 from "@/app/assets/key(0).jpeg";
import key1 from "@/app/assets/key(1).jpeg";
import key2 from "@/app/assets/key(2).jpeg";
import key3 from "@/app/assets/key(3).jpeg";
import key4 from "@/app/assets/key(4).jpeg";
import key5 from "@/app/assets/key(5).jpeg";
import key6 from "@/app/assets/key(6).jpeg";
import key7 from "@/app/assets/key(7).jpeg";
import AnimeDashboardNew from "@/components/basics/anime-dashboard-new";
import { libraryPath, menuPath } from "./page-routes";
import Link from "next/link";

// Create an object to hold the images
const animeImages: AnimeImages = {
  key0,
  key1,
  key2,
  key3,
  key4,
  key5,
  key6,
  key7,
};

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [activeTab, setActiveTab] = useState("home");
  const [hoveredAnime, setHoveredAnime] = useState<string | null>(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "AnimeEnthusiast",
      avatar: animeImages.key0.src || "",
      title: "Just finished Attack on Titan!",
      content:
        "What an incredible journey! The ending left me speechless. What did you all think?",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AttackOnTitan-bx7dJ4l2aVU9YJQGIXDyhJ9Hdx3Hd1.jpg",
      likes: 24,
      comments: [
        {
          user: "TitanFan",
          content: "I know right? That finale was mind-blowing!",
        },
        {
          user: "MangaReader",
          content:
            "The anime did justice to the manga. Loved every second of it!",
        },
      ],
      shares: 5,
    },
    {
      id: 2,
      user: "SportsAnimeGuy",
      avatar: animeImages.key1.src,
      title: "Haikyuu!! is the best sports anime ever!",
      content:
        "The character development and intense matches keep me on the edge of my seat. What's your favorite sports anime?",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hikuyu-5a8ES9Ie4r6EDsZHIMAv2MBDDH6beV.jpg",
      likes: 18,
      comments: [
        {
          user: "VolleyballLover",
          content: "Couldn't agree more! The teamwork in Haikyuu is unmatched.",
        },
        {
          user: "SlamDunk4Ever",
          content:
            "It's great, but have you watched Slam Dunk? Classic basketball anime!",
        },
      ],
      shares: 3,
    },
  ]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

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

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const post = {
      id: posts.length + 1,
      user: "CurrentUser",
      avatar: animeImages.key0.src,
      title: newPost.title,
      content: newPost.content,
      image: "",
      likes: 0,
      comments: [],
      shares: 0,
    };
    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "" });
  };

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
          {menuPath.map((item) => {
            return (
              <Link href={item.path} key={item.id} passHref>
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start mb-1 transition-colors hover:bg-red-500 hover:text-white ${
                    activeTab === item.title.toLowerCase() ? "text-red-500" : ""
                  }`}
                  onClick={() => setActiveTab(item.title.toLowerCase())}
                >
                  {item.icon}
                  {item.title}
                </Button>
              </Link>
            );
          })}

          <h2 className="text-sm font-semibold text-gray-400 mb-2">LIBRARY</h2>
          {libraryPath.map((item) => {
            return (
              <Link href={item.path} key={item.id} passHref>
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start mb-1 transition-colors hover:bg-red-500 hover:text-white ${
                    activeTab === item.title.toLowerCase() ? "text-red-500" : ""
                  }`}
                  onClick={() => setActiveTab(item.title.toLowerCase())}
                >
                  {item.icon}
                  {item.title}
                </Button>
              </Link>
            );
          })}
          <Button
            variant="ghost"
            className={`w-full justify-start mb-1 transition-colors hover:bg-red-500 hover:text-white ${
              activeTab === "help" ? "text-red-500" : ""
            }`}
            onClick={() => setActiveTab("help")}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </Button>
        </nav>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:bg-red-500 hover:text-white transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="flex justify-between items-center mb-8 sticky top-0 z-50 bg-gray-800 backdrop-blur-sm py-4 px-2 rounded-md">
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
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-red-500 hover:text-white transition-colors"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage
                src="https://i.pinimg.com/736x/5e/67/f8/5e67f80556e7b6b96825e08b6a052487.jpg"
                alt="User"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-hidden">{children}</div>
        </main>
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
                src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AttackOnTitan-bx7dJ4l2aVU9YJQGIXDyhJ9Hdx3Hd1.jpg`}
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
  );
}
