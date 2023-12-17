"use client";
import Link from "next/link";
import BookSectionCard from "./course/BookSectionCard";
import { useGetAllBooksQuery } from "@/redux/api/booksApi";

const BookSection = () => {
  const { data, isError, isLoading } = useGetAllBooksQuery();

  const booksData = data?.books?.data;


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

  if (!isLoading && !isError && booksData?.length === 0) {
    content = (
      <>
        {" "}
        <p>There is no data</p>
      </>
    );
  }

  if (!isLoading && !isError && booksData?.length > 0) {
    content = booksData?.map((item) => <BookSectionCard key={item?._id} item={item} />);
  }
  return (
    <div className="px-14 py-10">
      <div className="flex gap-5">
        <h2 className="text-2xl font-bold px-2  rounded">আমাদের সকল বইসমূহ</h2>
        <Link href="/books" className="mb-5 bg-cyanPrimary w-44 text-white px-7 py-3 rounded">
          সব বই দেখুন
        </Link>
      </div>
      <div className="grid lg:grid-cols-3  gap-4">{content}</div>
    </div>
  );
};

export default BookSection;
