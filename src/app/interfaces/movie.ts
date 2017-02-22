export interface Movie {
    id: string;
    title: string;
    overview: string;
    popularity: number;
    vote_count: number;
    vote_average: number;
    runtime: number;
    release_date: string;
    genres: string[];
    poster_path: string;
    backdrop_path: string;
}