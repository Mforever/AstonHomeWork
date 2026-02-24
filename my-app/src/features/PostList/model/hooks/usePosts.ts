import { useState, useEffect } from 'react';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const usePosts = (userId?: number) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = 'https://jsonplaceholder.typicode.com/posts';
    if (userId) {
      url += `?userId=${userId}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, [userId]);

  return { posts, loading };
};