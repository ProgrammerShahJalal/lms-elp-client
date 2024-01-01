"use client";

import Image from "next/image";
import Link from "next/link";

const BookDetailsData = ({ data, isError, isLoading }) => {
  console.log(data)
  let content = null;

  if (isLoading) {
    content = (
      <>
        <div>Loading.......</div>
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
              className="rounded"
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
            <p>
              Sub Category:{" "}
              <span className=" text-yellowPrimary">{data?.writer}</span>{" "}
              <span className=" text-bluePrimary pl-5 font-semibold">
                {" "}
                Category: {data?.format}{" "}
              </span>
            </p>
            {/* <p>{data?.pdf_link}</p> */}
            <p>{data?.price} TK</p>
            
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
