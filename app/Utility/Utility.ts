import { supabase } from "~/Utility/supabaseClient";
import { useUserStore as UserStore } from "~/store/UserStore";

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

export const Utils = {
  TIMEOUT: 5000,
  BASE_URL: "http://localhost:1983",
  abortControllers: new Map<string, AbortController>(),

  async request<T>(
    method: RequestMethod,
    endpoint: string,
    data: Record<string, any> | FormData = {},
    params: Record<string, any> = {},
    isImageRequest: boolean = false,
    user_uuid?: string,
  ): Promise<T> {
    const url = new URL(`${this.BASE_URL}${endpoint}`);

    const searchParams = new URLSearchParams();

    if (
      (method === "GET" || method === "DELETE") &&
      Object.keys(params).length
    ) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url.search = searchParams.toString();
    }

    let session = null;
    const { data: sessionData, error } = await supabase.auth.getSession();

    if (error) {
      console.warn("Error fetching Supabase session:", error);
    } else {
      session = sessionData.session;
    }

    const captcha_uuid = UserStore.getState().captcha_uuid || "";
    const auth_key = UserStore.getState().auth_key || "";

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: isImageRequest ? "image/png" : "application/json",
    };

    if (session) headers.Authorization = `Bearer ${session.access_token}`;
    if (captcha_uuid) headers["captcha_key"] = captcha_uuid;
    if (auth_key) headers["Authentication_Key"] = auth_key;
    if (user_uuid) headers["User-UUID"] = user_uuid;

    const options: RequestInit = {
      method,
      headers,
    };

    if (method !== "GET" && Object.keys(data).length) {
      if (data instanceof FormData) {
        options.body = data;
      } else {
        options.body = JSON.stringify(data);
      }
    }

    if (this.abortControllers.has(endpoint)) {
      this.abortControllers.get(endpoint)?.abort();
    }

    const controller = new AbortController();
    this.abortControllers.set(endpoint, controller);
    options.signal = controller.signal;

    const fetchWithTimeout = (
      url: string,
      options: RequestInit,
      timeout: number,
    ) => {
      return Promise.race([
        fetch(url, options),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), timeout),
        ),
      ]);
    };

    try {
      const response = await fetchWithTimeout(
        url.toString(),
        options,
        this.TIMEOUT,
      );

      if (!response.ok) {
        let errorMessage = `${response.status} ${response.statusText}`;
        const contentType = response.headers.get("Content-Type");

        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          errorMessage += ` - ${errorData.message || JSON.stringify(errorData)}`;
        } else {
          const rawError = await response.text();
          if (rawError) errorMessage += ` - ${rawError}`;
        }

        throw new Error(errorMessage);
      }

      if (response.status === 204) return {} as T;

      const contentType = response.headers.get("Content-Type");
      if (contentType?.includes("image/png")) {
        return (await response.blob()) as T;
      }

      return await response.json();
    } catch (error) {
      console.error(`Request Failed - ${method} ${url}:`, error);
      throw error;
    } finally {
      this.abortControllers.delete(endpoint);
    }
  },

  get<T>(
    endpoint: string,
    params: Record<string, any> = {},
    user_uuid?: string,
  ): Promise<T> {
    return this.request<T>("GET", endpoint, {}, params, false, user_uuid);
  },

  post<T>(
    endpoint: string,
    data: Record<string, any> = {},
    params: Record<string, any> = {},
    user_uuid?: string,
  ): Promise<T> {
    return this.request<T>("POST", endpoint, data, params, false, user_uuid);
  },

  patch<T>(
    endpoint: string,
    data: Record<string, any> = {},
    params: Record<string, any> = {},
    user_uuid?: string,
  ): Promise<T> {
    return this.request<T>("PATCH", endpoint, data, params, false, user_uuid);
  },

  delete<T>(
    endpoint: string,
    params: Record<string, any> = {},
    user_uuid?: string,
  ): Promise<T> {
    return this.request<T>("DELETE", endpoint, {}, params, false, user_uuid);
  },
};
