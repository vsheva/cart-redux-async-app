import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'a1',
    title: 'My first book!',
    price: 6,
    description: 'This is the first book I ever wrote.',
  },
  {
    id: 'b1',
    title: 'My second book!',
    price: 5,
    description: 'This is the second book I ever wrote.',
  },
];

const Products = props => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;

//
