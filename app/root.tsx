import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from '@remix-run/react'
import { useEffect, useState } from 'react'
import { supabase } from '~/Utility/supabaseClient'
import './Global.css'
import { useUserStore as UserStore } from '~/store/UserStore'

export const meta = () => [{ title: 'Pyrenz AI' }]

export function Layout() {
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  const captchaUUID = UserStore((state) => state.captcha_uuid)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

 
  useEffect(() => {
    if (!hydrated) return

    const authDataString = localStorage.getItem('sb-dojdyydsanxoblgjmzmq-auth-token')
    const hasRedirected = sessionStorage.getItem('hasRedirected')
    const isOnRoot = window.location.pathname === '/' && window.location.origin === 'http://localhost:5173'

    if (isOnRoot && !hasRedirected) {
      sessionStorage.setItem('hasRedirected', 'true')
      navigate('/Home', { replace: true })
      return
    }

    if (!authDataString && !captchaUUID) {
      sessionStorage.setItem('redirected', 'true')
      navigate('/auth', { replace: true })
      return
    }

    const handleSession = async () => {
      try {
        if (!authDataString) return

        const authData = JSON.parse(authDataString)
        const { access_token, refresh_token } = authData

        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token
        })

        if (error) throw error

        const { data, error: sessionError } = await supabase.auth.getSession()
        if (sessionError || !data.session) throw sessionError

        setUser(data.session.user)
      } catch {
        localStorage.removeItem('sb-dojdyydsanxoblgjmzmq-auth-token')
        setUser(null)
        navigate('/auth', { replace: true })
      }
    }

    handleSession()
  }, [navigate, captchaUUID, hydrated])
 
  return (
    <html lang="en" className="bg-black text-white">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className="bg-black text-white">
        <Outlet context={{ user }} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export { ErrorBoundary } from './errorboundary'
