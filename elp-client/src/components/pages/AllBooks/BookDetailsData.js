"use client";

import { useAddToCartMutation } from "@/redux/api/cartApi";
import { isLoggedIn } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

const BookDetailsData = ({ data, isError, isLoading }) => {
  const [addToCart] = useAddToCartMutation();
  const userLoggedIn = isLoggedIn();
  // const dispatch = useDispatch();

  const handleAddBook = async (data) => {
    // if (!userLoggedIn) {
    //   return toast.error("Please signin to buy a book");
    // }

    const res = await addToCart({book_id: data?.item?._id, quantity: 1 });
  
 
    if (res?.data?.quantity && res.data.quantity > 1) {
      toast.success('Book has already been added to your cart. Please check your cart.');
    } else {
      toast.success('Book added to your cart successfully.');
    }
   
    
  }

  console.log(data)
  let content = null;

  if (isLoading) {
    content = (
      <>
        <div>Loading...</div>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <h5>There was an error</h5>;
  }

  if (!isLoading && !isError && data) {
    content = (
      <div className="grid lg:grid-cols-2 gap-5 my-10">
        <div>
          <div className="space-y-4 mb-10">
            
            <Image
              className="rounded h-60"
              src={data?.cover_page}
              alt="course"
              width={600}
              height={50}
            />

            
          </div>

          
        </div>

        <div className="pl-10">
          <div className="bg-white rounded border py-10 px-4 w-96">
          <div className="space-y-4 mb-10">
            <h2 className="text-2xl font-bold">{data?.title}</h2>
            <p>{data?.description}</p>
            <p>Writer:  {data?.writer}</p>
            <p>
              Sub Category:{" "}
              <span className=" text-yellowPrimary">{data?.course_id[0]?.sub_category_id?.category_id?.title}</span>{" "}
              
              <span className=" text-bluePrimary pl-5 font-semibold">
                {" "}
                Category: {data?.course_id[0]?.sub_category_id?.title}  {data?.format}{" "}
              </span>
            </p>
            {/* <p>{data?.pdf_link}</p> */}
            <p>{data?.price} TK</p>
            <button onClick={() => handleAddBook(data)}  className="bg-yellowPrimary text-white py-2 px-10 transition-all duration-300 rounded  hover:bg-bluePrimary ">
              এড টু কার্ড
            </button>
            
          </div>
          </div>
        </div>


      </div>
    );
  }

  return (
    <>{content}</>
  );
};

export default BookDetailsData;
