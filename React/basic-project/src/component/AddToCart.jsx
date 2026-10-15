import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const AddToCart = () => {
  const allCartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  console.log("allCartItems: ", allCartItems);


  const grandTotalAmountToBePay = allCartItems.reduce((sum,eachProductItem)=>{
    return(
        sum + eachProductItem.quantity*eachProductItem.price
    )
  },0)


  return (
    <div>
        
 <h1 onClick={()=>{navigate("/")}} className="text-4xl text-center font-bold text-red-600 mt-20 cursor-pointer">Go Back to Home Page</h1>
    <div className="mt-20">
      {allCartItems.length <= 0 ? (
        <h1 className="text-center text-4xl font-bold mt-20">Cart is Empty 🗑️</h1>
      ) : (
        <div className="flex justify-center items-center flex-col gap-4">
          {allCartItems.map((eachProductItem) => {
            return (
              <div className=" flex justify-center items-center flex-col border border-b-black gap-2 p-4">
            
                <h1 className="text-xl font-bold text-wrap">Title: {eachProductItem.title}</h1>
                <h1 className="font-bold">Category: {eachProductItem.category}</h1>
                <h1 className="text-red-600 font-bold">Price: {eachProductItem.price}</h1>
                <h1 className="font-bold">Quantity: {eachProductItem.quantity}</h1>


                <h1 className="text-red-800 font-extrabold">Sub Total Price: {(eachProductItem.quantity*eachProductItem.price).toFixed(2)}</h1>

              </div>
            );
          })}

          <button className="m-20 text-2xl font-extrabold border border-black bg-zinc-200 hover:bg-yellow-500 p-4 cursor-pointer ">Grand Total Amount to be Pay: <span className="text-red-600">
            {(grandTotalAmountToBePay).toFixed(2)}
            </span> </button>


        </div>

        
      )}
    </div>
    </div>
   
  );
};

export default AddToCart;
