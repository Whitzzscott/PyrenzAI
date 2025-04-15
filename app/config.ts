const SUPABASE_URL = "https://cqtbishpefnfvaxheyqu.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdGJpc2hwZWZuZnZheGhleXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NDIwMDYsImV4cCI6MjA1OTQxODAwNn0.QXKAGYy2l21gwcfXlKLyCq8Te4yotrvgkLY4M1v0aCs";

export { SUPABASE_URL, SUPABASE_ANON_KEY };

// Whitzscott 3-32-25: For some context SUPABASE_URL and SUPABASE_ANON_KEY are designed to be public. Meaning to say you can't use this SINCE we have policy in placed in our database to prevent unauthorized access. this key is only used for anonymous authentication
