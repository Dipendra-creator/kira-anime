"use client"
import React from "react";
import { Bell, Grid, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TopNavigation() {
  return (
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
          className="hover:bg-red-500 hover:text-white transition-colors"
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
          <AvatarImage src="https://i.pinimg.com/736x/5e/67/f8/5e67f80556e7b6b96825e08b6a052487.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
