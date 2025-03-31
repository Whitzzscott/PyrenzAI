import { useState, useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useNavigate } from 'react-router-dom';
import Background from '../Assets/Images/BackgroundTree.png';

export default function Auth() {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoaded(true);
    }
  }, []);

  const handleCaptcha = (token: string) => {
    localStorage.setItem('captcha_uuid', token);
    localStorage.setItem(
      'captcha_expiration',
      (Date.now() + 2 * 60 * 1000).toString(),
    );
    navigate('/#');
  };

  return (
    <div
      className='min-h-screen flex justify-center items-center'
      style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover' }}
    >
      <div className='w-full max-w-md p-10 rounded-2xl bg-gray-900 bg-opacity-70 shadow-2xl border border-gray-700'>
        <h2 className='text-3xl font-semibold text-center text-white mb-6'>
          Please Verify You're Not a Bot
        </h2>
        <div className='flex justify-center'>
          {isLoaded ? (
            <HCaptcha
              sitekey='91081ab4-7c04-4130-b526-926e81bacae4'
              onVerify={handleCaptcha}
              theme='dark'
            />
          ) : (
            <p className='text-white'>Loading CAPTCHA...</p>
          )}
        </div>
      </div>
    </div>
  );
}
