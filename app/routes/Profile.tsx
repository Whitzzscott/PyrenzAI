import { useState } from 'react';
import { useOutletContext } from '@remix-run/react';
import type { User } from '@supabase/supabase-js';

type OutletContextType = { user: User | null };

export default function Profile() {
  const { user } = useOutletContext<OutletContextType>();
  const [activeTab, setActiveTab] = useState<
    'Account' | 'Profile' | 'Preferences'
  >('Account');

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-black text-white p-6'>
      <h1 className='text-3xl font-bold mb-6'>Profile Settings</h1>
      <div className='flex space-x-4 mb-6'>
        {['Account', 'Profile', 'Preferences'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md transition ${
              activeTab === tab ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() =>
              setActiveTab(tab as 'Account' | 'Profile' | 'Preferences')
            }
          >
            {tab}
          </button>
        ))}
      </div>
      <div className='bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md text-center'>
        {activeTab === 'Account' && (
          <div>
            <p>Manage your account settings here.</p>
            {user ? (
              <p>Logged in as: {user.email}</p>
            ) : (
              <p>You are not logged in.</p>
            )}
          </div>
        )}
        {activeTab === 'Profile' && (
          <p>Update your profile information here.</p>
        )}
        {activeTab === 'Preferences' && <p>Customize your preferences here.</p>}
      </div>
    </div>
  );
}
