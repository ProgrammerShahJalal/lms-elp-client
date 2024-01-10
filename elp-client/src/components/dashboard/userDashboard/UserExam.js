import { useGetMyQuestionsEnrollHistoryQuery } from "@/redux/api/questionsApi";


const UserExam = ({exam_id}) => {
    const {data} = useGetMyQuestionsEnrollHistoryQuery(exam_id);
    
    return (
        <div>
            
        </div>
    );
};

export default UserExam;