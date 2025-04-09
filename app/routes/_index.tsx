import { useEffect, useState } from 'react';
import { supabase } from '~/Utility/supabaseClient';
import { useUserStore as UserStore } from '~/store/UserStore';
import { PreviewHeader, PreviewFooter as Footer, LoginModal, RegisterModal, Card, CardContent, CardHeader, CardTitle } from '~/components';
import '~/Assets/Css/Preview.css';
import '~/Assets/Fonts/BalooDa2-Regular.ttf';

interface UserState {
  user_uuid: string | null;
  auth_key: string | null;
  setUserUUID: (uuid: string) => void;
  setAuthKey: (key: string) => void;
}

export const meta = () => [{ title: 'Pyrenz AI - A Powerful AI Chat Application' }];

export default function Preview() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  const setUserUUID = UserStore((state: UserState) => state.setUserUUID);
  const setAuthKey = UserStore((state: UserState) => state.setAuthKey);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error.message);
        return;
      }

      if (session) {
        const { user } = session;
        const user_data = {
          email: user.email,
          full_name: user.user_metadata.full_name,
          avatar_url: user.user_metadata.avatar_url,
          phone: user.phone,
          last_sign_in_at: user.last_sign_in_at,
          user_uuid: user.id,
        };

        const { data, error } = await supabase.rpc('handle_user_authentication', { user_data });

        if (error) {
          console.error('Error during authentication:', error.message);
          return;
        }

        const authResponse = data;

        if (authResponse.success) {
          if (authResponse.auth_key) {
            setAuthKey(authResponse.auth_key);
          } else {
            console.error('[ERROR]: Auth Key not provided in the response');
          }
        } else {
          console.error('[ERROR]: Authentication failed:', authResponse.error);
        }
      }
    };

    fetchUserData();

    const handleScroll = () => {
      setHideHeader(window.scrollY > window.innerHeight * 0.2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setUserUUID, setAuthKey, setHideHeader]);

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
