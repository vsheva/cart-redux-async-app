import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import React, { Fragment, useEffect } from 'react';
import Notification from './components/UI/Notification';
import uiSlice, { uiActions } from './store/ui-slice';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true; //!

function App() {
  console.log('is Initial');
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification); //*обратно из редакса
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData()); //вызываем thunk
  }, [dispatch]);

  useEffect(() => {
    //IMPORTANT
    console.log('before If');
    if (isInitial) {
      console.log('in If');
      isInitial = false;
      return;
    }
    console.log('after If');

    //not sending again PUT
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    //из редакса обратно
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

//OLD-VERSION
/**
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector, useDispatch} from "react-redux";
import React, {Fragment, useEffect} from "react";
import Notification from "./components/UI/Notification";
import uiSlice, {uiActions} from  "./store/ui-slice"

let isInitial = true;//!

function App() {
    console.log("is Initial")
    const showCart= useSelector((state)=>state.ui.cartIsVisible);
    const cart = useSelector((state)=>state.cart);
    const notification=  useSelector(state => state.ui.notification) //!*обратно из редакса
    const dispatch = useDispatch();


    useEffect(()=>{
        const sendCartData= async()=>{
            dispatch(uiActions.showNotification({
                status:"pending",
                title:"Sending...",
                message:"Sending cart data!"
            }))

            const response = await fetch("https://react-http-53159-default-rtdb.firebaseio.com/cart.json",{
                method: "PUT",
                body: JSON.stringify(cart),
                headers: {'Content-Type': 'application/json'}
            });
            const responseData = await response.json();
            if(!response.ok){throw new Error("Sending cart data failed!")}

            dispatch(uiActions.showNotification({
                status:"success",
                title:"Success!",
                message:"Sent cart data successfully!"
            }))
        };
        //IMPORTANT
        console.log("before If")
        if(isInitial) {
            console.log("in If")
            isInitial=false;
            return;
        }
        console.log("after If")

        sendCartData().catch((error) => {               //!*sendCartData().catch(()=>{})
            //туда в редакс
            dispatch(uiActions.showNotification({
                status:"error",
                title:"Error!",
                message:"Sending cart data failed!"
            }))
        });

    },[cart,dispatch]);

    return (
        //из редакса обратно
        <Fragment>
            {notification && <Notification
                status={notification.status}
                title={notification.title}
                message={notification.message}
            />}
            <Layout>
                {showCart && <Cart/>}
                <Products />
            </Layout>
        </Fragment>
    );
}

export default App;*/
