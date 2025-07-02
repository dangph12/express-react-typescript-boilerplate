import LoginForm from '~/components/forms/LoginForm';

const Login = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='card w-96 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title text-primary'>Login</h2>
          <LoginForm />
          <p className='text-sm text-secondary'>
            Don't have an account?{' '}
            <a href='/auth/register' className='link link-primary'>
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
