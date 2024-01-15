

const AllBuyingCourseDetails = ({item}) => {
    const dateObject = new Date(item?.createdAt);
    const humanReadableFormatLocal = dateObject.toLocaleDateString();
    // console.log(item)
    return (
        <tr className="hover border">
        <th>
        {" "}{item?.subscription_id
?.name}
        </th>
        <td>{item?.subscription_id
?.subscription_duration_in_months
} Months</td>
        <td>{item?.course_id?.title}</td>
        <td>{item?.course_id?.sub_category_id?.category_id?.title ?item?.course_id?.sub_category_id?.category_id?.title :"not found"}</td>
        <td> <span
                className={`bg-blue-200 font-bold px-2 py-1 rounded ${
                  item?.course_id?.membership_type === "1" ? "text-paid" : "text-free"
                }`}
              >
                {item?.course_id?.membership_type === "1" ? "Paid" : "Free"}
              </span></td>
        <td>৳ {" "}{item?.amount}</td>
        <td>{humanReadableFormatLocal}</td>
       
       
        <td>paid</td>
      </tr>
    );
};

export default AllBuyingCourseDetails;