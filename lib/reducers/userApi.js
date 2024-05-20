import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery: fetchBaseQuery({baseUrl: process.env.SERVER_URL}),
    tagTypes:["USER"],
    endpoints:(builder) => ({
        getUsers: builder.query({
            query: () => '/users',
            providesTags: (result) =>
                result ?
                    [...result.map(({ id }) => ({ type: 'User', id })), 'User']
                    : ['User'],
        }),
        getUser: builder.query({
            query: (userId) => `/users/${userId}`,
            providesTags: (result, error, id) => [{ type: 'User', id }],
        }),
        createUser: builder.mutation({
            query: user => ({
                url: '/users',
                method: "POST",
                body: user
            }),
            invalidatesTags: ["USER"]
        }),
        updateUser: builder.mutation({
            query: user => ({
                url: `/users/${user.id}`,
                method: "PUT",
                body: user
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
        })
    })
})

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
} = userApi