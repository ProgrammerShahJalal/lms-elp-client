"use client";

import { useGivePermissionMutation, usePermissionCheckQuery, useRemovePermissionMutation } from "@/redux/api/usersApi";
import toast from "react-hot-toast";

const AdminPermission = ({userId, permission }) => {
    const [givePermission] =  useGivePermissionMutation();
    const [removePermission] =  useRemovePermissionMutation();
    const { data: hasPermission, refetch } = usePermissionCheckQuery({
        userId, 
        permission,  
      });

   
    

    const handlesPermission = async() => {
        // console.log("click")
     if(hasPermission){
           const result = await removePermission({user_id:userId, permission });
          //  console.log(result, 'removw permis')
           toast.success("permission remove")

     }
     else{
        const  result = await givePermission({user_id:userId, permission });
        // console.log(result, 'give permis')
        toast.success("permission given")
     }
     refetch()

    }
  return (
    <button onClick={handlesPermission} className={`px-2 ${hasPermission? "bg-green-500": "bg-red-500"} mb-2 mx-2 border  text-white py-1 hover:bg-green-500 rounded` }>
      {permission}
    </button>
  );
};

export default AdminPermission;
