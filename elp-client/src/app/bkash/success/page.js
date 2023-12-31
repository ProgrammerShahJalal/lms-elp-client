"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { usePayForExamMutation } from "@/redux/api/examsApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Success() {
  const searchParams = useSearchParams();
  const [payForExam] = usePayForExamMutation();
  const trx_id = searchParams.get("trx_id");
  const payloadString = Cookies.get("creationPayload");

  useEffect(() => {
    if (payloadString) {
      const payload = JSON.parse(payloadString);
      payload.trx_id = trx_id;
      if (payload.exam_id) {
        payForExam(payload);
        toast("Success!");
        Cookies.remove("creationPayload");
      }
    }
  }, []);

  return (
    <div className="h-screen flex  flex-col justify-center items-center">
      <div className="flex justify-center flex-col items-center border w-fit p-12 bg-green-200">
        <h3>Payment successfull!</h3>
      </div>
      <Link
        className="mt-8 bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary"
        href="/"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default Success;
