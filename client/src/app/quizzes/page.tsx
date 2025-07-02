import { useEffect, useState } from 'react';
import { type Quiz } from '../../types/quiz';
import axiosInstance from '../../config/axiosConfig';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axiosInstance.get('/api/quizzes');
        setQuizzes(response.data.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Quizzes</h1>
      {loading ? (
        <p>Loading quizzes...</p>
      ) : quizzes.length > 0 ? (
        <ul className='space-y-4'>
          {quizzes.map(quiz => (
            <li key={quiz._id} className='border p-4 rounded-lg'>
              <h2 className='text-xl font-semibold'>{quiz.title}</h2>
              <p>{quiz.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quizzes available.</p>
      )}
    </div>
  );
};

export default Quizzes;
