import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { Post, postsApi } from '../../api/postsApi';

// Создание адаптера для постов
export const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

// Начальное состояние
const initialState = postsAdapter.getInitialState({
  loading: false,
  error: null as string | null,
  selectedPostId: null as number | null,
});

// Создание slice
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPostId: (state, action) => {
      state.selectedPostId = action.payload;
    },
    clearSelectedPostId: (state) => {
      state.selectedPostId = null;
    },
    addOnePost: postsAdapter.addOne,
    addManyPosts: postsAdapter.addMany,
    updateOnePost: postsAdapter.updateOne,
    removeOnePost: postsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    // Обработка состояний загрузки из RTK Query
    builder
      .addMatcher(
        postsApi.endpoints.getPosts.matchPending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        postsApi.endpoints.getPosts.matchFulfilled,
        (state, { payload }) => {
          postsAdapter.setAll(state, payload);
          state.loading = false;
        }
      )
      .addMatcher(
        postsApi.endpoints.getPosts.matchRejected,
        (state, { error }) => {
          state.loading = false;
          state.error = error.message || 'Ошибка загрузки постов';
        }
      )
      // Обработка загрузки постов пользователя
      .addMatcher(
        postsApi.endpoints.getPostsByUserId.matchFulfilled,
        (state, { payload }) => {
          postsAdapter.upsertMany(state, payload);
        }
      )
      // Обработка загрузки одного поста
      .addMatcher(
        postsApi.endpoints.getPostById.matchFulfilled,
        (state, { payload }) => {
          postsAdapter.upsertOne(state, payload);
        }
      );
  },
});

// Экспорт действий
export const {
  setSelectedPostId,
  clearSelectedPostId,
  addOnePost,
  addManyPosts,
  updateOnePost,
  removeOnePost,
} = postSlice.actions;

// Экспорт селекторов
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectTotal: selectTotalPosts,
} = postsAdapter.getSelectors((state: any) => state.posts);

// Дополнительные селекторы
export const selectPostsLoading = (state: any) => state.posts.loading;
export const selectPostsError = (state: any) => state.posts.error;
export const selectSelectedPostId = (state: any) => state.posts.selectedPostId;

export const selectSelectedPost = createSelector(
  [selectPostEntities, selectSelectedPostId],
  (postEntities, selectedId) => (selectedId ? postEntities[selectedId] : null)
);

export const selectPostsByUserId = (userId: number) =>
  createSelector([selectAllPosts], (posts) =>
    posts.filter((post) => post.userId === userId)
  );

export const selectPostsCountByUserId = (userId: number) =>
  createSelector([selectAllPosts], (posts) =>
    posts.filter((post) => post.userId === userId).length
  );

// Экспорт reducer
export default postSlice.reducer;