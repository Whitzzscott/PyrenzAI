import { supabase } from '~/Utility/supabaseClient';
import { useUserStore as UserStore } from '~/store/UserStore';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export const Utils = {
  BASEURL: 'http://localhost:3000',
  TIMEOUT: 5000,

  async request<T>(
    method: RequestMethod,
    endpoint: string,
    data: Record<string, any> | FormData = {},
    params: Record<string, any> = {},
    isImageRequest: boolean = false
  ): Promise<T> {
    const url = new URL(`${this.BASEURL}${endpoint}`);
    const searchParams = new URLSearchParams();

    if ((method === 'GET' || method === 'DELETE') && Object.keys(params).length) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url.search = searchParams.toString();
    }

    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      console.warn('No authentication token found.');
    }

    const captcha_uuid = UserStore.getState().captcha_uuid || '';
    const auth_key = UserStore.getState().auth_key || '';

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': isImageRequest ? 'application/json' : 'application/json',
        Accept: isImageRequest ? 'image/png' : 'application/json',
        ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}),
        ...(captcha_uuid ? { 'captcha_key': captcha_uuid } : {}),
        ...(auth_key ? { 'Authentication_Key': auth_key } : {}),
      },
    };

    if (method !== 'GET' && Object.keys(data).length) {
      if (data instanceof FormData) {
        options.body = data;
      } else {
        options.body = JSON.stringify(data);
      }
    }

    const fetchWithTimeout = (url: string, options: RequestInit, timeout: number) => {
      return Promise.race([
        fetch(url, options),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), timeout)
        ),
      ]);
    };

    try {
      const response = await fetchWithTimeout(url.toString(), options, this.TIMEOUT);

      if (!response.ok) {
        let errorMessage = `${response.status} ${response.statusText}`;
        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage += ` - ${errorData.message || JSON.stringify(errorData)}`;
        } else {
          const rawError = await response.text();
          if (rawError) errorMessage += ` - ${rawError}`;
        }

        throw new Error(errorMessage);
      }

      if (response.status === 204) {
        return {} as T;
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('image/png')) {
        return await response.blob() as T;
      }

      return await response.json();
    } catch (error) {
      console.error(`Request Failed - ${method} ${url}:`, error);
      throw error;
    }
  },

  get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    return this.request<T>('GET', endpoint, {}, params);
  },

  post<T>(endpoint: string, data: Record<string, any> = {}, params: Record<string, any> = {}): Promise<T> {
    return this.request<T>('POST', endpoint, data, params);
  },

  postImage<T>(endpoint: string, data: Record<string, any> = {}, params: Record<string, any> = {}): Promise<T> {
    return this.request<T>('POST', endpoint, data, params, true);
  },

  patch<T>(endpoint: string, data: Record<string, any> = {}, params: Record<string, any> = {}): Promise<T> {
    return this.request<T>('PATCH', endpoint, data, params);
  },

  delete<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    return this.request<T>('DELETE', endpoint, {}, params);
  },
};
