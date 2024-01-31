
const SeeDynamicQuiz = ({ quiz, i, setOpenModal }) => {
    return (
        <div className="modal-box">
            <tr>
                <th className="py-2  border-b">Questions</th>
                <th className="py-2  border-b">Options</th>
                <th className="py-2  border-b">Ans</th>
            </tr>
            <tr>
                <td className="py-2 px-4 border-b">
                    {i + 1}) {quiz?.question}
                </td>
                <td className="py-2 px-4 border-b">
                    {quiz?.options?.map((option, index) => (
                        <div key={index}>
                            {Object.keys(option)[0]}: {Object.values(option)[0]}
                        </div>
                    ))}
                </td>

                <td className="py-2 px-4 border-b">{quiz?.correct_answer}</td>
            </tr>
            <button onClick={() => { setOpenModal(false) }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </div>
    );
};

export default SeeDynamicQuiz;