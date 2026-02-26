import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const photosApi = createApi({
  reducerPath: 'photosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Photo', 'AlbumPhotos'],
  endpoints: (builder) => ({
    // Get photos by album ID
    getPhotosByAlbumId: builder.query<Photo[], number>({
      query: (albumId) => `photos?albumId=${albumId}`,
      providesTags: (result, error, albumId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Photo' as const, id })),
              { type: 'AlbumPhotos', id: albumId },
            ]
          : [{ type: 'AlbumPhotos', id: albumId }],
    }),

    // Get single photo by ID
    getPhotoById: builder.query<Photo, number>({
      query: (id) => `photos/${id}`,
      providesTags: (result, error, id) => [{ type: 'Photo', id }],
    }),
  }),
});

export const {
  useGetPhotosByAlbumIdQuery,
  useGetPhotoByIdQuery,
} = photosApi;