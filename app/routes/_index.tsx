import { MetaFunction } from '@remix-run/node';
import { useState, useEffect } from 'react';
import { PreviewHeader } from '~/components';
import { PreviewFooter as Footer } from '~/components';
import { LoginModal } from '~/components';
import { RegisterModal } from '~/components';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/components';
import '~/Assets/Css/Preview.css';
import '~/Assets/Fonts/BalooDa2-Regular.ttf';

 
export const meta: MetaFunction = () => [
  { title: 'Pyrenz AI - A Powerful AI Chat Application' },
];

export default function Preview() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('sb-auth-token')) {
      window.location.replace('/Home');
      return;
    }

    const handleScroll = () => {
      setHideHeader(window.scrollY > window.innerHeight * 0.2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='min-h-screen flex flex-col font-[BalooDa2]'>
      <div
        className={`fixed top-0 w-full z-50 transition-transform duration-500 ${
          hideHeader ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <PreviewHeader
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
          hideNavbar={hideHeader}
        />
      </div>

      <div className='pt-20 flex-grow'>
        <section className='flex flex-col justify-center items-center min-h-screen text-white mb-40 -mt-16'>
          <h1 className='text-7xl font-extrabold mb-4'>Pyrenz AI</h1>
          <p className='text-2xl opacity-80'>
            Enrich Creativity with AI, with advanced tools, let creativity flow
          </p>
        </section>

        <section className='p-10 text-white pb-32'>
          <h2 className='text-4xl font-bold mb-8 text-center'>Discover More</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Array.from({ length: 3 }).map((_, i) => (
              <Card
                key={i}
                className='bg-gray-800 text-white shadow-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300'
              >
                <CardHeader>
                  <CardTitle className='text-2xl font-semibold'>
                    Card {i + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='opacity-90'>
                    This is a sample card. Customize it to showcase your
                    content.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <div className='mt-44'>
        <Footer />
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onRegisterOpen={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onRegisterOpen={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
}
