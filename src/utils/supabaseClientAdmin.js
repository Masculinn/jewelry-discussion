import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY


export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);