import { Outlet } from 'react-router';

const QuizLayout = () => {
  return (
    <div className='container mx-auto'>
      <Outlet />
    </div>
  );
};

export default QuizLayout;
