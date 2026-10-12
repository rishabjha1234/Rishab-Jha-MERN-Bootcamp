import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [productData, setProductData] = useState([]);

  

  const [limit, setLimit] = useState(0);

  console.log("limit: ", limit);

  async function getProduct() {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}`,
    );
    setProductData(response.data.products);
  }

  useEffect(() => {
    getProduct();
  }, [limit]);

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-12 p-6">
        Ecommerce Website
      </h1>

      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-12">
          <div className="flex flex-col justify-center items-center gap-4">
<label className="text-xl font-bold " htmlFor="">
          Enter No of Product you want
        </label>
        <input
          onChange={(e) => {
            setLimit(e.target.value);
          }}
          className="text-xl font-bold p-2 border border-b-black"
          type="number"
          placeholder="Enter Limit of Product"
        />
          </div>
 

<div>
<input className="text-xl font-bold p-2 border border-b-black" type="text" name="" id="" placeholder="Please search product"/>
<button className="m-2 p-4 border border-b-black bg-red-400 cursor-pointer rounded-xl">Search</button>
</div>
        </div>
       
          
       
        <p className="text-xl font-bold">
          Total Number of Products: {productData.length}
        </p>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-12 mt-12">
        {productData.map((item) => {
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
