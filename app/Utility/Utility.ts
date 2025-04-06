import { supabase } from '~/Utility/supabaseClient'

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export const Utils = {
  BASEURL: 'http://localhost:3000',

  async request<T>(
    method: RequestMethod,
    endpoint: string,
    data: Record<string, any> = {},
    params: Record<string, any> = {}
  ): Promise<T> {
    const url = new URL(`${this.BASEURL}${endpoint}`)
    const searchParams = new URLSearchParams()

    if ((method === 'GET' || method === 'DELETE') && Object.keys(params).length) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      url.search = searchParams.toString()
    }

    const { data: { session }, error } = await supabase.auth.getSession()

    if (error || !session) {
      console.warn('No authentication token found.')
    }

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}),
      },
    }

    if (method !== 'GET' && Object.keys(data).length) {
      options.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(url.toString(), options)

      if (!response.ok) {
        let errorMessage = `${response.status} ${response.statusText}`
        try {
          const errorData = await response.json()
          errorMessage += ` - ${errorData.message || JSON.stringify(errorData)}`
        } catch {
          const rawError = await response.text()
          if (rawError) errorMessage += ` - ${rawError}`
        }
        throw new Error(errorMessage)
      }

      if (response.status === 204) {
        return {} as T
      }

      return await response.json()
    } catch (error) {
      console.error(`Request Failed - ${method} ${url}:`, error)
      throw error
    }
  },

  get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    return this.request<T>('GET', endpoint, {}, params)
  },

  post<T>(endpoint: string, data: Record<string, any> = {}, params: Record<string, any> = {}): Promise<T> {
    return this.request<T>('POST', endpoint, data, params)
  },

  patch<T>(endpoint: string, data: Record<string, any> = {}, params: Record<string, any> = {}): Promise<T> {
    return this.request<T>('PATCH', endpoint, data, params)
  },

  delete<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    return this.request<T>('DELETE', endpoint, {}, params)
  },
}
