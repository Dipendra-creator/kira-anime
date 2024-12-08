# AnimeHub

<div align="center">
  <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-xDxKIwL6pL82JMIPzX2rqreFRXl05i.png" alt="AnimeHub Logo" width="120" height="120" style="border-radius: 50%;" />
  <h1>AnimeHub - Your Anime Community Platform</h1>
</div>

## Overview

AnimeHub is a modern web application built with Next.js that serves as a community platform for anime enthusiasts. It features a sleek UI with 3D card animations, real-time updates, and comprehensive anime information sourced from the MyAnimeList API.

## Features

### 🎨 Modern UI Components
- **3D Card Animations**: Interactive cards with depth and motion effects
- **Responsive Design**: Seamless experience across all devices
- **Dark Theme**: Eye-friendly dark mode interface

### 🔐 Authentication
- Email/Password login
- OAuth integration with:
  - GitHub
  - Google

### 📱 Core Features
- **Anime Discovery**: Browse and search anime with advanced filters
- **Community Features**: Join anime-specific communities
- **Real-time Updates**: Stay updated with the latest anime discussions
- **Infinite Scroll**: Smooth content loading experience

## Screenshots

<div align="center">
  <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AttackOnTitan-bx7dJ4l2aVU9YJQGIXDyhJ9Hdx3Hd1.jpg" alt="Dashboard Preview" width="600" />
  <p><em>Dashboard featuring trending anime with 3D card effects</em></p>
</div>

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Authentication**: Custom implementation with OAuth support
- **UI Components**: 
  - Radix UI primitives
  - Shadcn/ui components
  - Custom 3D card implementations
- **API Integration**: MyAnimeList API

## Project Structure
src/<br>
├── app/<br>
│ ├── (site)/<br>
│ │ ├── pages/<br>
│ │ │ ├── community/<br>
│ │ │ └── home/<br>
│ └── assets/<br>
├── components/<br>
│ ├── basics/<br>
│ ├── ui/<br>
│ └── anime-3d-card.tsx<br>
├── lib/<br>
│ ├── types/<br>
│ └── utils/<br>


## Getting Started

1. Clone the repository:

```bash
git clone 
```

## Key Features Implementation

### 3D Card Animation
The project features custom 3D card animations implemented using CSS transforms and React components. The cards provide an immersive experience when browsing anime content.

### Infinite Scroll
Implemented using Intersection Observer API and React Query for efficient data fetching and pagination.

### Real-time Updates
Uses React Query for data synchronization and real-time updates of anime information and community features.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- MyAnimeList API for providing comprehensive anime data
- Shadcn/ui for the beautiful UI components
- Radix UI for accessible component primitives