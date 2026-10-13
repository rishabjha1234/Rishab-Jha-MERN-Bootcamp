import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [productData, setProductData] = useState([]);
  const [limit, setLimit] = useState(0);
  const [searchProduct, setSearchProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  async function getProducts() {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}`,
    );
    setProductData(response.data.products);
    setFilteredProducts(response.data.products);
  }

  console.log("A");

  useEffect(
    function () {
      console.log("B");

      getProducts();
    },
    [limit],
  );

  function handleSearchFunctionality() {
    const filteredProductsData = productData.filter((eachProductItem) => {
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
        (eachProductItem.brand || "")
          .toLowerCase()
          .includes(searchProduct.toLowerCase())
      );
    });

    setFilteredProducts(filteredProductsData);
  }

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl text-center font-bold">Ecommerce Application</h1>

      <div className="flex  justify-between items-center  p-6">
        <div className="flex flex-col gap-2">
          <label className="text-xl font-bold text-black" htmlFor="">
            Enter limit of products
          </label>
          <input
            value={limit}
            type="number"
            onChange={(e) => {
              setLimit(e.target.value);
            }}
            className="text-xl border border-black font-bold p-2"
            placeholder="Enter no of limit:"
          />
        </div>

        <div className="flex justify-center items-center">
          <h1 className="text-xl text-black font-bold border border-black p-4">
            Total Product Length: {filteredProducts.length}
          </h1>
        </div>

        <div className="flex justify-center items-center gap-4">
          <div className="flex flex-col justify-center items-center">
            <label htmlFor="">Search your product Item</label>
            <input
              value={searchProduct}
              onChange={(e) => {
                setSearchProduct(e.target.value);
              }}
              type="text"
              className="text-xl border border-black font-bold p-2"
            />
          </div>

          <button
            onClick={handleSearchFunctionality}
            className="text-red-600 font-bold border border-red-600 bg-yellow-400 p-2 mt-6 rounded-xl flex justify-center items-center cursor-pointer hover:bg-amber-100 "
          >
            🔎 Search
          </button>
        </div>
      </div>

      <div className="flex  flex-wrap justify-center items-center mt-12 gap-12 ">
        {filteredProducts.map((eachProductItem) => {
          return (
            <div className="w-80 border border-black flex flex-col justify-center items-center p-4 gap-2">
              <img
                width={200}
                height={100}
                src={eachProductItem.images[0]}
                alt=""
              />
              <h1 className="font-bold">Title: {eachProductItem.title}</h1>
              <h1 className="">Description: {eachProductItem.description}</h1>
              <p className="text-red-600 font-bold">
                Category: {eachProductItem.category}
              </p>
              <p className="text-red-600 font-bold">
                💲 Price: {eachProductItem.price}
              </p>

              <button className="p-2 border border-red-600 font-bold rounded-xl hover:bg-amber-100 bg-yellow-200 cursor-pointer">
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
