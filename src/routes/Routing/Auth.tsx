import { useState, useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '~/store';
import { motion } from 'framer-motion';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Auth() {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const setCaptcha = useUserStore((state) => state.setCaptcha);
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoaded(true);
    }
  }, []);

  const handleCaptcha = (token: string) => {
    const expiration = Date.now() + 2 * 60 * 1000;
    setCaptcha(token, expiration);
    navigate('/Home');
  };

  return (
    <main
      className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat font-baloo"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://cqtbishpefnfvaxheyqu.supabase.co/storage/v1/object/public/character-image/CDN/BackgroundTree.avif')",
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md p-10 rounded-2xl bg-gray-900 bg-opacity-70 shadow-2xl border border-gray-700"
      >
        <Typography
          variant="h4"
          className="text-center text-white mb-8 font-baloo"
        >
          {t('messages.verifyNotBot')}
        </Typography>
        <Box className="flex justify-center flex-col items-center">
          {isLoaded ? (
            <motion.article
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mb-6"
            >
              <HCaptcha
                sitekey="91081ab4-7c04-4130-b526-926e81bacae4"
                onVerify={handleCaptcha}
                theme="dark"
              />
            </motion.article>
          ) : (
            <Box className="text-white animate-pulse flex items-center mb-6">
              <CircularProgress size={24} className="mr-2" />
              <Typography>{t('messages.loadingCaptcha')}</Typography>
            </Box>
          )}
          <Typography
            variant="body2"
            className="text-gray-300 text-center mt-4 text-sm font-light"
          >
            {t('messages.pyrenzAIDescription')}
          </Typography>
        </Box>
      </motion.section>
    </main>
  );
}
