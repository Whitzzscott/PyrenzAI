import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: '#000000',
          color: '#FFFFFF',
          fontFamily: "'Baloo Da 2', cursive",
        },
      }}
    />
  );
}
