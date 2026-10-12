import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [productData, setProductData] = useState([]);

  const [newFilteredProductData, setNewFilterProductData] = useState([]);

  const [searchProduct, setSearchProduct] = useState("");

  const [limit, setLimit] = useState(0);

  console.log("limit: ", limit);

  async function getProduct() {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}`,
    );
    setNewFilterProductData(response.data.products);
    setProductData(response.data.products);
  }

  useEffect(() => {
    getProduct();
  }, [limit]);

  function handleSearch() {
    const filteredProductsData = productData.filter((eachProductItem) => {
      return (
        eachProductItem.title
          .toLowerCase()
          .includes(searchProduct.toLowerCase()) ||
        eachProductItem.category
          .toLowerCase()
          .includes(searchProduct.toLowerCase()) ||
        eachProductItem.tags.some((item) =>
          item.toLowerCase().includes(searchProduct),
        ) ||
        (eachProductItem.brand || "")
          .toLowerCase()
          .includes(searchProduct.toLowerCase())
      );
    });

    console.log("Filter:", filteredProductsData);

    setNewFilterProductData(filteredProductsData);
  }

  function handleAddToCart() {}

  return (
    <>
      <div className="w-full p-6">
        <h1 className="text-2xl font-bold text-center mt-12 p-6">
          Ecommerce Website
        </h1>

        <div className="flex justify-end">
          <button className="text-xl p-2 border border-red-600 rounded-lg flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-100">
            🛒 Add to Cart{" "}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500  text-sm font-bold text-white leading-none">
              0
            </span>
          </button>
        </div>

        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-12">
            <div className="flex flex-col justify-center items-center gap-4">
              <label className="text-xl font-bold " htmlFor="">
                Enter No of Product you want
              </label>
              <input
                value={limit}
                onChange={(e) => {
                  setLimit(e.target.value);
                }}
                className="text-xl font-bold p-2 border border-b-black"
                type="number"
                placeholder="Enter Limit of Product"
              />
            </div>

            <div>
              <input
                className="text-xl font-bold p-2 border border-b-black"
                type="text"
                name=""
                id=""
                value={searchProduct}
                placeholder="Please search product"
                onChange={(e) => {
                  setSearchProduct(e.target.value);
                }}
              />
              <button
                onClick={handleSearch}
                className="m-2 p-4 border border-b-black bg-red-400 cursor-pointer rounded-xl"
              >
                Search
              </button>
            </div>
          </div>

          <p className="text-xl font-bold">
            Total Number of Products: {newFilteredProductData.length}
          </p>
        </div>

        <div className="flex justify-center items-center flex-wrap gap-12 mt-12">
          {newFilteredProductData.map((item) => {
            return (
              <div
                key={item.id}
                className="w-80 flex justify-center items-center flex-col border border-b-black gap-2 p-4"
              >
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
                <button className="text-xl p-2 border border-red-600 rounded-lg flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-100 bg-amber-400" onClick={handleAddToCart}>Add to Cart</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
