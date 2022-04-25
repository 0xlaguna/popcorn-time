export interface IMovie {
  id: number;
  title: string;
  year: number;
  runtime: string;
  released: string;
  genre: string;
  cover: string;
  plot: string;
}

export interface IRating {
  id: number;
  rating: number;
  comment: string;
  username: string;
  posted_at: Date;
}
