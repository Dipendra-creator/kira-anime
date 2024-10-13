"use client"

import React from "react";
import {
  Bell,
  Grid,
  HelpCircle,
  Home,
  List,
  LogOut,
  Play,
  Search,
  Settings,
  Tv,
  Upload,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/app/assets/logo.png"
import Image from "next/image";

export default function LeftSidebar() {
  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col">
      <div className="flex items-center mb-8">
        <Image
          src={Logo}
          alt="KiraAnime Logo"
          className="w-10 h-10 mr-2 animate-pulse"
        />
        <h1 className="text-xl font-bold text-red-500">KiraAnime</h1>
      </div>
      <nav className="flex-1">
        <h2 className="text-sm font-semibold text-gray-400 mb-2">MENU</h2>
        <Button
          variant="ghost"
          className="w-full justify-start mb-1 hover:bg-red-500 hover:text-white transition-colors"
        >
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start mb-1 hover:bg-red-500 hover:text-white transition-colors"
        >
          <Tv className="mr-2 h-4 w-4" />
          Discovery
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start mb-4 hover:bg-red-500 hover:text-white transition-colors"
        >
          <User className="mr-2 h-4 w-4" />
          Community
        </Button>
        <h2 className="text-sm font-semibold text-gray-400 mb-2">LIBRARY</h2>
        <Button
          variant="ghost"
          className="w-full justify-start mb-1 hover:bg-red-500 hover:text-white transition-colors"
        >
          <Play className="mr-2 h-4 w-4" />
          Recent
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start mb-1 hover:bg-red-500 hover:text-white transition-colors"
        >
          <List className="mr-2 h-4 w-4" />
          My List
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start mb-4 hover:bg-red-500 hover:text-white transition-colors"
        >
          <Upload className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start mb-1 hover:bg-red-500 hover:text-white transition-colors"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start mb-1 hover:bg-red-500 hover:text-white transition-colors"
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
  );
}
