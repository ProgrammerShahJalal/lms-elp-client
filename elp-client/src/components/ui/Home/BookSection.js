"use client";
import Link from "next/link";
import BookSectionCard from "./course/BookSectionCard";
import { useGetAllBooksQuery } from "@/redux/api/booksApi";
import InitialLoader from "@/components/Loader/InitialLoader";
import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";

const BookSection = () => {
  const { data, isError, isLoading } = useGetAllBooksQuery();

  const booksData = data?.books?.data;


  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader/>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error/>;
  }

  if (!isLoading && !isError && booksData?.length === 0) {
    content = (
      <>
        {" "}
       <EmptyContent/>
      </>
    );
  }

  if (!isLoading && !isError && booksData?.length > 0) {
    content = booksData?.map((item) => <BookSectionCard key={item?._id} item={item} />);
  }
  return (
    <div className="px-14 py-20">
      <div className="flex gap-5 py-5">
        <h2 className="text-2xl font-bold px-2  rounded ">আমাদের সকল বইসমূহ</h2>
        <Link href="/books" className="mb-5 bg-bluePrimary hover:bg-cyanPrimary w-44 text-white px-7 py-3 rounded transition-all duration-500 delay-200">
          সব বই দেখুন
        </Link>
      </div>
      <div className="grid lg:grid-cols-3  gap-4">{content}</div>
      <div>
        hellp
      </div>
    </div>
  );
};

export default BookSection;
