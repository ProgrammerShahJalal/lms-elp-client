
const UserResult = ({ item }) => {

  return (
    <tr>
      <td>{item?.exam_id ? item.exam_id.title : 'N/A'}</td>
      <td>{item?.exam_id?.exam_type === "0" ? 'Quiz' : 'Questions'}</td>
      <td>{item?.total_marks}</td>
      <td>{item?.total_correct_answer}</td>
    </tr>
    // <div>
    //   <div className="border">
    //     <div className="overflow-x-auto">
    //       <table className="table">
    //         {/* head */}
    //         <thead>
    //           <tr>

    //             <th>পরিক্ষা্র নাম </th>
    //             <th>পরিক্ষা্র ধরন</th>
    //             <th>পরিক্ষা্র মার্ক্স</th>
    //             <th>আপনার মার্ক্স</th>

    //           </tr>
    //         </thead>
    //         <tbody>
    //           {allExamData?.map((item, index) => (

    //             <tr key={index} className="hover">

    //             </tr>
    //           ))
    //           }


    //         </tbody>
    //       </table>
    //     </div>
    //   </div>

    // </div>
  );
};

export default UserResult;