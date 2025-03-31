import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from '@remix-run/react'
import { useState, useEffect } from 'react'
import { supabase } from '~/Utility/supabaseClient'
import { Utils } from '~/Utility/Utility'
import './tailwind.css'

interface ApiResponse {
  error?: string
}

export const meta = () => [{ title: 'Pyrenz AI' }]

export function Layout() {
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem('sb-auth-token')
    const refreshToken = localStorage.getItem('sb-refresh-token')
    const jwtToken = localStorage.getItem('jwt-auth-token')
    const authDataString = localStorage.getItem('sb-dojdyydsanxoblgjmzmq-auth-token')
    const hasRedirected = sessionStorage.getItem('hasRedirected')
    const isOnRoot = window.location.pathname === '/' && window.location.origin === 'http://localhost:5173'

    if (isOnRoot && jwtToken && !hasRedirected) {
      sessionStorage.setItem('hasRedirected', 'true')
      navigate('/Home', { replace: true })
      return
    }

    if ((!accessToken || !refreshToken) && !jwtToken && !authDataString) {
      sessionStorage.setItem('redirected', 'true')
      navigate('/auth', { replace: true })
      return
    }

    const requestBody = jwtToken
      ? { type: 'Checktoken' }
      : (() => {
          try {
            const authData = JSON.parse(authDataString || '{}')
            const user = authData?.user
            return user
              ? {
                  id: user.id,
                  email: user.email || 'Unknown Email',
                  full_name: user.user_metadata?.full_name || 'Unknown Name',
                  avatar_url:
                    user.user_metadata?.avatar_url ||
                    `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.email?.split('@')[0] || 'UnknownUser'}`,
                  created_at: user.created_at || 'Unknown Date',
                  phone: user.phone || 'No Phone',
                  last_sign_in_at: user.last_sign_in_at || 'Unknown Last Sign In',
                }
              : null
          } catch {
            return null
          }
        })()

    if (requestBody) {
      Utils.post<{ error?: string; token?: string }>('/api/Authorization', requestBody)
        .then((response) => {
          if (!response?.error && response?.token) {
            localStorage.setItem('jwt-auth-token', response.token)
          }
        })
        .catch(() => {})
    }

    const handleSession = async () => {
      try {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken!,
          refresh_token: refreshToken!,
        })

        if (error) throw error

        const { data, error: sessionError } = await supabase.auth.getSession()
        if (sessionError || !data.session) throw sessionError

        setUser(data.session.user)
      } catch {
        localStorage.removeItem('sb-auth-token')
        localStorage.removeItem('sb-refresh-token')
        localStorage.removeItem('jwt-auth-token')
        setUser(null)
        navigate('/auth', { replace: true })
      }
    }

    if (accessToken && refreshToken) {
      handleSession()
    }
  }, [navigate])

  return (
    <html lang='en' className='bg-black text-white'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
      </head>
      <body className='bg-black text-white'>
        <Outlet context={{ user }} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  console.log('App component rendered')
  return <Outlet />
}

export { ErrorBoundary } from './errorboundary' 
