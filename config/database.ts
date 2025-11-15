import { createClient } from '@supabase/supabase-js';
import config from './config.js';

const supabaseUrl = config.supabase_url;
const supabaseKey = config.supabase_key;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;