"use client";
import Commonbanner from "@/components/banners/Commonbanner";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
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
            <h2 className="font-bold text-xl">3 Items</h2>
          </div>
          <div className="bg-white px-4 py-5 border rounded shadow-md">


            <div className="grid lg:grid-cols-4 gap-10">
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
                  <div className="">
                    <h2>Product Name</h2>
                    <button className="text-red-500 font-bold">Remove</button>
                  </div>
                </div>
              </div>
             <div>
             <h2 className="font-bold text-xl text-gray-400 py-4">Quantity</h2>
             <div className="flex items-center space-x-3 font-semibold">
                <button className="border px-2">+</button>
                <h5>5</h5>
                <button className="border px-2"> -</button>
              </div>
             </div>
             <div>
             <h2 className="font-bold text-xl text-gray-400 py-4">Per Price</h2>
             <div className="flex items-center space-x-3 font-semibold">
                
                <h5>500 TK</h5>
                
              </div>
             </div>
             <div>
             <h2 className="font-bold text-xl text-gray-400 py-4">Total Price</h2>
             <div className="flex items-center space-x-3 font-semibold">
                
                <h5>500 TK</h5>
               
              </div>
             </div>
              
            </div>



            <hr  className="my-5"/>
            <div className="flex justify-between items-center ">
            <h2 className="font-bold text-xl text-bluePrimary">Order Summary</h2>
              <div>
              <h2 className="font-bold text-xl text-gray-400">Total </h2>
              <h2 className="font-bold text-xl text-bluePrimary">3000 BDT</h2>
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
