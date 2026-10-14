import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // logic to manage cart data
      console.log(
        "action coming from our component ui using dispatch method:",
        action.addToCart,
      );
      const product = action.payload;
      const existingProduct = state.items.find((item) => item.id == product.id);

      if (existingProduct) {
        existingProduct.quantity = existingProduct.quantity + 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
