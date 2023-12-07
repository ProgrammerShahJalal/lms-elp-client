

const UserOrder = () => {
  return (
    <div className="border">
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>কোর্সের নাম </th>
        <th>কোর্সের  মূল্য</th>
        <th>কেনার তারিখ</th>
        <th>মেয়াদ উত্তীর্ণ তারিখ</th>
        <th>স্ট্যাটাস</th>
        <th>পেমেন্ট</th>
      </tr>
    </thead>
    <tbody>
      
      <tr className="hover">
        <th>প্রাইমারী কোর্স </th>
        <td>২০০০</td>
        <td>৪ ডিসেম্বর ২০২৩</td>
        <td>৪ ফেব্রুয়ারি ২০২৪</td>
        <td>Accepted</td>
        <td>paid</td>
      </tr>
      <tr className="hover">
        <th>প্রাইমারী কোর্স </th>
        <td>২০০০</td>
        <td>৪ ডিসেম্বর ২০২৩</td>
        <td>৪ ফেব্রুয়ারি ২০২৪</td>
        <td>Accepted</td>
        <td>paid</td>
      </tr>
      <tr className="hover">
        <th>প্রাইমারী কোর্স </th>
        <td>২০০০</td>
        <td>৪ ডিসেম্বর ২০২৩</td>
        <td>৪ ফেব্রুয়ারি ২০২৪</td>
        <td>Accepted</td>
        <td>paid</td>
      </tr>
      
    </tbody>
  </table>
</div>

    </div>
  )
}

export default UserOrder
