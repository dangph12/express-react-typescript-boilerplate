import { useForm } from 'react-hook-form';
import { type RegisterFormFields, registerSchema } from '~/types/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { AuthContext } from '~/contexts/authContext';

const RegisterForm = () => {
  const { signUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'customer'
    }
  });

  const onSubmit = async (data: RegisterFormFields) => {
    try {
      await signUp(data);
      alert(
        'Registration successful! Please check your email to verify your account.'
      );
      reset();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: Error | unknown) {
      alert('Registration failed. Please try again later.');
    }
  };

  return (
    <div>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text text-primary'>Fullname</span>
            </label>
            <input
              type='text'
              placeholder='Fullname'
              {...register('fullName')}
              className={`input w-full ${errors.fullName ? 'input-error' : ''}`}
            />
            <div className='h-6 flex items-start'>
              <span className='label-text-alt text-error text-sm'>
                {errors.fullName?.message || ''}
              </span>
            </div>
          </div>

          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text text-primary'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Username'
              {...register('username')}
              className={`input w-full ${errors.username ? 'input-error' : ''}`}
            />
            <div className='h-6 flex items-start'>
              <span className='label-text-alt text-error text-sm'>
                {errors.username?.message || ''}
              </span>
            </div>
          </div>

          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text text-primary'>Email</span>
            </label>
            <input
              type='email'
              placeholder='Email'
              {...register('email')}
              className={`input w-full ${errors.email ? 'input-error' : ''}`}
            />
            <div className='h-6 flex items-start'>
              <span className='label-text-alt text-error text-sm'>
                {errors.email?.message || ''}
              </span>
            </div>
          </div>

          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text text-primary'>Phone</span>
            </label>
            <input
              type='text'
              placeholder='Phone number'
              {...register('phoneNumber')}
              className={`input w-full ${errors.phoneNumber ? 'input-error' : ''}`}
            />
            <div className='h-6 flex items-start'>
              <span className='label-text-alt text-error text-sm'>
                {errors.phoneNumber?.message || ''}
              </span>
            </div>
          </div>

          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text text-primary'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Password'
              {...register('password')}
              className={`input w-full ${errors.password ? 'input-error' : ''}`}
            />
            <div className='h-6 flex items-start'>
              <span className='label-text-alt text-error text-sm'>
                {errors.password?.message || ''}
              </span>
            </div>
          </div>

          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text text-primary'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              {...register('confirmPassword')}
              className={`input w-full ${errors.confirmPassword ? 'input-error' : ''}`}
            />
            <div className='h-6 flex items-start'>
              <span className='label-text-alt text-error text-sm'>
                {errors.confirmPassword?.message || ''}
              </span>
            </div>
          </div>
        </div>

        <button className='btn btn-primary w-full mt-4' type='submit'>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
