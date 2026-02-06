import React from "react";
import { PostCardProps } from "../types/types";

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <div className="post-meta">
        <span className="author">Автор: {post.author}</span>
        <span className="date">{post.date}</span>
      </div>
    </div>
  );
};

export default PostCard;
