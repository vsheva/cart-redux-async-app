import {createSlice} from "@reduxjs/toolkit";
import {uiActions} from "./ui-slice";

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
            const id = action.payload

            const existingItem = state.items.find(item => item.id === id)
            state.totalQuantity --;

            if (existingItem.quantity === 1) {  //удаляем
                state.items = state.items.filter(item => item.id !== id)

            } else { //вычитаем количество и price
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
})

export const sendCartData=(cart)=>{
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Sending...",
            message: "Sending cart data!"
        }));

        const sendRequest = async () => {
            const response = await fetch("https://react-http-53159-default-rtdb.firebaseio.com/cart.json", {
                method: "PUT",
                body: JSON.stringify(cart),
                headers: {'Content-Type': 'application/json'}
            });
            //const responseData = await response.json();
            if (!response.ok) {
                throw new Error("Sending cart data failed!")
            }
        };

        try {
            await sendRequest();

            dispatch(uiActions.showNotification({
                status: "success",
                title: "Success!",
                message: "Sent cart data successfully!"
            }))
        } catch (err) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error!",
                message: "Sending cart data failed!"
            }))
        }

    }
}

export const cartActions =cartSlice.actions

export default cartSlice;


//OLD-VERSION
/*
import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {items: [], totalQuantity: 0},
    reducers: {
        addItemToCart(state, action) {
            const existingItem = state.items.find((item) => item.id === action.payload.id) //!*!если нет - добавить, если есть - изменить
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
                existingItem.quantity = existingItem.quantity + 1;   //!*! логика изменения количества и цены
                existingItem.totalPrice = existingItem.totalPrice + action.payload.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload

            const existingItem = state.items.find(item => item.id === id)
            state.totalQuantity --;

            if (existingItem.quantity === 1) {  //удаляем
                state.items = state.items.filter(item => item.id !== id)

            } else { //вычитаем количество и price
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
})

export const cartActions =cartSlice.actions

export default cartSlice;
*/
