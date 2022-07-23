import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {items: [], totalQuantity: 0},
    reducers: {
        addItemToCart(state, action) {

            const existingItem = state.items.find(item => item.id === action.payload.id) //*!если нет - добавить, если есть - изменить
            if (!existingItem) {
                state.item.push({
                    title: action.payload.title,
                    itemId: action.payload.id,
                    quantity: 1,
                    price: action.payload.price,
                    totalPrice: action.payload.price,

                })
            } else {
                existingItem.quantity = existingItem.quantity + 1,   //*! логика изменения количества и цены
                    existingItem.price = existingItem.totalPrice + action.payload.price
            }
        },
        removeItemFromCart(state, action) {

        }
    }
})
