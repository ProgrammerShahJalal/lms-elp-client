import React from 'react';

import AllOrderBookDetails from './AllOrderBookDetails';
import SingleOrderStatus from './SingleOrderStatus';


const AllOrdersDetials = ({item}) => {
    const dateObject = new Date(item?.createdAt);
  const humanReadableFormatLocal = dateObject.toLocaleDateString();


  
    return (
        <tr className="hover border">
          <th>{item?.user_id?.name}</th>
      <th>
        <AllOrderBookDetails key={item?.id} bookOrder={item} />{" "} 
      </th>
      <td>৳ {" "}{item?.total_price}</td>
      <td>{humanReadableFormatLocal}</td>
      <td>{item?.trx_id}</td>
      <td><SingleOrderStatus  orderDetailsId={item?.id}/></td>
      {/* <td>paid</td> */}
    </tr>
    );
};

export default AllOrdersDetials;