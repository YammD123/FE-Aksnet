export type AnimeType = {
  id: number;
  title: string;
  cover_url: string;
  synopsis: string;
  rating: string;
  episode_link:[]
  genre: [];
}

export type PaginationType = {
  animes: AnimeType[];
  page: number
  totalPage: number
}