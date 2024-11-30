import type { AnimeData } from "@/lib/types/jikan-anime-response"

interface AnimeResponse {
    data: AnimeData[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
        current_page: number;
        items: {
            count: number;
            total: number;
            per_page: number;
        };
    };
}

export const fetchAnimeData = async (page: number, type: string): Promise<AnimeResponse> => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?page=${page}`)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

