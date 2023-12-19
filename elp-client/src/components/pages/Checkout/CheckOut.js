"use client";

import Commonbanner from "@/components/banners/Commonbanner";
import CheckoutContactInfo from "./CheckoutContactInfo";
import CheckoutCart from "./CheckoutCart";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

const CheckOut = () => {
  const breadcrumbItems = [
    { label: "হোম", link: "/" },
    { label: "কার্ট", link: "/cart" },
    { label: "চেকআউট" },
  ];
  return (
    <div>
      <Commonbanner title="চেকআউট" breadcrumbItems={breadcrumbItems} />
      <div className="mx-14">
        <div className="grid lg:grid-cols-2 gap-5 py-20">
          <div>
          <h2 className="font-semibold text-yellowPrimary pb-5 text-xl">Shipping Address</h2>
            <CheckoutContactInfo />
          </div>
          <div>
          <h2 className="font-semibold text-yellowPrimary pb-5 text-xl">Products</h2>
            <CheckoutCart />
          </div>
        </div>

        <div className="">
            <div className="flex justify-between py-5">
              <Link
                href="/cart"
                className="text-bluePrimary  py-2 px-4 transition-all duration-300 rounded hover:text-red-500 font-bold flex items-center "
              >
                <span className="font-bold pr-3">
                  <FaArrowLeftLong />
                </span>
                Go back to cart
              </Link>
              <Link
                href="/placeOrder"
                className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary  flex items-center"
              >
                Place Order{" "}
                <span className="font-bold pl-3">
                  <FaArrowRightLong />
                </span>
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CheckOut;
