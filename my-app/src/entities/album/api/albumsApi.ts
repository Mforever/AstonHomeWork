import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Album {
  id: number;
  userId: number;
  title: string;
}

export const albumsApi = createApi({
  reducerPath: 'albumsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Album', 'UserAlbums'],
  endpoints: (builder) => ({
    // Get albums by user ID
    getAlbumsByUserId: builder.query<Album[], number>({
      query: (userId) => `albums?userId=${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Album' as const, id })),
              { type: 'UserAlbums', id: userId },
            ]
          : [{ type: 'UserAlbums', id: userId }],
    }),

    // Get single album by ID
    getAlbumById: builder.query<Album, number>({
      query: (id) => `albums/${id}`,
      providesTags: (result, error, id) => [{ type: 'Album', id }],
    }),
  }),
});

export const {
  useGetAlbumsByUserIdQuery,
  useGetAlbumByIdQuery,
} = albumsApi;