'use client'

import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const AllExamDetails = ({ item }) => {
    const isQuiz = item?.exam_id?.exam_type === '0';
    return (
        <tr className="block md:table-row">
            <td className="py-2  px-1 border-b md:table-cell flex">{item?.user_id
                ?.name
            }</td>
            <td className="py-2 px-4 border-b md:table-cell">{item?.exam_id?.course_id?.title}</td>
            {/* <td className="py-2 px-4 border-b md:table-cell">{item?.exam_id?.course_id?.sub_category_id?.category_id?.title ? item?.exam_id?.course_id?.sub_category_id?.category_id?.title :"Not found"}</td> */}
            <td className="py-2 px-4 border-b md:table-cell">{item?.exam_id?.title}</td>
            <td className="py-2 px-4 border-b md:table-cell">{item?.exam_id?.duration_in_minutes
            } মিনিট</td>
            <td className="py-2 px-4 border-b md:table-cell"> {item?.exam_id?.exam_type === "0" ? 'Quiz' : 'Questions'}</td>
            <td className="py-2 px-4 border-b md:table-cell">{item?.exam_id?.fee} টাকা</td>
            <td className="py-2 px-4 border-b md:table-cell">{item?.exam_id?.total_marks}</td>
            <td className="py-2 px-4 border-b md:table-cell text-red-500"></td>
            {
                isQuiz ? (
                    <button>Nothing to do</button>
                ) : (
                    <Link href={`/admin/givemarks/showexam/${item?.id}`} className="py-2 px-4 border-b md:table-cell text-red-500">মার্ক্স দিন</Link >
                )
            }
            {/* <td className="py-2 px-4 border-b md:table-cell text-red-500">{item?.exam_id?.exam_type === "0" ? '5' : <span className="">মার্ক্স দিন</span>}</td> */}

        </tr>
    );
};

export default AllExamDetails;