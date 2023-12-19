"use client";
import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Commonbanner from "@/components/banners/Commonbanner";
import { useGetAllBooksQuery } from "@/redux/api/booksApi";
import { addToCart, removeFromCart, removeOneBook } from "@/redux/features/cart/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { books, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();


  // const { data, isError, isLoading } = useGetAllBooksQuery();

  // const booksData = data?.books?.data;

  // let content = null;

  // if (isLoading) {
  //   content = (
  //     <>
  //       <InitialLoader/>
  //     </>
  //   );
  // }

  // if (!isLoading && isError) {
  //   content = <Error/>;
  // }

  // if (!isLoading && !isError && booksData?.length === 0) {
  //   content = (
  //     <>
  //       {" "}
  //      <EmptyContent/>
  //     </>
  //   );
  // }

  // if (!isLoading && !isError && booksData?.length > 0) {
  //   content = booksData?.map((item) => <BookSectionCard key={item?._id} item={item} />);
  // }
  // console.log(books)
  const breadcrumbItems = [
    { label: "হোম", link: "/" },
    { label: "অল বুকস্", link: "/books" },
    { label: "বুকস্ Details", link: "/books/:id" },
    { label: "Cart" },
  ];

  return (
    <>
      <Commonbanner title="Cart" breadcrumbItems={breadcrumbItems} />
      <div className="mx-14 py-20">
        <div className="">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-bold text-2xl text-bluePrimary">Your Cart</h2>
            <h2 className="font-bold text-xl"> {books?.length}</h2>
          </div>
          <div className="bg-white px-4 py-5 border rounded shadow-md">
            <div className="grid lg:grid-cols-4 gap-10">
              {books?.map((item)=><>
                <div className="">
                <h2 className="font-bold text-xl text-gray-400 py-4">Product Details</h2>

                <div className="flex  items-center">
                  <div className="pr-7">
                    <Image
                      className="rounded"
                      src="https://i.ibb.co/G9hnB13/course-1.webp"
                      alt="course"
                      width={100}
                      height={50}
                    />
                  </div>
                  
                    <div className="" >
                    <h2>{item?.name} </h2>
                      <button className="text-red-500 font-bold" onClick={()=> dispatch(removeFromCart(item))}>Remove</button>
                    </div>
                 
                </div>
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-400 py-4">Quantity</h2>
                <div className="flex items-center space-x-3 font-semibold">
                  <button className="border px-2" onClick={() => dispatch(addToCart(item))}>+</button>
                  <h5>{item?.quantity}</h5>
                  <button className="border px-2" onClick={()=> dispatch(removeOneBook(item))}> -</button>
                </div>
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-400 py-4">Per Price</h2>
                <div className="flex items-center space-x-3 font-semibold" >
                  <h5>{item?.price}  TK</h5>
                </div>
              </div>


              <div>
                <h2 className="font-bold text-xl text-gray-400 py-4">Total Price</h2>
                <div className="flex items-center space-x-3 font-semibold">
                  <h5>{(item?.quantity) * (item?.price)}  TK</h5>
                </div>
              </div>


              
              </>)}
            </div>

            <hr className="my-5" />
            <div className="flex justify-between items-center ">
              <h2 className="font-bold text-xl text-bluePrimary">Order Summary</h2>
              <div>
                <h2 className="font-bold text-xl text-gray-400">Total </h2>
                <h2 className="font-bold text-xl text-bluePrimary">{total.toFixed(2)}</h2>
              </div>
            </div>
            <div></div>
          </div>

          <div className="">
            <div className="flex justify-between pt-5">
              <Link
                href="/checkout"
                className="text-bluePrimary  py-2 px-4 transition-all duration-300 rounded hover:text-red-500 font-bold"
              >
                Continue Shopping
              </Link>
              <Link
                href="/checkout"
                className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary"
              >
                Process to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
