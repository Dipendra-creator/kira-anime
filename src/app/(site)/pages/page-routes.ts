
import {
    Home,
    icons
  } from "lucide-react";
import React from "react";

export const menuPath = [
  {
    id: 1,
    title: "Home",
    path: "/pages/home",
    icon: React.createElement(Home, { className: "mr-2 h-4 w-4" }),
    newTab: false,
  },
  {
    id: 2,
    title: "Community",
    path: "/pages/community",
    icon: React.createElement(icons.User, { className: "mr-2 h-4 w-4" }),
    newTab: false,
  },
  {
    id: 3,
    title: "Discovery",
    path: "/pages/discovery",
    icon: React.createElement(icons.Tv, { className: "mr-2 h-4 w-4" }),
    newTab: false,
  },
];
export const libraryPath = [
  {
    id: 4,
    title: "Downloads",
    path: "/pages/downloads",
    icon: React.createElement(icons.Download, { className: "mr-2 h-4 w-4" }),
    newTab: false,
  },
  {
    id: 5,
    title: "My List",
    path: "/pages/mylist",
    icon: React.createElement(icons.List, { className: "mr-2 h-4 w-4" }),
    newTab: false,
  },
  {
    id: 6,
    title: "Recent",
    path: "/pages/recent",
    icon: React.createElement(icons.Clock, { className: "mr-2 h-4 w-4" }),
    newTab: false,
  },
  {
    id: 7,
    title: "Settings",
    path: "/pages/settings",
    icon: React.createElement(icons.Settings, { className: "mr-2 h-4 w-4" }),
    newTab: false,
  },
];
