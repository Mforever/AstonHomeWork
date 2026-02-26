import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: number;
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Post', 'UserPosts'],
  endpoints: (builder) => ({
    // Get all posts with optional filters
    getPosts: builder.query<Post[], {
      userId?: number;
      limit?: number;
      start?: number;
    }>({
      query: ({ userId, limit, start }) => {
        let url = 'posts';
        const params = new URLSearchParams();

        if (userId) params.append('userId', userId.toString());
        if (limit) params.append('_limit', limit.toString());
        if (start) params.append('_start', start.toString());

        const queryString = params.toString();
        return queryString ? `${url}?${queryString}` : url;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    // Get single post by ID
    getPostById: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    // Get posts by user ID
    getPostsByUserId: builder.query<Post[], number>({
      query: (userId) => `posts?userId=${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'UserPosts', id: userId },
            ]
          : [{ type: 'UserPosts', id: userId }],
    }),

    // Create new post
    createPost: builder.mutation<Post, CreatePostRequest>({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    // Update post
    updatePost: builder.mutation<Post, UpdatePostRequest>({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' },
      ],
    }),

    // Delete post
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' },
      ],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;