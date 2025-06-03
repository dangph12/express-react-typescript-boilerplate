import { Outlet } from 'react-router';

const QuizLayout = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='container mx-auto p-4'>
        <Outlet />
      </div>
    </div>
  );
};

export default QuizLayout;
