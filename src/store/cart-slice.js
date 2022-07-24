import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {items: [], totalQuantity: 0},
    reducers: {
        addItemToCart(state, action) {
            const existingItem = state.items.find((item) => item.id === action.payload.id) //*!если нет - добавить, если есть - изменить
            state.totalQuantity ++;
            if (!existingItem) {
                state.items.push({
                    id: action.payload.id,
                    title: action.payload.title,
                    price: action.payload.price,
                    quantity: 1,
                    totalPrice: action.payload.price,

                })
            } else {
                existingItem.quantity = existingItem.quantity + 1;   //*! логика изменения количества и цены
                    existingItem.totalPrice = existingItem.totalPrice + action.payload.price;
            }
        },
        removeItemFromCart(state, action) {

            const existingItem = state.items.find(item => item.id === action.payload)
            state.totalQuantity --;

            if (existingItem.quantity === 1) {  //удаляем
                state.items = state.items.filter(item => item.id !== action.payload)

            } else { //вычитаем количество и price
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
})


export const cartActions =cartSlice.actions
export default cartSlice;