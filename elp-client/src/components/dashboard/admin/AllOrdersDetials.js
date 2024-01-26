import React from 'react';

import AllOrderBookDetails from './AllOrderBookDetails';
import SingleOrderStatus from './SingleOrderStatus';


const AllOrdersDetials = ({item}) => {
    const dateObject = new Date(item?.createdAt);
  const humanReadableFormatLocal = dateObject.toLocaleDateString();

  console.log(item)
    return (
        <tr className="hover border">
          <th>{item?.user_id?.name}</th>
      <th className='border'>
        <AllOrderBookDetails key={item?.id} bookOrder={item} />{" "} 
      </th>
      <td className='border'>৳ {" "}{item?.total_price}</td>
      <td className='border'>{humanReadableFormatLocal}</td>
      <td className='border'>{item?.trx_id}</td>
      <td className='border'>
  <div className='w-36'>
    {item?.shipping_address && (
      <>
        <strong>নাম:</strong> {item?.shipping_address && JSON.parse(item?.shipping_address)?.billing_name || 'N/A'} <br />
        <strong>যোগাযোগ:</strong> {item?.shipping_address && JSON.parse(item?.shipping_address)?.contact_no || 'N/A'} <br />
        <strong>ঠিকানা:</strong> {item?.shipping_address && JSON.parse(item?.shipping_address) ? 
          `${JSON.parse(item?.shipping_address)?.address || 'N/A'}, ${JSON.parse(item?.shipping_address)?.upazilla || 'N/A'}, ${JSON.parse(item?.shipping_address)?.district || 'N/A'}, ${JSON.parse(item?.shipping_address)?.division || 'N/A'}`
          : 'N/A'} <br />
        <strong>ঢাকার বাইরে:</strong> {item?.shipping_address && JSON.parse(item?.shipping_address)?.outside_dhaka ? 'Yes' : 'No'}
      </>
    )}
  </div>
</td>

      <td className='border'><SingleOrderStatus  orderDetailsId={item?.id}/></td>
    </tr>
    );
};

export default AllOrdersDetials;