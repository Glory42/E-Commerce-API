import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number,
    nodeEnv: string,
    JWT_TOKEN: string,
    supabase_key: string,
    supabase_url: string,
}

const config: Config = {
    port: Number(process.env.PORT),
    nodeEnv: String(process.env.NODE_ENV),
    JWT_TOKEN: String(process.env.JWT_TOKEN),
    supabase_key: String(process.env.SUPABASE_KEY),
    supabase_url: String(process.env.SUPABASE_URl),
}

export default config;