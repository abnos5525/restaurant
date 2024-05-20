import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const cartAdapter = createEntityAdapter()

const initialState = cartAdapter.getInitialState({
    cartTotalAmount: 0,
    cartTotalQty: 0
})

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        populateCart(state){
            let catrItems = localStorage.getItem("cartItems")
            if(catrItems && catrItems.length > 0){
                cartAdapter.setAll(state, JSON.parse(catrItems))
            }
        },
        addToCart(state, action){
            const productExist = state.entities[action.payload.id]
            if(productExist){
                state.entities[action.payload.id].cartQty += 1
            }else{
                cartAdapter.addOne(state, action.payload)
                toast.success("محصول به سبد خرید اضافه شد", {position:"bottom-right"})
            }
            localStorage.setItem("cartItems", JSON.stringify(state.entities))
        },
        getTotals(state){
            let {total, qty} = Object.values(state.entities).reduce((cartTotal, cartItem) =>{
                    const {price, cartQty} = cartItem
                    const itemTotal = price * cartQty
                    cartTotal.total += itemTotal
                    cartTotal.qty += cartQty

                    return cartTotal
                },
                {
                    total: 0,
                    qty: 0
                }
            )
            state.cartTotalQty = qty
            state.cartTotalAmount = total
        },
        decreaseCart(state, action){
            const product = state.entities[action.payload.id]
            if(product.cartQty > 1){
                product.cartQty -= 1
            }else if(product.cartQty === 1){
                cartAdapter.removeOne(state, action.payload.id)
                toast.error("محصول از سبد خرید حذف شد", {position:"bottom-left"})
            }
            localStorage.setItem("cartItems", JSON.stringify(state.entities))
        },
        removeFromCart(state,action){
                cartAdapter.removeOne(state, action.payload.id)
                toast.error("محصول از سبد خرید حذف شد", {position:"bottom-left"})
                localStorage.setItem("cartItems", JSON.stringify(state.entities))
        }
    }
})

export const {selectAll} = cartAdapter.getSelectors((state) => state.cart)

export const {addToCart, getTotals, decreaseCart, removeFromCart, populateCart} = cartSlice.actions

export default cartSlice.reducer
