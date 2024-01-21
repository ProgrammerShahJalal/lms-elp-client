import Link from 'next/link';
import React from 'react';

const SinglePaymentDetails = ({item}) => {
    const dateObject = new Date(item?.createdAt);
  const localData = dateObject.toLocaleDateString();
  console.log(item)
    return (
        <tr  className="hover">
        <th>{item?.exam_id?.course_id?.title} </th>
        <td>{item?.exam_id?.title}</td>
        <td>{item?.exam_id?.fee}</td>
        <td>{item?.exam_id?.exam_type === "0" ? 'Quiz' : 'Questions'}</td>
        <td>{localData}</td>
        <td>{item?.trx_id}</td>
        <td>paid</td>
        <td>
        <Link href={`/user/myexams/details/${item?.exam_id?.id}`}className="text-red-500 font-bold">পরিক্ষা দিন</Link>
        </td>
      </tr>
    );
};

export default SinglePaymentDetails;