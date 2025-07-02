import RegisterForm from '~/components/forms/RegisterForm';

const Register = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='card w-full max-w-4xl shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title text-primary'>Register</h2>
          <RegisterForm />
          <p className='text-sm text-secondary'>
            Already have an account?{' '}
            <a href='/auth/login' className='link link-primary'>
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
