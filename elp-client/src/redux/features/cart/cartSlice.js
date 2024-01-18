import toast from "react-hot-toast";

const { createSlice } = require("@reduxjs/toolkit");

export const initialState = {
  books:[],
  total:0
  // books: localStorage.getItem("cartItems")
  // ? JSON.parse(localStorage.getItem("cartItems") || "{}")
  // : [],
  // total:localStorage.getItem("cartItems")
  // ? JSON.parse(localStorage.getItem("cartItems") || "{}")
  // : 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const existingBook = state.books.find((book) => book?._id === action.payload._id);

      if (existingBook) {
        existingBook.quantity = existingBook.quantity + 1;
      } else {
        state.books.push({ ...action.payload, quantity: 1 });
      }

      state.total += action.payload.price
      // localStorage.setItem("cartItems", JSON.stringify(state.books));
    },


    removeFromCart: (state, action)=>{
        state.books = state.books.filter((book)=>book._id !== action.payload._id)

        state.total -= action.payload.price * action.payload.quantity;

    },

    removeOneBook : (state, action) => {
        const existingBook = state.books.find((book) => book?._id === action.payload._id);

        if (existingBook && existingBook.quantity >1) {
          existingBook.quantity = existingBook.quantity - 1;
          state.total -= action.payload.price
        } else {
          toast.error('you cannot remove more because this quantity is less than 0')
        }

      
    }
  },
});

export const { addToCart, removeFromCart ,removeOneBook} = cartSlice.actions;

export default cartSlice.reducer;
