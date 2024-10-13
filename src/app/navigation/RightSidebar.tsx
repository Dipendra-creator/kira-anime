"use client"
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RightSidebar() {
  return (
    <div className="w-80 bg-gray-800 p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-500">Top This Week</h2>
      <ScrollArea className="h-[300px] mb-8">
        {[
          "Jujutsu Kaisen",
          "Demon Slayer",
          "Attack on Titan",
          "My Hero Academia",
          "Tokyo Revengers",
        ].map((anime, index) => (
          <div
            key={anime}
            className="flex items-center mb-4 hover:bg-gray-700 p-2 rounded transition-colors"
          >
            <img
              src={`/placeholder.svg?height=60&width=60&text=${index + 1}`}
              alt={anime}
              className="w-16 h-16 object-cover rounded mr-4"
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
            <img
              src={`/placeholder.svg?height=60&width=60&text=${index + 1}`}
              alt={movie}
              className="w-16 h-16 object-cover rounded mr-4"
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
  );
}
