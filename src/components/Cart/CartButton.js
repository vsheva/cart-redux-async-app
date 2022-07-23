import classes from './CartButton.module.css';
import {useDispatch} from "react-redux";
import {uiActions} from "../../store/ui-slice";

const CartButton = (props) => {
    const dispatch = useDispatch();

    const toggleHandler=()=>{
       dispatch(uiActions.toggle()) //задиспатчить action, который заведет метод в редюсере
    }

  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
