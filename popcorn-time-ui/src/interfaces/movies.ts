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
  user: number;
  movie: number;
  rating: number;
  comment: string;
}

// 	{
// 	"id": 1,
// 	"user": 1,
// 	"movie": 1,
// 	"rating": 7,
// 	"comment": "It was awesome!"
// },
