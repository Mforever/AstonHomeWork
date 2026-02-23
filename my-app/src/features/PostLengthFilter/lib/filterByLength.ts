import { Post } from "../../../entities/Post/ui/PostList";

export interface FilterOptions {
  minLength: number;
  maxLength: number;
}

export const filterByLength = (
  posts: Post[],
  options: FilterOptions,
): Post[] => {
  const { minLength, maxLength } = options;

  return posts.filter((post) => {
    const titleLength = post.title.length;
    return titleLength >= minLength && titleLength <= maxLength;
  });
};
