import { useEffect } from 'react';
import CryingMascot from './Assets/Images/MascotCrying.png';
import { useRouteError, isRouteErrorResponse } from '@remix-run/react';

export function ErrorBoundary() {
  const error = useRouteError();

  useEffect(() => {
    console.error('An error occurred:', error);
  }, [error]);

  let errorCode = '500';
  let errorMessage = 'An unexpected error occurred.';

  if (isRouteErrorResponse(error)) {
    errorCode = error.status.toString();
    errorMessage = error.data?.message || `HTTP ${error.status} Error`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white text-center px-6 py-10'>
      <h1 className='text-6xl font-extrabold text-red-500 animate-fadeIn'>
        Oops! Something went wrong
      </h1>
      <p className='text-2xl mt-4 text-gray-300 animate-fadeIn delay-100'>
        <span className='font-bold text-red-400'>Error {errorCode}:</span>{' '}
        {errorMessage}
      </p>
      <h2 className='text-lg mt-6 text-gray-400 animate-fadeIn delay-200'>
        Please report this issue on our Discord.
      </h2>
      <a
        href='https://discord.com'
        className='mt-8 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all duration-500 ease-in-out shadow-lg'
      >
        Report Issue
      </a>
      <a
        href='/'
        className='mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-500 ease-in-out shadow-lg'
      >
        Return to Home
      </a>
      <div className='mt-[60px] animate-[bounce_2s_infinite]'>
        <img
          src={CryingMascot}
          alt='Crying Mascot'
          className='w-[220px] h-[220px] object-contain'
        />
      </div>
    </div>
  );
}
