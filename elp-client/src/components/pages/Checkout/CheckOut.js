"use client";

import Commonbanner from "@/components/banners/Commonbanner";
import CheckoutCart from "./CheckoutCart";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { useForm } from "react-hook-form";
import { useGetAllCartsByUserQuery } from "@/redux/api/cartApi";
import Cookies from "js-cookie";
import { useGetShipppingChargeInsideDhakaQuery } from "@/redux/api/settingsApi";
import { useGetShipppingChargeOutsideDhakaQuery } from "@/redux/api/settingsApi";
import Loading from "@/app/loading";
import axios from "axios";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storage";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const CheckOut = () => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const user_id = getUserInfo()?.userId;
  const {
    data: user,
    refetch,
    isLoading: userLoading,
  } = useGetSingleUserQuery(user_id);
  const {
    data: shippingChargeInsideDhaka,
    isLoading: shippingInsideDhakaLoading,
  } = useGetShipppingChargeInsideDhakaQuery();
  const {
    data: shippingChargeOutsideDhaka,
    isLoading: shippingOutsideDhakaLoading,
  } = useGetShipppingChargeOutsideDhakaQuery();
  const { data: carts, isLoading: cartLoading } = useGetAllCartsByUserQuery();
  const cartData = carts?.carts;

  const { books, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isDefault, setIsDefault] = useState(false);
  const [selectedOutsideDhaka, setSelectedOutsideDhaka] = useState(true);
  const [shippingCharge, setShippingCharge] = useState(100);
  // const [total, setTotal] = useState(0);

  const handleDefaultChange = () => {
    setIsDefault(!isDefault);
  };

  // set shipping charge based on hard copy book ordered, and inside or outside dhaka
  // useEffect(() => {
  //   // if there is any hard copy book ordered
  //   const hardCopyBooks = cartData?.find(
  //     (cart) => cart?.book_id?.format === "hard copy"
  //   );
  //   if (!!hardCopyBooks) {
  //     if (selectedOutsideDhaka) {
  //       setShippingCharge(shippingChargeOutsideDhaka);
  //     } else {
  //       setShippingCharge(shippingChargeInsideDhaka);
  //     }
  //   } else {
  //     setShippingCharge(0);
  //   }

  //   // calculating total price
  //   if (cartData) {
  //     const newTotal = cartData.reduce(
  //       (acc, item) => acc + item.quantity * item.book_id.price,
  //       0
  //     );
  //     setTotal(newTotal);
  //   }
  // }, [
  //   cartData,
  //   shippingChargeInsideDhaka,
  //   shippingChargeOutsideDhaka,
  //   selectedOutsideDhaka,
  // ]);

  useEffect(() => {
    refetch();
  }, [user]);

  const breadcrumbItems = [
    { label: "হোম", link: "/" },
    { label: "কার্ট", link: "/cart" },
    { label: "চেকআউট" },
  ];

  const handleFormSubmit = async (data) => {

    if (!userLoggedIn) {
          return toast.error("Please signin to buy a book");
      }
    Cookies.set("order_type", shippingCharge ? "hard copy" : "pdf");
    if (shippingCharge) {
      Cookies.set(
        "creationPayload",
        JSON.stringify({ ...data, is_default: isDefault })
      );
    }

    const { data: payment } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/bkash/payment/create`,
      {
        amount: `${Number(shippingCharge) + Number(total)}`,
      },
      {
        withCredentials: true,
        headers: { Authorization: getFromLocalStorage(authKey) },
      }
    );
    router.push(payment?.data);
  };

  if (
    userLoading ||
    cartLoading ||
    shippingInsideDhakaLoading ||
    shippingOutsideDhakaLoading
  ) {
    return <Loading />;
  } else {
    return (
      <div>
        <Commonbanner title="চেকআউট" breadcrumbItems={breadcrumbItems} />
        <form onSubmit={handleSubmit(handleFormSubmit)} className="mx-14">
          <div className="grid lg:grid-cols-2 gap-5 py-20">
            <div>
              <h2 className="font-semibold text-yellowPrimary pb-5 text-xl">
                Shipping Address
              </h2>
              <div className="bg-white border rounded">
                <div className="max-w-md mx-auto mt-8">
                  <div className="col-span-2 mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Billing Name
                    </label>
                    <input
                      {...register("billing_name", {
                        required: "Billing Name is required",
                      })}
                      className="mt-1 p-2 w-full border"
                      defaultValue={user ? user?.name : ""}
                    />
                    {errors.billing_name && (
                      <p className="text-red-500 text-sm">
                        {errors.billing_name.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Division
                      </label>
                      <input
                        {...register("division", {
                          required: "Division is required",
                        })}
                        className="mt-1 p-2 w-full border"
                      />
                      {errors.division && (
                        <p className="text-red-500 text-sm">
                          {errors.division.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        District
                      </label>
                      <input
                        {...register("district", {
                          required: "District is required",
                        })}
                        className="mt-1 p-2 w-full border"
                      />
                      {errors.district && (
                        <p className="text-red-500 text-sm">
                          {errors.district.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Upazilla
                      </label>
                      <input
                        {...register("upazilla", {
                          required: "Upazilla is required",
                        })}
                        className="mt-1 p-2 w-full border"
                      />
                      {errors.upazilla && (
                        <p className="text-red-500 text-sm">
                          {errors.upazilla.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Outside Dhaka
                      </label>
                      <select
                        {...register("outside_dhaka", {
                          required: "Please select Outside Dhaka",
                        })}
                        className="mt-1 p-2 w-full border"
                        defaultValue={true}
                        onChange={(e) =>
                          setSelectedOutsideDhaka(e.target.value === "true")
                        }
                      >
                        <option value="">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                      {errors.outside_dhaka && (
                        <p className="text-red-500 text-sm">
                          {errors.outside_dhaka.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <textarea
                        {...register("address", {
                          required: "Address is required",
                        })}
                        className="mt-1 p-2 w-full border"
                        defaultValue={user?.address ? user?.address : ""}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm">
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Contact Number
                      </label>
                      <input
                        {...register("contact_no", {
                          required: "Contact Number is required",
                          pattern: {
                            value: /^\d{11}$/,
                            message: "Invalid contact number",
                          },
                        })}
                        className="mt-1 p-2 w-full border"
                        defaultValue={user?.contact_no}
                      />
                      {errors.contact_no && (
                        <p className="text-red-500 text-sm">
                          {errors.contact_no.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2 mb-8">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          onChange={handleDefaultChange}
                          checked={isDefault}
                          className="mr-2"
                        />
                        Set as default address
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-yellowPrimary pb-5 text-xl">
                Products
              </h2>
              <CheckoutCart shippingCharge={shippingCharge} total={total} />
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
              <button
                type="submit"
                className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary  flex items-center"
              >
                Place Order
                <span className="font-bold pl-3">
                  <FaArrowRightLong />
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default CheckOut;
