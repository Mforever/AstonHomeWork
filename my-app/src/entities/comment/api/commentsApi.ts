import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Comment', 'PostComments'],
  endpoints: (builder) => ({
    // Get comments by post ID
    getCommentsByPostId: builder.query<Comment[], number>({
      query: (postId) => `comments?postId=${postId}`,
      providesTags: (result, error, postId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Comment' as const, id })),
              { type: 'PostComments', id: postId },
            ]
          : [{ type: 'PostComments', id: postId }],
    }),

    // Get single comment by ID
    getCommentById: builder.query<Comment, number>({
      query: (id) => `comments/${id}`,
      providesTags: (result, error, id) => [{ type: 'Comment', id }],
    }),
  }),
});

export const {
  useGetCommentsByPostIdQuery,
  useGetCommentByIdQuery,
} = commentsApi;