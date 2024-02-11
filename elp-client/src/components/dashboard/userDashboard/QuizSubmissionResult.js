// import { useExamResultQuery } from "@/redux/api/resultApi";
const QuizSubmissionResult = ({ examResult }) => {

    // const { data } = useExamResultQuery({ exam_type: 0, exam_id: examId });
    const getAllQuestion = examResult?.exams?.data;
    const mappedData = getAllQuestion?.map(item => ({
        answer: JSON.parse(item.answer)
    }));
    console.log(mappedData, 'this is examresult');

    return (
        <div>
            <h1 className="text-xl font-semibold">Your Submission Result</h1>
            {mappedData?.map((item, index) => (
                <div key={index} className="my-4 p-4 bg-gray-100 rounded-lg">
                    {item?.answer?.map((answer, answerIndex) => (
                        <div key={answerIndex} className="mb-4">
                            <div className="font-bold">{`Question ${answerIndex + 1}: ${answer?.question}`}</div>
                            <ul className="grid grid-cols-1 gap-4">
                                {answer?.options?.map((option, optionIndex) => {
                                    const isChecked = Object.values(answer?.answer).includes(option);
                                    return (
                                        <li key={optionIndex}>
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name={`question${answerIndex}`}
                                                    value={option}
                                                    checked={isChecked}
                                                />
                                                <span>{option}</span>
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default QuizSubmissionResult;

