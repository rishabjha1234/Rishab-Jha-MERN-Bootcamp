import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Home = () => {
  "use no memo";

  const [limit, setLimit] = useState(0);

  const [searchProduct, setSearchProduct] = useState("");

  const [productData, setProductData] = useState([]);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [filteredProductData, setFilteredProductData] = useState([]);

  async function getProduct() {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}`,
    );
    setProductData(response.data.products);
    setFilteredProductData(response.data.products);
  }

  useEffect(() => {
    getProduct();
  }, [limit]);

  function handleAddToCart(product) {
    dispatch(addToCart(product));
  }

  function handleProductSearch() {
    const filteredProductDataResponse = productData.filter(
      (eachProductItem) => {
        return (
          eachProductItem.title
            .toLowerCase()
            .includes(searchProduct.toLowerCase()) ||
          eachProductItem.category
            .toLowerCase()
            .includes(searchProduct.toLowerCase()) ||
          eachProductItem.tags.some((item) =>
            item.toLowerCase().includes(searchProduct.toLowerCase()),
          ) ||
          (eachProductItem.brand || "").includes(searchProduct.toLowerCase())
        );
      },
    );

    setFilteredProductData(filteredProductDataResponse);
  }

  const totalCartItems = cartItems.reduce((sum, eachProductItemFromCart) => {
    console.log("hello world!");
    return sum + eachProductItemFromCart.quantity;
  }, 0);

  console.log("total cart item:", totalCartItems);

  console.log("search product input: ", searchProduct);

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-12 p-6">
        Ecommerce Website
      </h1>
      <div className="flex justify-between  gap-4 p-4 items-center">
        <div className="flex flex-col">
          <label>Enter product limit No:</label>
          <input
            value={limit}
            type="number"
            placeholder="Enter Product No"
            className="border border-b-black p-2"
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          />
        </div>

        <p className="text-xl font-bold">
          Total Number of Product: {filteredProductData.length}
        </p>

        <div className="flex justify-center items-center gap-4 p-2">
          <div className="flex flex-col">
            <label htmlFor="">Search your product</label>
            <input
              onChange={(e) => {
                setSearchProduct(e.target.value);
              }}
              value={searchProduct}
              className="border border-b-black p-2"
              type="text"
              placeholder="Enter search Item"
            />
          </div>

          <button
            onClick={handleProductSearch}
            className="p-2 mt-7 border border-red-600 bg-yellow-400 hover:bg-white cursor-pointer"
          >
            🔎 Search
          </button>
        </div>

        <div>
          <Link to={"/addToCart"}>
            <button className="text-xl font-bold border border-black bg-yellow-400 rounded-xl justify-center items-center p-2 m-4 cursor-pointer mt-12 hover:bg-amber-600">
              🛒 Add to Cart ({totalCartItems})
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-12 mt-12">
        {filteredProductData.map((item) => {
          return (
            <div className="w-80 flex justify-center items-center flex-col border border-b-black gap-2 p-4">
              <img
                width={200}
                height={100}
                src={item.images[0]}
                alt="product image"
              />
              <h1>Title: {item.title}</h1>

              <h1>Description: {item.description}</h1>
              <h1 className="font-bold">Category: {item.category}</h1>
              <h1 className="text-red-600 font-bold">Price: {item.price}</h1>
              <button
                onClick={() => {
                  handleAddToCart(item);
                }}
                className="text-[16px] border border-red-600 bg-amber-300 rounded-xl p-2 hover:bg-zinc-200 cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
