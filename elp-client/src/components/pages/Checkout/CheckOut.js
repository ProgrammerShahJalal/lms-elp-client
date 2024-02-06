"use client";

import Commonbanner from "@/components/banners/Commonbanner";
import CheckoutCart from "./CheckoutCart";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import bkashImg from "@/assets/images/Bkash logo.png";
import nagadImg from "@/assets/images/Nagad-Logo.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Loading from "@/app/loading";
import axios from "axios";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storage";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useGetShipppingChargeInsideDhakaQuery,
  useGetShipppingChargeOutsideDhakaQuery,
} from "@/redux/api/settingsApi";
import { useGetMyShippingAddressQuery } from "@/redux/api/usersApi";

const CheckOut = () => {
  // declaring states
  const [modalOpen, setModalOpen] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [selectedOutsideDhaka, setSelectedOutsideDhaka] = useState(true);
  const [shippingCharge, setShippingCharge] = useState(100);
  const [paymentMethod, setPaymentMethod] = useState(null);

  // hooks and misc
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const user_id = getUserInfo()?.userId;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // data fetch
  const {
    data: user,
    refetch,
    isLoading: userLoading,
  } = useGetSingleUserQuery(user_id);
  const { data: shippingAddress, refetch: refetchShippingAddress } =
    useGetMyShippingAddressQuery();
  const {
    data: shippingChargeInsideDhaka,
    isLoading: shippingInsideDhakaLoading,
  } = useGetShipppingChargeInsideDhakaQuery();
  const {
    data: shippingChargeOutsideDhaka,
    isLoading: shippingOutsideDhakaLoading,
  } = useGetShipppingChargeOutsideDhakaQuery();

  // redux
  const { books, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // effects
  useEffect(() => {
    if (books?.length) {
      const isThereHardCopyBook = books.some(
        (book) => book.format === "hard copy"
      );
      if (isThereHardCopyBook) {
        setShippingCharge(
          selectedOutsideDhaka
            ? shippingChargeOutsideDhaka
            : shippingChargeInsideDhaka
        );
      } else {
        setShippingCharge(0);
      }
    }
  }, [
    books,
    selectedOutsideDhaka,
    shippingChargeInsideDhaka,
    shippingInsideDhakaLoading,
    shippingChargeOutsideDhaka,
    shippingChargeOutsideDhaka,
  ]);

  useEffect(() => {
    refetch();
    refetchShippingAddress();
  }, [user]);

  useEffect(() => {
    if (paymentMethod) {
      handleFormSubmit();
    }
  }, [paymentMethod]);

  useEffect(() => {
    if (shippingAddress) {
      setValue("billing_name", shippingAddress.billing_name);
      setValue("division", shippingAddress.division);
      setValue("district", shippingAddress.district);
      setValue("upazilla", shippingAddress.upazilla);
      setValue("outside_dhaka", String(shippingAddress.outside_dhaka));
      setValue("address", shippingAddress.address);
      setValue("contact_no", shippingAddress.contact_no);
    }
  }, [shippingAddress]);

  // constants
  const breadcrumbItems = [
    { label: "হোম", link: "/" },
    { label: "কার্ট", link: "/cart" },
    { label: "চেকআউট" },
  ];

  // handle change
  const handleDefaultChange = () => {
    setIsDefault(!isDefault);
  };

  // handle form submit/payment/order create
  const handleFormSubmit = async (data) => {
    /*
    Cookies.set("order_type", shippingCharge ? "hard copy" : "pdf");
    if (shippingCharge) {
      Cookies.set(
        "creationPayload",
        JSON.stringify({ ...data, is_default: isDefault, paymentMethod })
      );
    }
    if (!userLoggedIn) {
      return toast.error("Please signin to buy a book");
    }

    if (paymentMethod === "bkash") {
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
    } else if (paymentMethod === "nagad") {
      const { data: payment } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/nagad/payment/create`,
        {
          amount: `${Number(shippingCharge) + Number(total)}`,
        }
      );
      router.push(payment?.data);
    }*/
  };

  if (userLoading) {
    return <Loading />;
  } else {
    return (
      <div>
        <Commonbanner title="চেকআউট" breadcrumbItems={breadcrumbItems} />
        <form className="mx-14" onSubmit={handleSubmit(handleFormSubmit)}>
          <div
            className={`grid lg:grid-cols-2 auto-cols-auto gap-5 py-20 justify-center`}
          >
            <div>
              {shippingCharge ? (
                <div>
                  <h2 className="font-semibold text-yellowPrimary pb-5 text-xl">
                    Shipping Address
                  </h2>
                  <div className="bg-white border rounded">
                    <div className="max-w-md mx-auto mt-8">
                      <div className="col-span-2 mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          বিলের নাম
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
                            বিভাগ
                          </label>
                          <input
                            {...register("division", {
                              required: "Division is required",
                            })}
                            className="mt-1 p-2 w-full border"
                            defaultValue={
                              shippingAddress ? shippingAddress?.division : ""
                            }
                          />
                          {errors.division && (
                            <p className="text-red-500 text-sm">
                              {errors.division.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            জেলা
                          </label>
                          <input
                            {...register("district", {
                              required: "District is required",
                            })}
                            className="mt-1 p-2 w-full border"
                            defaultValue={
                              shippingAddress ? shippingAddress?.district : ""
                            }
                          />
                          {errors.district && (
                            <p className="text-red-500 text-sm">
                              {errors.district.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            উপজেলা
                          </label>
                          <input
                            {...register("upazilla", {
                              required: "Upazilla is required",
                            })}
                            className="mt-1 p-2 w-full border"
                            defaultValue={
                              shippingAddress ? shippingAddress?.upazilla : ""
                            }
                          />
                          {errors.upazilla && (
                            <p className="text-red-500 text-sm">
                              {errors.upazilla.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            ঢাকার বাইরে?
                          </label>
                          <select
                            {...register("outside_dhaka", {
                              required: "Please select Outside Dhaka",
                            })}
                            className="mt-1 p-2 w-full border"
                            defaultValue={
                              shippingAddress
                                ? shippingAddress?.outside_dhaka
                                : true
                            }
                            onChange={(e) =>
                              setSelectedOutsideDhaka(e.target.value === "true")
                            }
                          >
                            <option value="">Select</option>
                            <option value="true">হ্যা</option>
                            <option value="false">না</option>
                          </select>
                          {errors.outside_dhaka && (
                            <p className="text-red-500 text-sm">
                              {errors.outside_dhaka.message}
                            </p>
                          )}
                        </div>

                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700">
                            ঠিকানা
                          </label>
                          <textarea
                            {...register("address", {
                              required: "Address is required",
                            })}
                            className="mt-1 p-2 w-full border"
                            defaultValue={
                              shippingAddress?.address
                                ? shippingAddress?.address
                                : ""
                            }
                          />
                          {errors.address && (
                            <p className="text-red-500 text-sm">
                              {errors.address.message}
                            </p>
                          )}
                        </div>

                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700">
                            যোগাযোগের মোবাইল নম্বর
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
              ) : (
                ""
              )}
            </div>

            <div>
              <h2 className="font-semibold text-yellowPrimary pb-5 text-xl">
                Buying Processing Books
              </h2>
              <CheckoutCart shippingCharge={shippingCharge} total={total} />
            </div>
          </div>
          <div className="">
            <div className="flex justify-between py-5">
              <Link
                href="/cart"
                className="text-bluePrimary py-2 px-4 transition-all duration-300 rounded hover:text-red-500 font-bold flex items-center"
              >
                <span className="font-bold pr-3">
                  <FaArrowLeftLong />
                </span>
                Go back to cart
              </Link>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary  flex items-center"
              >
                Place Order
                <span className="font-bold pl-3">
                  <FaArrowRightLong />
                </span>
              </button>
            </div>
          </div>
          {/* ====================  Payment modal  ==========================================*/}
          <div className="dialog-container w-96 h-72">
            <dialog
              open={modalOpen}
              id={`my_modal`}
              className="modal bg-gray-100 w-96 h-72"
            >
              <div className="flex flex-col justify-center h-full p-4">
                <h2 className="text-center mb-6">পেমেন্ট পদ্ধতি</h2>
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bkash")}
                    className="bg-white rounded h-20 w-32 flex justify-center items-center"
                  >
                    <Image src={bkashImg} alt="Bkash" width={100} height={60} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("nagad")}
                    className="bg-white rounded h-20 w-32 flex justify-center items-center"
                  >
                    <Image src={nagadImg} alt="Nagad" width={100} height={60} />
                  </button>
                </div>
              </div>
              <button
                className="flex justify-center items-center bg-red-400 text-white py-2 px-4 transition-all duration-300 rounded  hover:bg-bluePrimary"
                type="button"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </dialog>
          </div>
        </form>
      </div>
    );
  }
};

export default CheckOut;
