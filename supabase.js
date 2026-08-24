const SUPABASE_URL = "https://iyibamsgkqawfayyzseg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_YWWVDUT_IaWdHT6iFaoCEw_VUReFeM_";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);