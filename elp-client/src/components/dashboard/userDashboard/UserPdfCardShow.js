'use client'

import { useGetSingleBookQuery } from "@/redux/api/booksApi";

const UserPdfCardShow = ({ bookId, order }) => {
    const { data } = useGetSingleBookQuery(bookId)
    console.log(data, 'from bookid')
    // console.log(order);
    return (
        <div>
            {/* {data?.title ? data?.title :"বইটি নাই"} */}
        </div>
    );
};

export default UserPdfCardShow;