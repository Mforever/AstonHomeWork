export interface Post {
  readonly id: number;
  readonly title: string;
  readonly body: string;
  readonly commentsCount: number;
}

export interface Comment {
  readonly id: number;
  readonly postId: number;
  readonly name: string;
  readonly email: string;
  readonly body: string;
}

export type PostId = Post['id'];
export type CommentId = Comment['id'];