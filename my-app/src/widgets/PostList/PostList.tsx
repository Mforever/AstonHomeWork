import React from "react";
import PostCard from "../../entities/post/ui/PostCard";
import { Post } from "../../entities/post/types/types";
import { mockPosts } from "../../shared/api/posts";

interface PostListProps {
  posts?: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts = mockPosts }) => {
  return (
    <div className="post-list">
      <h2>Список постов</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
