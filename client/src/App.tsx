import { useEffect, useState } from 'react';
import axios from 'axios';

interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: string[];
  createdAt: string;
  updatedAt: string;
}

function App() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/quizzes`
        );
        setQuizzes(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message || 'An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Quizzes</h1>
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <ul className='space-y-4'>
          {quizzes.map(quiz => (
            <li key={quiz._id} className='border p-4 rounded shadow'>
              <h2 className='text-xl font-semibold'>
                {quiz.title || 'Untitled Quiz'}
              </h2>
              <p className='text-gray-600'>{quiz.description}</p>
              <p className='text-sm text-gray-500'>
                Created At: {new Date(quiz.createdAt).toLocaleString()}
              </p>
              <p className='text-sm text-gray-500'>
                Updated At: {new Date(quiz.updatedAt).toLocaleString()}
              </p>
              <p className='text-sm text-gray-700'>
                Questions:{' '}
                {quiz.questions.length > 0
                  ? quiz.questions.length
                  : 'No questions'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
