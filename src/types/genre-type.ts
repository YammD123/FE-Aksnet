import { AnimeType } from "./anime-type";

export type genreType = {
    id: string;
    name: string;
}

export type GenreAnimeType = {
    anime:AnimeType[]; 
}