const SUPABASE_URL = "https://dojdyydsanxoblgjmzmq.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvamR5eWRzYW54b2JsZ2ptem1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMDUxNTQsImV4cCI6MjA0ODg4MTE1NH0.mONIXEuP2lF7Hu9J34D9f4yQWuFuPTC5tE-rpbAJTxg"

export {
    SUPABASE_URL,
    SUPABASE_ANON_KEY
}

// Whitzscott 3-32-25: For some context SUPABASE_URL and SUPABASE_ANON_KEY are designed to be public. Meaning to say you can't use this SINCE we have policy in placed in our database to prevent unauthorized access. this key is only used for anonymous authentication 