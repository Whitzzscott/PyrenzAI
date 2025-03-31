import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/auth-helpers-remix'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '~/config'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const getSupabaseClient = (request: Request, response: Response) =>
  createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, { request, response })
