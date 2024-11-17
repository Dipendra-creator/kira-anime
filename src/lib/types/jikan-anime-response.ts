// Pagination Interface
interface Pagination {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
        count: number;
        total: number;
        per_page: number;
    };
}

// Image URLs Interface
interface ImageURLs {
    image_url: string;
    small_image_url?: string;
    large_image_url?: string;
}

// Trailer Interface
interface Trailer {
    youtube_id?: string;
    url?: string;
    embed_url?: string;
    images: {
        image_url: string;
        small_image_url?: string;
        medium_image_url?: string;
        large_image_url?: string;
        maximum_image_url?: string;
    };
}

// Title Interface
interface Title {
    type: string;
    title: string;
}

// Date Prop Interface
interface DateProp {
    day?: number;
    month?: number;
    year?: number;
}

// Aired Dates Interface
interface Aired {
    from: string;
    to?: string;
    prop: {
        from: DateProp;
        to: DateProp;
    };
    string: string;
}

// Producers, Licensors, Studios, Genres Interface
interface ProducerLicensorStudio {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

// Genre Interface
interface Genre {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

// Data Interface for Each Anime Entry
interface AnimeData {
    joined?: boolean;
    pendingRequests?: number;
    mal_id: number;
    url: string;
    images: {
        jpg: ImageURLs;
        webp: ImageURLs;
    };
    trailer: Trailer;
    approved: boolean;
    titles: Title[];
    title: string;
    title_english?: string;
    title_japanese?: string;
    title_synonyms?: string[];
    type?: string;
    source?: string;
    episodes?: number;
    status?: string;
    airing: boolean;
    aired: Aired;
    duration?: string;
    rating?: string;
    score?: number;
    scored_by?: number;
    rank?: number;
    popularity?: number;
    members?: number;
    favorites?: number;
    synopsis?: string;
    background?: string;
    season?: string;
    year?: number;
    broadcast?: {
        day?: string;
        time?: string;
        timezone?: string;
        string?: string;
    };
    producers?: ProducerLicensorStudio[];
    licensors?: ProducerLicensorStudio[];
    studios?: ProducerLicensorStudio[];
    genres?: Genre[];
    explicit_genres?: Genre[];
    themes?: Genre[];
    demographics?: Genre[];
}

// Main API Response Interface
interface ApiResponse {
    pagination: Pagination;
    data: AnimeData[];
}

export type { ApiResponse, AnimeData, Pagination, ImageURLs, Trailer, Title, DateProp, Aired, ProducerLicensorStudio, Genre };