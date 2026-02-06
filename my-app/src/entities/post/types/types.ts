export interface Post {
  id: number;
  title: string;
  body: string;
  date: string;
  author: string;
}

export interface PostCardProps {
  post: Post;
}
