import EditBook from "@/components/dashboard/admin/EditBook";
import { useGetAllBooksQuery } from "@/redux/api/booksApi";

const BookEditPage = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <EditBook id={id} />
    </div>
  );
};

export async function generateStaticParams() {
  const {
    data: allBooks,
    isLoading,
    isError,
  } = useGetAllBooksQuery({
    limit: 10000,
    page: 1,
  });
  return allBooks?.books?.data?.map((data) => ({ id: data?._id }));
}

export default BookEditPage;
