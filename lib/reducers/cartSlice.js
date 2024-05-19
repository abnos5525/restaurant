import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {toast} from "react-toastify";


const cartAdapter = createEntityAdapter()

const initialState = cartAdapter.getInitialState({
    //                 ids: [], entities: {}       => automatically created
    cartTotalAmount: 0,
    cartTotalQty: 0
})

// const initialState = {
//     cartItems: localStorage.getItem("cartItems") ?
//         JSON.parse(localStorage.getItem("cartItems")) : [],
//     cartTotalQty: 0,
//     cartTotalAmount: 0
// }

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        populateCart(state){
            if(localStorage.getItem("cartItems")){
                cartAdapter.setAll(state, JSON.parse(localStorage.getItem("cartItems")))
            }
        },
        //////////////////////////////////////////////////////

        addToCart(state, action){

                        //AsyncThunk method
            // const existingIndex = state.cartItems.findIndex(item =>
            //     item.id === action.payload.id
            // )

            // if(existingIndex >=0){
            //     state.cartItems[existingIndex] = {
            //         ...state.cartItems[existingIndex],
            //         cartQty : state.cartItems[existingIndex].cartQty + 1
            //     }
            //
            //     toast.info("تعداد افزایش یافت", {position: "bottom-right"})
            // }else {
            //     let tempProductItem = {
            //         ...action.payload,
            //         cartQty: action.payload.cartQty
            //     }
            //     state.cartItems.push(tempProductItem)
            //     toast.success("محصول به سبد خرید اضافه شد", {position:"bottom-right"})
            // }

            //localStorage.setItem("cartItems", JSON.stringify(state.cartItems))


            const productExist = state.entities[action.payload.id]

            if(productExist){
                state.entities[action.payload.id].cartQty += 1
                toast.info("تعداد افزایش یافت", {position: "bottom-right"})
            }else{
                cartAdapter.addOne(state, action.payload)
                toast.success("محصول به سبد خرید اضافه شد", {position:"bottom-right"})
            }

            localStorage.setItem("cartItems", JSON.stringify(state.entities))
        },
        getTotals(state){
            // let {total, qty} = state.cartItems.reduce((cartTotal, cartItem) =>{
            //         const {price, cartQty} = cartItem
            //         const itemTotal = price * cartQty
            //
            //         cartTotal.total += itemTotal
            //         cartTotal.qty += cartQty
            //
            //         return cartTotal
            //     },
            //     {
            //         total: 0,
            //         qty: 0
            //     }
            // )
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
            // const itemIndex = state.cartItems.findIndex((item)=> item.id === action.payload.id)
            //
            // if(state.cartItems[itemIndex].cartQty > 1){
            //     state.cartItems[itemIndex].cartQty -= 1
            //
            //     toast.info("تعداد کاهش یافت", {position:"bottom-left"})
            // }else if(state.cartItems[itemIndex].cartQty === 1){
            //     const nextCartItems = state.cartItems.filter((item)=> item.id !== action.payload.id)
            //
            //     state.cartItems = nextCartItems
            //
            //     toast.error("محصول از سبد خرید حذف شد", {position:"bottom-left"})
            // }
            //
            // localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

            const product = state.entities[action.payload.id]

            if(product.cartQty > 1){
                product.cartQty -= 1

                toast.info("تعداد کاهش یافت", {position:"bottom-left"})
            }else if(product.cartQty === 1){
                cartAdapter.removeOne(state, action.payload.id)

                toast.error("محصول از سبد خرید حذف شد", {position:"bottom-left"})
            }

            localStorage.setItem("cartItems", JSON.stringify(state.entities))
        },
        removeFromCart(state,action){
            // state.cartItems.map((cartItem)=> {
            //     if(cartItem.id === action.payload.id){
            //         const nextCartItems = state.cartItems.filter((item)=> item.id !== cartItem.id)
            //         state.cartItems = nextCartItems
            //
            //         toast.error("محصول از سبد خرید حذف شد", {position:"bottom-left"})
            //     }
            //
            //     localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            //
            //     return state
            // })

                cartAdapter.removeOne(state, action.payload.id)

                toast.error("محصول از سبد خرید حذف شد", {position:"bottom-left"})


                localStorage.setItem("cartItems", JSON.stringify(state.entities))

        }
    }
})

export const {selectAll} = cartAdapter.getSelectors((state) => state.cart)


export const {addToCart, getTotals, decreaseCart, removeFromCart, populateCart} = cartSlice.actions

export default cartSlice.reducer
