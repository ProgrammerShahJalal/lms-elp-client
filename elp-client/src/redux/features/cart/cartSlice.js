// import toast from "react-hot-toast";

// const { createSlice } = require("@reduxjs/toolkit");

// export const initialState = {
//   books:[],
//   total:0
 
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {

//     addToCart: (state, action) => {
//       const existingBook = state.books.find((book) => book?._id === action.payload._id);

//       if (existingBook) {
//         existingBook.quantity = existingBook.quantity + 1;
//       } else {
//         state.books.push({ ...action.payload, quantity: 1 });
//       }

//       state.total += action.payload.price
//       // localStorage.setItem("cartItems", JSON.stringify(state.books));
//     },


//     removeFromCart: (state, action)=>{
//         state.books = state.books.filter((book)=>book._id !== action.payload._id)

//         state.total -= action.payload.price * action.payload.quantity;

//     },

//     removeOneBook : (state, action) => {
//         const existingBook = state.books.find((book) => book?._id === action.payload._id);

//         if (existingBook && existingBook.quantity >1) {
//           existingBook.quantity = existingBook.quantity - 1;
//           state.total -= action.payload.price
//         } else {
//           toast.error('you cannot remove more because this quantity is less than 0')
//         }

      
//     }
//   },
// });

// export const { addToCart, removeFromCart ,removeOneBook} = cartSlice.actions;

// export default cartSlice.reducer;
import toast from "react-hot-toast";

const { createSlice } = require("@reduxjs/toolkit");

// Retrieve cart data from localStorage
const storedCart = JSON.parse(localStorage.getItem("cart")) || {
  books: [],
  total: 0,
};

export const initialState = storedCart;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingBook = state.books.find(
        (book) => book?._id === action.payload._id
      );

      if (existingBook) {
        existingBook.quantity = existingBook.quantity + 1;
      } else {
        state.books.push({ ...action.payload, quantity: 1 });
      }

      state.total += action.payload.price;

      // Update localStorage with the new cart data
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      state.books = state.books.filter(
        (book) => book._id !== action.payload._id
      );

      state.total -= action.payload.price * action.payload.quantity;

      // Update localStorage with the new cart data
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeOneBook: (state, action) => {
      const existingBook = state.books.find(
        (book) => book?._id === action.payload._id
      );

      if (existingBook && existingBook.quantity > 1) {
        existingBook.quantity = existingBook.quantity - 1;
        state.total -= action.payload.price;
      } else {
        toast.error(
          "You cannot remove more because this quantity is less than 0"
        );
      }

      // Update localStorage with the new cart data
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, removeOneBook } = cartSlice.actions;

export default cartSlice.reducer;

