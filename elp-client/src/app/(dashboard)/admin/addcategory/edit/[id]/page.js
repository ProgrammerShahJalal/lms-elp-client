import EditCategory from "@/components/dashboard/admin/EditCategory";


const EditCategoryPage = ({params}) => {
    const {id} = params;
    return (
        <div>
            <EditCategory id={id}/>
        </div>
    );
};

export default EditCategoryPage;