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
            query: (foodId) => `/foods/${foodId}`
        })
    })
})

export const {
    useGetFoodsQuery,
    useGetFoodQuery
} = foodApi