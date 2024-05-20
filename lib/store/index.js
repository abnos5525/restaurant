import {configureStore} from "@reduxjs/toolkit";
import {foodApi} from "@/lib/reducers/foodApi";
import {getTotals, populateCart} from "@/lib/reducers/cartSlice";
import cartReducer from "@/lib/reducers/cartSlice"
import {userApi} from "@/lib/reducers/userApi";

export const store = configureStore({
    reducer:{
        cart: cartReducer,
        [foodApi.reducerPath]: foodApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware:(getDefaultMiddleware) =>
            getDefaultMiddleware().concat(foodApi.middleware, userApi.middleware),
})

store.dispatch(foodApi.endpoints.getFoods.initiate())
store.dispatch(userApi.endpoints.getUsers.initiate())

store.dispatch(populateCart())
store.dispatch(getTotals())