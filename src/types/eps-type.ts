export type EpsType = {
  id: string;
  episode_number: number;
  video_source: Video[];
}

export type Video = {
    id:string
    resolution: string;
    video_url: string;
}