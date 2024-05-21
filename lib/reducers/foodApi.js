import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const foodApi = createApi({
    reducerPath:"foodApi",
    baseQuery: fetchBaseQuery({baseUrl: process.env.SERVER_URL}),
    tagTypes:["FOOD"],
    endpoints:(builder) => ({
        getFoods: builder.query({
            query: () => '/foods',
            providesTags: (result=[], error, arg) =>[
                "FOOD",
                ...result.map(({id})=>({type: "FOOD", id}))
            ]
        }),
        getFood: builder.query({
            query: (foodId) => `/foods/${foodId}`,
            providesTags: (result, error, id) => [{ type: 'FOOD', id }],
        }),
        createFood: builder.mutation({
            query: food => ({
                url: '/foods',
                method: "POST",
                body: food
            }),
            invalidatesTags: ["FOOD"]
        }),
        updateFood: builder.mutation({
            query: food => ({
                url: `/foods/${food.id}`,
                method: "PUT",
                body: food
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'FOOD', id }],
        })
    })
})

export const {
    useGetFoodsQuery,
    useGetFoodQuery,
    useCreateFoodMutation,
    useUpdateFoodMutation
} = foodApi