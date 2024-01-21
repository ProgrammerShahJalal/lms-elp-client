import React from 'react';
import { CiMenuKebab } from "react-icons/ci";
import AllOrderBookDetails from './AllOrderBookDetails';

const AllOrdersDetials = ({ item }) => {
  const dateObject = new Date(item?.createdAt);
  const humanReadableFormatLocal = dateObject.toLocaleDateString();
  console.log(item);

  return (
    <tr className="hover border">
      <th>{item?.user_id?.name}</th>
      <th>
        <AllOrderBookDetails key={item?.id} bookOrder={item} />{" "}
      </th>
      <td>৳ {" "}{item?.total_price}</td>
      <td>{humanReadableFormatLocal}</td>
      <td>{item?.trx_id}</td>
      <td>pending</td>
      <td className='text-left'><CiMenuKebab /></td>
      <td>paid</td>
    </tr>
  );
};

export default AllOrdersDetials;