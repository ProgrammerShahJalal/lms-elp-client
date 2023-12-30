import EditExam from "@/components/dashboard/admin/EditExam";


const ExamEditPage = ({params}) => {
    const {id} = params;
    
    return (
        <div>
            <EditExam id={id}/>
        </div>
    );
};

export default ExamEditPage;