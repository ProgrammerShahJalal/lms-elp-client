'use client'
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useGetMyAllOrdersDetailsQuery } from "@/redux/api/orderApi"


const UserOrder = () => {

  const {data, isLoading, isError} = useGetMyAllOrdersDetailsQuery();
  // console.log(data, 'form user order');
  const bookOrdersData = data?.orders;

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader/>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error/>;
  }

  if (!isLoading && !isError && bookOrdersData?.length === 0) {
    content = (
      <>
        {" "}
        <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
      <h5>Your Order is Empty Now</h5>
    </div>
      </>
    );
  }

  if (!isLoading && !isError && bookOrdersData?.length > 0) {
    content = bookOrdersData?.map((item)=> <tr key={item?.id} className="hover">
    <th>প্রাইমারী </th>
    <td>{item?.total_price
}</td>
    <td>{item?.createdAt}</td>
    <td>৪ ফেব্রুয়ারি ২০২৪</td>
    <td>{item?.trx_id
}</td>
    <td>paid</td>
  </tr>);
  }

  return (
    <>
   <div className="grid grid-cols-1 gap-2">
   {/* {bookOrdersData?.map((item)=><div key={item?.id}>
      <div>
        <p>{JSON.parse(item?.orders)}</p>
      </div>
    </div>)} */}

   </div>
    <div className="border">
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>বইয়ের নাম </th>
        <th>বইয়ের  মূল্য</th>
        <th>কেনার তারিখ</th>
        <th>পরিমান</th>
        <th>ট্রান্সজেকশন আইডি</th>
        <th>পেমেন্ট</th>
      </tr>
    </thead>
    <tbody>

      {content}
      
      {/* <tr className="hover">
        <th>প্রাইমারী কোর্স </th>
        <td>২০০০</td>
        <td>৪ ডিসেম্বর ২০২৩</td>
        <td>৪ ফেব্রুয়ারি ২০২৪</td>
        <td>Accepted</td>
        <td>paid</td>
      </tr> */}
     
     
      
    </tbody>
  </table>
</div>

    </div>
    </>
  )
}

export default UserOrder
