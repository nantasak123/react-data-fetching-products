import { use } from "react";
import "./App.css";
import { useState,useEffect } from "react";
import axios from "axios";

function App() {
  // Variable to get data from the server
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  let [isError, setIsError] = useState(false);

  // Fetch data for fist time on render compoment 
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function fetch data from server
  const fetchProducts = async () => {
    try {
      const result = await axios.get("http://localhost:4001/products");
      setProducts(result.data.data);
      console.log("Products fetched successfully:", result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsError(true);
      setLoading(false);
    }
  };

  // function to delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      setProducts(products.filter((item) => {
        return item.id !== id;
      }));
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
  
  // Check if data is loading or error
  if(loading) {
      return <h1>Loading products...</h1>;
    }
  if(isError) {
      return <h1>Error loading.....</h1>;
    }
  
  //  Render the componen
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>

    {
      products.map((item) => {
        return(
      <div className="product-list">
        <div className="product">
          <div className="product-preview">
            <img
              src={item.image}
              alt="some product"
              width="350"
              height="350"
            />
          </div>
          <div className="product-detail">
            <h1>Product name:{item.name}</h1>
            <h2>Product price: {item.price} Baht</h2>
            <p>Product description: {item.description}</p>
          </div>
          <button className="delete-button" onClick={() => {deleteProduct(item.id)}}>x</button>
        </div>
      </div>

        )
      })
    }


    </div>
  );
}

export default App;
