import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import {useSelector} from "react-redux";


//подключим тредакс тулкит и выведем в компоненте его данные через map
//это item, к-й мы передаем в CartItem для каждого itema , к-й мы получаем из редакс
//взять данные из редакса и проспособить себе

const Cart = (props) => {

   const cartItems= useSelector((state) => state.cart.items)


  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
          {cartItems.map((item)=><CartItem
              key={item.id}   //пример добавления key, а не ниже
              item={{
                  title: item.title,
                  quantity: item.quantity,
                  total: item.totalPrice,
                  price:item.price,
                  id:item.id, //добавил в пропсы
              }}
          />)}
      </ul>
    </Card>
  );
};

export default Cart;
