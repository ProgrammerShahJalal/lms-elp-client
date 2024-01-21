'use client'

const UserResult = () => {
    return (
        <div>
        <div className="border">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                 
                  <th>পরিক্ষা্র নাম </th>
    
                  <th>পরিক্ষা্র ধরন</th>
                
                 
                  <th>পরিক্ষা্র মার্ক্স</th> 
                  
                </tr>
              </thead>
              <tbody>
              <tr  className="hover">
        <th>পরিক্ষা্র নাম </th>
        <td>পরিক্ষা্র ধরন</td>
        <td>00</td>
        
      </tr>
  
               
              </tbody>
            </table>
          </div>
        </div>
       
      </div>
    );
};

export default UserResult;