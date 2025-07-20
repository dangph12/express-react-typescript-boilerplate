import React, { useState } from 'react';

export default function App() {
  const [theme, setTheme] = useState('light');

  React.useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-base-100 text-base-content transition-colors'>
      <h1 className='text-4xl font-bold mb-6'>Tailwind Theme Test</h1>
      <p className='mb-4'>
        Current theme: <span className='font-mono'>{theme}</span>
      </p>
      <button
        className='px-4 py-2 rounded bg-primary text-primary-content font-semibold mb-8'
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Toggle Theme
      </button>
      <div className='grid grid-cols-2 gap-6 w-full max-w-xl'>
        <div className='p-6 rounded-box bg-secondary text-secondary-content text-center font-semibold'>
          Secondary
        </div>
        <div className='p-6 rounded-box bg-accent text-accent-content text-center font-semibold'>
          Accent
        </div>
        <div className='p-6 rounded-box bg-neutral text-neutral-content text-center font-semibold'>
          Neutral
        </div>
        <div className='p-6 rounded-box bg-info text-info-content text-center font-semibold'>
          Info
        </div>
        <div className='p-6 rounded-box bg-success text-success-content text-center font-semibold'>
          Success
        </div>
        <div className='p-6 rounded-box bg-warning text-warning-content text-center font-semibold'>
          Warning
        </div>
        <div className='p-6 rounded-box bg-error text-error-content text-center font-semibold'>
          Error
        </div>
      </div>
    </div>
  );
}
