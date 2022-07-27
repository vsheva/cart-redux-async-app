import classes from './CartButton.module.css';
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/ui-slice";

const CartButton = (props) => {

    const cartQuantity= useSelector(state => state.cart.totalQuantity
    ); //берем часть redux-toolkit, нужно количество в бадже

    const dispatch = useDispatch();

    const toggleHandler=()=>{
       dispatch(uiActions.toggle()) //задиспатчить action, который заведет метод в редюсере
    }

  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
