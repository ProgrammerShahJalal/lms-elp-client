import Image from "next/image"
import { useEffect, useState } from "react";

const UserCourses = () => {
  const [videoData, setVideoData] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/course-playlists');
        const data = await response.json();
        setVideoData(data.data);
        setCurrentVideoIndex(0);
      } catch (error) {
        setError('Error fetching video data');
      } finally {
        setLoading(false);
      }
    };
    fetchVideoData();
  }, []);

  const showPreviousVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? videoData.length - 1 : prevIndex - 1));
  };

  const showNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === videoData.length - 1 ? 0 : prevIndex + 1));
  };

  const selectVideo = (index) => {
    setCurrentVideoIndex(index);
  };


  // from here i show quiz question to the student


  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);



  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/quiz-questions");
        const data = await response.json();
        setQuizQuestions(data.data);
      } catch (error) {
        setError("Error fetching quiz questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizQuestions();
  }, []);
  const handleInputChange = (questionId, option) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    const correctAnswersCount = quizQuestions.reduce((acc, question) => {
      return acc + (userAnswers[question._id] === question.correct_answer ? 1 : 0);
    }, 0);
    setCorrectAnswers(correctAnswersCount);
    setShowResults(true);
  };
  return (
    <div className="bg-white rounded-lg py-5 border border-gray-200">
      <div className="card card-compact w-72 bg-base-100 shadow-xl ml-10">
        <figure><Image src="https://i.ibb.co/G9hnB13/course-1.webp" alt="course" width={300} height={100} /></figure>
        <div className="card-body">
          <h2 className="card-title"> Learning Course</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary"> 60 days left</button>
          </div>
        </div>
      </div>
      {/* this is video playlist */}
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {videoData.length > 0 && (
          <div className="container mx-auto my-8">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 place-items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-4">Video List</h1>
                <div className="bg-white p-4 rounded-md shadow-md">
                  <h2 className="text-lg font-semibold mb-2">{videoData[currentVideoIndex].name}</h2>
                  <video
                    controls
                    className="w-full h-40 md:h-48 lg:h-56 object-cover rounded-md"
                  >
                    <source src={videoData[currentVideoIndex].videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>


                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      onClick={showPreviousVideo}
                      className="bg-orange-500 text-white px-4 py-2 rounded"
                      disabled={currentVideoIndex === 0}
                    >
                      Previous
                    </button>
                    <button
                      onClick={showNextVideo}
                      className="bg-orange-500 text-white px-4 py-2 rounded"
                      disabled={currentVideoIndex === videoData.length - 1}
                    >
                      Next
                    </button>
                  </div>

                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold  mb-4 text-blue-500">All Video Names</h2>
                <ol className="pl-4 border-t border-b border-blue-300">
                  {videoData.map((video, index) => (
                    <li
                      key={video._id}
                      className={`cursor-pointer py-2 px-2 border-b border-blue-300 ${currentVideoIndex === index ? 'bg-blue-300' : ''
                        } text-xl`}
                      onClick={() => selectVideo(index)}
                    >
                      {index + 1}. {video.name}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* from here i show quiz question to the student */}

      <h1 className="text-2xl font-bold mb-4">Quiz Questions</h1>
      {quizQuestions?.length > 0 && (
        <div>
          {quizQuestions.map((question) => (
            <div key={question._id} className="bg-white p-4 rounded-md shadow-md mb-4">
              <h2 className="text-lg font-semibold mb-2">{question.question}</h2>
              <ul className=" pl-6">
                {['a', 'b', 'c', 'd'].map((option) => (
                  <li key={option}>
                    <label>
                      <input
                        type="radio"
                        name={`question_${question._id}`}
                        value={option}
                        checked={userAnswers[question._id] === option}
                        onChange={() => handleInputChange(question._id, option)}
                      />
                      {` ${option.toUpperCase()}. ${question[option]}`}
                    </label>
                  </li>
                ))}
                {/* <li>
                  <label>
                    <input
                      type="radio"
                      name={`question_${question._id}`}
                      value="a"
                      checked={userAnswers[question._id] === "a"}
                      onChange={() => handleInputChange(question._id, "a")}
                    />
                    {` A. ${question.a}`}
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name={`question_${question._id}`}
                      value="b"
                      checked={userAnswers[question._id] === "b"}
                      onChange={() => handleInputChange(question._id, "b")}
                    />
                    {` B. ${question.b}`}
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name={`question_${question._id}`}
                      value="c"
                      checked={userAnswers[question._id] === "c"}
                      onChange={() => handleInputChange(question._id, "c")}
                    />
                    {` C. ${question.c}`}
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name={`question_${question._id}`}
                      value="d"
                      checked={userAnswers[question._id] === "d"}
                      onChange={() => handleInputChange(question._id, "d")}
                    />
                    {` D. ${question.d}`}
                  </label>
                </li> */}
              </ul>
            </div>
          ))}

        </div>
      )}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
      >
        Submit
      </button>
      {showResults && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Quiz Results</h2>
          <p>Total Questions: {quizQuestions.length}</p>
          <p>Number of Correct Answers: {correctAnswers}</p>
          <ul>
            {quizQuestions.map((question) => (
              <li key={question._id}>
                <strong>{question.question}</strong>
                <p>Your Answer: {userAnswers[question._id]}</p>
                <p>Correct Answer: {question.correct_answer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}


    </div>
  )
}

export default UserCourses