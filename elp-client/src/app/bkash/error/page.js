"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Error() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  Cookies.remove("creationPayload");

  return (
    <div className="h-screen flex  flex-col justify-center items-center">
      <div className="flex justify-center flex-col items-center border w-fit p-12 bg-red-200">
        <h3>Payment not completed. Error paying!</h3>
        <p>{message}</p>
      </div>
      <Link
        className="mt-8 bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary"
        href="/"
      >
        Go to home
      </Link>
    </div>
  );
}

export default Error;
