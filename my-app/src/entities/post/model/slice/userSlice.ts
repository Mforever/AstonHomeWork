import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { User, usersApi } from '../../api/usersApi';

// Create entity adapter for users
export const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// Define the initial state
const initialState = usersAdapter.getInitialState({
  loading: false,
  error: null as string | null,
  selectedUserId: null as number | null,
});

// Create the slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
    clearSelectedUserId: (state) => {
      state.selectedUserId = null;
    },
    addOneUser: usersAdapter.addOne,
    addManyUsers: usersAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        usersApi.endpoints.getUsers.matchPending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        usersApi.endpoints.getUsers.matchFulfilled,
        (state, { payload }) => {
          usersAdapter.setAll(state, payload);
          state.loading = false;
        }
      )
      .addMatcher(
        usersApi.endpoints.getUsers.matchRejected,
        (state, { error }) => {
          state.loading = false;
          state.error = error.message || 'Failed to fetch users';
        }
      )
      .addMatcher(
        usersApi.endpoints.getUserById.matchFulfilled,
        (state, { payload }) => {
          usersAdapter.upsertOne(state, payload);
        }
      );
  },
});

// Export actions
export const {
  setSelectedUserId,
  clearSelectedUserId,
  addOneUser,
  addManyUsers,
} = userSlice.actions;

// Export selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors((state: any) => state.users);

// Additional selectors
export const selectUsersLoading = (state: any) => state.users.loading;
export const selectUsersError = (state: any) => state.users.error;
export const selectSelectedUserId = (state: any) => state.users.selectedUserId;

export const selectSelectedUser = createSelector(
  [selectUserEntities, selectSelectedUserId],
  (userEntities, selectedId) => (selectedId ? userEntities[selectedId] : null)
);

// Export reducer
export default userSlice.reducer;