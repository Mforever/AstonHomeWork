import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Todo', 'UserTodos'],
  endpoints: (builder) => ({
    // Get todos by user ID
    getTodosByUserId: builder.query<Todo[], number>({
      query: (userId) => `todos?userId=${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Todo' as const, id })),
              { type: 'UserTodos', id: userId },
            ]
          : [{ type: 'UserTodos', id: userId }],
    }),

    // Get single todo by ID
    getTodoById: builder.query<Todo, number>({
      query: (id) => `todos/${id}`,
      providesTags: (result, error, id) => [{ type: 'Todo', id }],
    }),

    // Update todo status
    updateTodoStatus: builder.mutation<Todo, { id: number; completed: boolean }>({
      query: ({ id, completed }) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: { completed },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Todo', id },
        { type: 'Todo', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetTodosByUserIdQuery,
  useGetTodoByIdQuery,
  useUpdateTodoStatusMutation,
} = todosApi;