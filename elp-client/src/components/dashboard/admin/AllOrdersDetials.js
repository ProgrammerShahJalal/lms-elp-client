import React from 'react';

import AllOrderBookDetails from './AllOrderBookDetails';

const AllOrdersDetials = ({item}) => {
    const dateObject = new Date(item?.createdAt);
  const humanReadableFormatLocal = dateObject.toLocaleDateString();
    return (
        <tr className="hover border">
      <th>
        <AllOrderBookDetails key={item?.id} bookOrder={item} />{" "} 
      </th>
      <td>৳ {" "}{item?.total_price}</td>
      <td>{humanReadableFormatLocal}</td>
      <td>{item?.trx_id}</td>
      <td>pending</td>
      <td>paid</td>
    </tr>
    );
};

export default AllOrdersDetials;