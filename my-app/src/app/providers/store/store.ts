import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postsApi } from '../../../entities/post/api/postsApi';
import { commentsApi } from '../../../entities/comment/api/commentsApi';
import { albumsApi } from '../../../entities/album/api/albumsApi';
import { photosApi } from '../../../entities/photo/api/photosApi';
import { todosApi } from '../../../entities/todo/api/todosApi';
import { usersApi } from '../../../entities/user/api/usersApi';
import postReducer from '../../../entities/post/model/slice/postSlice';
import userReducer from '../../../entities/user/model/slice/userSlice';

export const store = configureStore({
  reducer: {
    // API reducers
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,

    // Local slices
    posts: postReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postsApi.middleware,
      commentsApi.middleware,
      albumsApi.middleware,
      photosApi.middleware,
      todosApi.middleware,
      usersApi.middleware
    ),
});

// Enable refetchOnFocus and refetchOnReconnect
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;