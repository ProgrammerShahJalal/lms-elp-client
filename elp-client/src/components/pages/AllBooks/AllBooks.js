'use client'

import Commonbanner from "@/components/banners/Commonbanner";
import BookSectionCard from "@/components/ui/Home/course/BookSectionCard";
import { useGetAllBooksQuery } from "@/redux/api/booksApi";

const AllBooks = () => {

    const { data, isError, isLoading } = useGetAllBooksQuery();

    const booksData = data?.books?.data;
  
  
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


    const breadcrumbItems = [
        { label: 'হোম', link: '/' },
        { label: 'Books' },
      ];
  return (
    <div>
       <Commonbanner title="All Books" breadcrumbItems={breadcrumbItems}/>
       <div className="px-14 py-10">
        <div className="">
          <h2 className="text-2xl font-bold  rounded text-center py-10"> সব বই</h2>
        </div>
        <div className="grid lg:grid-cols-3  gap-4">
          {content}
        </div>
      </div>

    </div>
  )
}

export default AllBooks