import AllOrderBookDetails from "../admin/AllOrderBookDetails";
import BookSingleOrders from "./BookSingleOrders";

const SingleOrderDetails = ({ item }) => {
  const dateObject = new Date(item?.createdAt);
  const humanReadableFormatLocal = dateObject.toLocaleDateString();
  
  // console.log(item)
  // const data = JSON.parse(item?.shipping_address
  //   );
  //   console.log(data)

  return (
    <tr className="hover border">
      <th>
        <BookSingleOrders key={item?.id} bookOrder={item} />{" "}
      </th>
      <td>৳  {" "}{item?.total_price}</td>
      <td>{humanReadableFormatLocal}</td>
      <td>{item?.trx_id}</td>
      <td>pending</td>
      <td>paid</td>
    </tr>
  );
};

export default SingleOrderDetails;
